import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId, InsertOneResult } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://apexUser:apex1234@apex.xzmswa7.mongodb.net/?retryWrites=true&w=majority&appName=Apex';
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await client.connect();
  const db = client.db('apex');
  const products = db.collection('products');

  if (req.method === 'POST') {
    const { name, quantity, price } = req.body;
    if (!name || !quantity || !price) {
      return res.status(400).json({ error: 'Missing fields' });
    }
  const result: InsertOneResult = await products.insertOne({ name, quantity, price, createdAt: new Date() });
  return res.status(201).json({ _id: result.insertedId, name, quantity, price });
  }

  if (req.method === 'GET') {
    const allProducts = await products.find().sort({ createdAt: -1 }).toArray();
    return res.status(200).json(allProducts);
  }

  if (req.method === 'PUT') {
    const { _id, name, quantity, price } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id' });
  await products.updateOne({ _id: new ObjectId(_id) }, { $set: { name, quantity, price } });
    return res.status(200).json({ message: 'Updated' });
  }

  if (req.method === 'DELETE') {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id' });
  await products.deleteOne({ _id: new ObjectId(_id) });
    return res.status(200).json({ message: 'Deleted' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
