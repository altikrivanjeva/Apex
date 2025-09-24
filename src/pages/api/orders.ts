// Ky API endpoint menaxhon porositë në databazën MongoDB përmes modelit Order.
// Lejon krijimin (POST), marrjen (GET) dhe fshirjen (DELETE) e porosive.
// Përdoret në checkout dhe në dashboard për menaxhimin e porosive.

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Order from '../../models/Order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Krijon një porosi të re (POST)
  if (req.method === 'POST') {
    try {
      const order = await Order.create(req.body);
      return res.status(201).json({ message: 'Order saved!', order });
    } catch (err) {
      return res.status(500).json({ message: 'Error saving order', error: err });
    }
  }
  // Kthen të gjitha porositë (GET)
  if (req.method === 'GET') {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching orders', error: err });
    }
  }
  // Fshin një porosi sipas id-së (DELETE)
  if (req.method === 'DELETE') {
    const { _id } = req.body;
    await Order.deleteOne({ _id });
    return res.status(200).json({ message: 'Order deleted' });
  }
  // Nëse metoda nuk lejohet, kthen status 405
  res.status(405).end();
}