import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.NUXT_DATA_DIR
      ? `${process.env.NUXT_DATA_DIR}/app.db`
      : './.data/app/app.db'
  }
})
