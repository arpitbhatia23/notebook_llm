import { NextResponse } from "next/server";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";
import { asyncHandler } from "@/utils/asynchandler";

const genAi = new GoogleGenAI({ apiKey: process.env.gemini_api_key });
const pc = new Pinecone({ apiKey: process.env.pinecone_api_key });
const index = pc.index(process.env.pincone_index);

const handler = async (req) => {
  const { query } = await req.json();
  const emmbedRespone = await genAi.models.embedContent({
    model: "text-embedding-004",
    contents: [query],
  });

  const result = await index.query({
    vector: emmbedRespone.embeddings[0].values,
    topK: 5,
    includeMetadata: true,
  });
  const context = result.matches
    .map((m) => `From ${m.metadata?.source}: ${m.metadata?.text}`)
    .join("\n");

  const chatResponse = await genAi.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Answer the question based on the context below.
   
Context:
${context}

Question: ${query}

Answer:`,
  });

  return NextResponse.json(
    new apiResponse(
      200,
      "get answer sucessfully",
      chatResponse.candidates[0].content.parts[0].text
    )
  );
};

export const POST = asyncHandler(handler);
