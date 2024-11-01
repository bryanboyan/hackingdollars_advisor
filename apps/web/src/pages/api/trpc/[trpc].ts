import { createNextApiHandler } from '@trpc/server/adapters/next';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createContext } from '@/server/context';
import { router } from '@/server/router/_app';

// create the API handler, but don't return it yet
const nextApiHandler = createNextApiHandler({
  router,
  createContext,
});

// @link https://nextjs.org/docs/api-routes/introduction
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return nextApiHandler(req, res);
}
