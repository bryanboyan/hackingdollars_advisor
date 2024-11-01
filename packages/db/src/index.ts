import { Prisma, PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient().$extends({});

export { Prisma };
