import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://apexUser:apex1234@apex.xzmswa7.mongodb.net/?retryWrites=true&w=majority&appName=Apex";
const dbName = process.env.MONGODB_DB || 'apex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    if (req.method === 'POST') {
      const { username, password, type } = req.body;
      if (!username || !password) {
        client.close();
        return res.status(400).json({ error: 'Missing username or password' });
      }
      if (type === 'register') {
        const existing = await db.collection('users').findOne({ username });
        if (existing) {
          client.close();
          return res.status(409).json({ error: 'User already exists' });
        }
        await db.collection('users').insertOne({ username, password });
        client.close();
        return res.status(201).json({ message: 'Registered successfully' });
      } else if (type === 'login') {
        const user = await db.collection('users').findOne({ username });
        client.close();
        if (user && user.password === password) {
          return res.status(200).json({ message: 'Login successful' });
        } else {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    } else {
      client.close();
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
}
