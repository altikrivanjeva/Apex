import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    serialize('sessionUser', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0), // Expire immediately
    })
  );
  res.redirect('/login');
}
