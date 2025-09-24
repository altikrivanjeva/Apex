import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('apex');
  const carts = db.collection('carts');

 
  const { userId, cart } = req.body;

  if (req.method === 'GET') {

    const { userId } = req.query;
    const userCart = await carts.findOne({ userId });
    return res.status(200).json(userCart?.cart || []);
  }

  if (req.method === 'POST') {
   
    await carts.updateOne(
      { userId },
      { $set: { cart } },
      { upsert: true }
    );
    return res.status(200).json({ message: 'Cart updated' });
  }

  if (req.method === 'DELETE') {
   
    await carts.deleteOne({ userId });
    return res.status(200).json({ message: 'Cart deleted' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}