import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// FIX: Correct the URI string and use .env.local for secrets!
const uri = process.env.MONGODB_URI || 'mongodb+srv://apexUser:apex1234@apex.xzmswa7.mongodb.net/?retryWrites=true&w=majority&appName=Apex';

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (!cachedClient) {
    cachedClient = await MongoClient.connect(uri);
  }
  return cachedClient;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();
    await db.collection('contacts').insertOne({ name, email, message, date: new Date() });
    res.status(200).json({ message: 'Message saved' });
  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({ message: 'Database error' });
  }
}