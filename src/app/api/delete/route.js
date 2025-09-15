import apiError from "@/utils/apiError";
import { Pinecone } from "@pinecone-database/pinecone";
const pc = new Pinecone({ apiKey: process.env.pinecone_api_key });
const index = pc.index(process.env.pincone_index);

const handler = async (req) => {
  const { filename } = await req.json();
  if (!filename) {
    throw new apiError(400, "file name is required");
  }
};
