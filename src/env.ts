import {z} from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  POSTGRESQL_URL: z
    .string()
    .url()
    .default('postgres://postgres:password@localhost:5433/postgres'),
  MYSQL_URI: z
    .string()
    .url(),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  WEB_URL: z.string().url().default('http://localhost:3000'),
  OPENAI_API_KEY: z.string().default(''),
})

export const env = envSchema.parse(process.env);