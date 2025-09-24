import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Order from '../../models/Order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const order = await Order.create(req.body);
      return res.status(201).json({ message: 'Order saved!', order });
    } catch (err) {
      return res.status(500).json({ message: 'Error saving order', error: err });
    }
  }
  if (req.method === 'GET') {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching orders', error: err });
    }
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await Order.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Error deleting order', error: err });
    }
  }
  res.status(405).end();
}