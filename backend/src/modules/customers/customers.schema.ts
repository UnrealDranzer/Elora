import { z } from 'zod';

export const customerIdParamsSchema = z.object({
  id: z.string().cuid()
});

