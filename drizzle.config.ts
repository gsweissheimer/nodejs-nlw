import type { Config } from 'drizzle-kit'

export default {
    schema: './src/drizzle/schema/*',
    out: './src/drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://docker:docker@localhost:5433/connect'
    }
} satisfies Config;