import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

export function getDataDir(): string {
  const config = useRuntimeConfig()
  const dataDir = config.dataDir || join(process.cwd(), '.data', 'app')
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true })
  }
  return dataDir
}

export function getDbPath(): string {
  return join(getDataDir(), 'app.db')
}

export function getUploadsDir(): string {
  const uploadsDir = join(getDataDir(), 'uploads')
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true })
  }
  return uploadsDir
}

export function getMigrationsDir(): string {
  const candidates = [
    join(process.cwd(), 'server', 'db', 'migrations'),
    join(process.cwd(), '.output', 'server', 'db', 'migrations')
  ]

  for (const dir of candidates) {
    if (existsSync(dir)) {
      return dir
    }
  }

  return candidates[0]
}
