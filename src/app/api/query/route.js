import { Pinecone } from "@pinecone-database/pinecone";
import { asyncHandler } from "@/utils/asynchandler";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { embed, streamText } from "ai";
const pc = new Pinecone({ apiKey: process.env.pinecone_api_key });
const index = pc.index(process.env.pincone_index);
const googleai = createGoogleGenerativeAI({
  apiKey: process.env.gemini_api_key,
});
const handler = async (req) => {
  const { query } = await req.json();
  const model = googleai.textEmbedding("text-embedding-004");

  const emmbedRespone = await embed({
    model,
    value: query,
  });

  const result = await index.query({
    vector: emmbedRespone?.embedding,
    topK: 5,
    includeMetadata: true,
  });
  const context = result.matches
    .map((m) => `From ${m.metadata?.source}: ${m.metadata?.text}`)
    .join("\n");

  const stream = await streamText({
    model: googleai("models/gemini-2.0-flash"),
    prompt: `Answer the question based on the context below.
    context:${context}
    Question: ${query}
    Answer:`,
  });

  // return new Response(stream.toTextStreamResponse(), {
  //   headers: {
  //     "Content-Type": "text/event-stream",
  //     "Cache-Control": "no-cache",
  //     Connection: "keep-alive",
  //   },
  // });

  return stream.toUIMessageStreamResponse();
};
export const POST = asyncHandler(handler);
