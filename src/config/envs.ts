import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number(),
})


export const envs = envSchema.parse(process.env)