import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { z } from 'zod';

import { prisma } from '@purplefish/db';

import { publicProcedure, router as trpcRouter } from '@/server/trpc';
import { getResponseAsync } from '@/utils/get-response-async';

export const chatMessageRouter = trpcRouter({
  getAll: publicProcedure
    .output(
      z
        .object({
          chatMessages: z.array(
            z.object({
              id: z.string(),
              createdAt: z.date(),
              prompt: z.string(),
              response: z.string().nullable(),
              toolName: z.string().nullable(),
              toolOutput: z.string().nullable(),
            }),
          ),
        })
        .nullable(),
    )
    .query(async () => {
      const chatMessages = await prisma.chatMessage.findMany();

      return {
        chatMessages: chatMessages.map((chatMessage) => ({
          id: chatMessage.id,
          createdAt: chatMessage.createdAt,
          prompt: chatMessage.prompt,
          response: chatMessage.response,
          toolName: chatMessage.toolName,
          toolOutput: chatMessage.toolOutput,
        })),
      };
    }),
  deleteAll: publicProcedure.mutation(async () => {
    await prisma.chatMessage.deleteMany();
    return null;
  }),
  send: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .output(
      z.object({
        response: z.string().nullable(),
        toolName: z.string().nullable(),
        toolOutput: z.string().nullable(),
      }),
    )
    .mutation(async ({ input }) => {
      const chatMessages = await prisma.chatMessage.findMany();
      const chatHistory: (HumanMessage | AIMessage)[] = [];

      chatMessages.forEach((message) => {
        chatHistory.push(new HumanMessage(message.prompt));
        if (message.response) {
          chatHistory.push(new AIMessage(message.response));
        }
      });

      let chatMessage = await prisma.chatMessage.create({
        data: {
          prompt: input.prompt,
        },
      });

      try {
        const response = await getResponseAsync(input.prompt, { chatHistory });
        chatMessage = await prisma.chatMessage.update({
          where: {
            id: chatMessage.id,
          },
          data: {
            response: response.output,
            toolName: response.toolName,
            toolOutput: response.toolInput,
          },
        });
      } catch (err) {
        console.error(err);
      }

      return {
        response: chatMessage.response,
        toolName: chatMessage.toolName,
        toolOutput: chatMessage.toolOutput,
      };
    }),
});
