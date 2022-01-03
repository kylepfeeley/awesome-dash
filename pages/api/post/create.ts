import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.cookies;
  const { text } = req.body;

  try {
    if (!text) {
      res.json({ error: 'You should type some text dude!' });
      return;
    }
    if (token) {
      // get the authenticated user
      const { _id, email }: any = jwt.verify(token, process.env.JWT_SECRET || '');
      const post = await prisma.post.create({
        data: {
          text,
          author: {
            connect: {
              email
            }
          }
        }
      });
      res.json(post);
    } else {
      res.json({ error: 'You must be logged in to post' });
    }
  } catch (error) {
    res.json({ error: 'You must be logged in to post' });
    return;
  }
}
