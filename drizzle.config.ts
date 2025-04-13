import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/drizzle/schema/*',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://postgres:FdtnFzLiWyQZNTDOUtsvYxajewErRoJu@trolley.proxy.rlwy.net:48702/railway',
  },
})