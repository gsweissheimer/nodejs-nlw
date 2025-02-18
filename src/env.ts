import {z} from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  POSTGRESQL_URL: z.string().url().default("postgres://postgres:password@localhost:5433/postgres"),
  REDIS_URL: z.string().url().default("redis://localhost:6379"),
  WEB_URL: z.string().url().default("http://localhost:3000"),
});

export const env = envSchema.parse(process.env);