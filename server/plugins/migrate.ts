import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { useDb } from '../utils/db'
import { seedDatabase } from '../db/seed'

export default defineNitroPlugin(async () => {
  const db = useDb()
  const migrationsFolder = getMigrationsDir()

  try {
    migrate(db, { migrationsFolder })
    await seedDatabase()
    console.log('[db] Migrations and seed completed')
  } catch (error) {
    console.error('[db] Migration/seed failed:', error)
  }
})
