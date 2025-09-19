import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId, InsertOneResult } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://apexUser:apex1234@apex.xzmswa7.mongodb.net/?retryWrites=true&w=majority&appName=Apex';
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await client.connect();
  const db = client.db('apex');
  const contacts = db.collection('contacts');

  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const result: InsertOneResult = await contacts.insertOne({ name, email, message, createdAt: new Date() });
    return res.status(201).json({ _id: result.insertedId, name, email, message });
  }

  if (req.method === 'GET') {
    const allContacts = await contacts.find().sort({ createdAt: -1 }).toArray();
    return res.status(200).json(allContacts);
  }

  if (req.method === 'PUT') {
    const { _id, name, email, message } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id' });
    await contacts.updateOne({ _id: new ObjectId(_id) }, { $set: { name, email, message } });
    return res.status(200).json({ message: 'Updated' });
  }

  if (req.method === 'DELETE') {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id' });
    await contacts.deleteOne({ _id: new ObjectId(_id) });
    return res.status(200).json({ message: 'Deleted' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}