import { Prisma, type PrismaClient } from '@prisma/client';

const isRetryableTransactionError = (error: unknown) =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  error.code === 'P2034';

export const runSerializableTransaction = async <T>(
  prismaClient: PrismaClient,
  callback: (tx: Prisma.TransactionClient) => Promise<T>,
  maxRetries = 3
): Promise<T> => {
  let attempt = 0;

  while (true) {
    try {
      return await prismaClient.$transaction(callback, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable
      });
    } catch (error) {
      attempt += 1;

      if (!isRetryableTransactionError(error) || attempt >= maxRetries) {
        throw error;
      }
    }
  }
};
