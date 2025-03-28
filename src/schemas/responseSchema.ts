import { z } from 'zod'

export const responseSchema = (dataSchema: z.ZodTypeAny) => z.object({
    hasError: z.boolean(),
    message: z.string().optional(),
    data: dataSchema.optional(),
})