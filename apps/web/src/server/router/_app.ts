import { chatMessageRouter } from '@/server/router/chat-message-router';
import { router as trpcRouter } from '@/server/trpc';

export const router = trpcRouter({
  chatMessage: chatMessageRouter,
});

export type TrpcRouter = typeof router;
