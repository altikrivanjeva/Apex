import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
// Update the import path to the correct location of Blog type/model
// Define Blog type here if not imported from elsewhere
export type Blog = {
  title: string;
  content: string;
  author: string;
  createdAt?: Date;
};
export async function createBlog(data: Blog) {
const client = await clientPromise;
const db = client.db("apex");
const result = await db.collection("blogs").insertOne({
...data,
createdAt: new Date(),
});
return result;
}
export async function getBlogs() {
const client = await clientPromise;
const db = client.db("apex");
const blogs = await db.collection("blogs").find().sort({ createdAt:
-1 }).toArray();
return blogs;
}