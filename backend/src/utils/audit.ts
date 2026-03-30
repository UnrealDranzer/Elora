import type { Request } from 'express';
import type { Prisma } from '@prisma/client';

import { prisma } from '@/config/prisma.js';

export const createAuditLog = async (
  request: Request,
  input: {
    action: string;
    entityType: string;
    entityId: string;
    payload?: Record<string, unknown> | null;
  }
) =>
  prisma.auditLog.create({
    data: {
      actorId: request.auth?.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      payload: (input.payload as Prisma.InputJsonValue | undefined) ?? undefined,
      ipAddress: request.ip,
      userAgent: request.get('user-agent')
    }
  });
