import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          email: true,
          password: true
        }
      },
      likes: {
        select: {
          id: true,
          author: {
            select: {
              email: true,
              password: true
            }
          }
        }
      },
      comments: {
        select: {
          text: true,
          id: true,
          author: {
            select: {
              email: true,
              password: true
            }
          }
        }
      }
    }
  });
  res.json(posts);
}
