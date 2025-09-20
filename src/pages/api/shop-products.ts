import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId, InsertOneResult } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://apexUser:apex1234@apex.xzmswa7.mongodb.net/?retryWrites=true&w=majority&appName=Apex';
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await client.connect();
  const db = client.db('apex');
  const shopProducts = db.collection('shop_products');

  if (req.method === 'POST') {
    const { name, img, price, category } = req.body;
    if (!name || !img || !price || !category) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    
    // Get the next ID starting from 1001 to avoid conflicts with fallback products
    const lastProduct = await shopProducts.findOne({}, { sort: { id: -1 } });
    const nextId = lastProduct ? lastProduct.id + 1 : 1001;
    
    const result: InsertOneResult = await shopProducts.insertOne({ 
      id: nextId,
      name, 
      img, 
      price, 
      category, 
      status: 'Add to Cart',
      createdAt: new Date() 
    });
    return res.status(201).json({ _id: result.insertedId, id: nextId, name, img, price, category });
  }

  if (req.method === 'GET') {
    const allProducts = await shopProducts.find().sort({ createdAt: -1 }).toArray();
    return res.status(200).json(allProducts);
  }

  if (req.method === 'PUT') {
    const { _id, name, img, price, category } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id' });
    await shopProducts.updateOne({ _id: new ObjectId(_id) }, { $set: { name, img, price, category } });
    return res.status(200).json({ message: 'Updated' });
  }

  if (req.method === 'DELETE') {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id' });
    await shopProducts.deleteOne({ _id: new ObjectId(_id) });
    return res.status(200).json({ message: 'Deleted' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}