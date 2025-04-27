import { z } from 'zod';

export const createWorkspaceSchema = z.object({
    name: z.string().trim().min(2, { message: 'Name is required' }),
    description: z.string().trim().optional(),
    status: z.string().trim().optional(),
    /*image: z.union([
        z.instanceof(File),
        z.string().transform((value) => value === '' ? undefined : value),
    ]).optional()*/
})