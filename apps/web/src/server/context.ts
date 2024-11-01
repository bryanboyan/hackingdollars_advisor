import type { inferAsyncReturnType } from '@trpc/server';

interface TrpcContext {}

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 * */
export const createContext = async (): Promise<TrpcContext> => {
  return {};
};

export type Context = inferAsyncReturnType<typeof createContext>;
