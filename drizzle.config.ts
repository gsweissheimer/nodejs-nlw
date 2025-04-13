import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/drizzle/schema/*',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
            url: 'postgresql://docker:docker@localhost:5433/connect'
        }
    });