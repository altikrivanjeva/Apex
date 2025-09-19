import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import { serialize } from 'cookie';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;
const cookieName = process.env.COOKIE_NAME!;

let client: MongoClient | null = null;

async function getClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await getClient();
    const db = client.db(dbName);
    const { type, username, password, userId, newUsername, newPassword } = req.body;

    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // ----- REGISTER -----
    if (type === 'register') {
      if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
      const existing = await db.collection('users').findOne({ username });
      if (existing) return res.status(409).json({ error: 'User already exists' });

      const result = await db.collection('users').insertOne({ username, password });
      return res.status(201).json({ message: 'Registered successfully', user: result.insertedId });
    }

    // ----- LOGIN -----
    else if (type === 'login') {
      if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
      const user = await db.collection('users').findOne({ username });
      if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });

      // Set cookie
      res.setHeader('Set-Cookie', serialize(cookieName, user._id.toString(), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      }));
      return res.status(200).json({ message: 'Login successful' });
    }

    // ----- LOGOUT -----
    else if (type === 'logout') {
      res.setHeader('Set-Cookie', serialize(cookieName, '', { path: '/', maxAge: -1 }));
      return res.status(200).json({ message: 'Logged out' });
    }

    // ----- UPDATE USER -----
    else if (type === 'update') {
      if (!userId || !newUsername || !newPassword) return res.status(400).json({ error: 'Missing fields' });
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { username: newUsername, password: newPassword } }
      );
      return res.status(200).json({ message: 'User updated' });
    }

    // ----- DELETE USER -----
    else if (type === 'delete') {
      if (!userId) return res.status(400).json({ error: 'Missing userId' });
      await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
      return res.status(200).json({ message: 'User deleted' });
    }

    else return res.status(400).json({ error: 'Invalid type' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', details: err instanceof Error ? err.message : err });
  }
}
