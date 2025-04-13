import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/drizzle/schema/*',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://postgres:ScpeLMGlrgPpqDDjjEsbRAxfiVkAhpVi@postgres.railway.internal:5432/railway',
  },
})