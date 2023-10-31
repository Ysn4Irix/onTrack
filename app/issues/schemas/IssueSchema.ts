import zod, { z } from 'zod'

export const issueSchema = zod.object({
  title: zod
    .string()
    .min(4, {
      message: 'Title must be at least 4 characters long',
    })
    .max(50, {
      message: 'Title must be at most 50 characters long',
    }),
  description: zod
    .string()
    .min(4, {
      message: 'Description must be at least 4 characters long',
    })
    .max(65535, {
      message: 'Description must be at most 65535 characters long',
    }),
  status: zod.enum(['OPEN', 'CLOSED']),
  createdAt: zod.date(),
  updatedAt: zod.date(),
})

export type Issue = z.infer<typeof issueSchema>
