import { NextResponse } from "next/server";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";
// import pdf from "pdf-parse"; // ✅ Simpler PDF parser
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { asyncHandler } from "@/utils/asynchandler";
const pdf = require("pdf-parse");
const genAi = new GoogleGenAI({ apiKey: process.env.gemini_api_key });
const pc = new Pinecone({ apiKey: process.env.pinecone_api_key });

const index = pc.index(process.env.pincone_index);

function chunkText(text, size = 500) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

const handler = async (req) => {
  const formdata = await req.formData();
  const file = formdata.get("file");
  if (!file) throw new apiError(400, "file is required");

  console.log("Received file:", file.name, file.type, file.size);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // ✅ Use pdf-parse to extract text
  const data = await pdf(buffer);
  const pdfText = data.text;

  const chunks = chunkText(pdfText, 500);
  // await index._deleteMany({ deleteAll: true });
  await index.namespace("__default__").deleteAll();

  await Promise.all(
    chunks.map(async (chunk, i) => {
      const embedResponse = await genAi.models.embedContent({
        model: "text-embedding-004",
        contents: [chunk],
      });

      await index.upsert([
        {
          id: `${file.name}-${i}`,
          values: embedResponse.embeddings[0].values,
          metadata: { text: chunk, source: file.name },
        },
      ]);
    })
  );

  return NextResponse.json(
    new apiResponse(200, "PDF uploaded and indexed successfully")
  );
};

export const POST = asyncHandler(handler);
