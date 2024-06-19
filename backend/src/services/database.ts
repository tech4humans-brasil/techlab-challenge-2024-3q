import path from 'path'
import { DataSource } from 'typeorm'
import { SOURCE_DIR } from '../constants/dirs.js'
import { APP_NAME } from '../constants/env.js'

export const database = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.join(SOURCE_DIR, 'entities', '*')],
  migrations: [path.join(SOURCE_DIR, 'migrations', '*')],
  applicationName: APP_NAME,
  logger: 'advanced-console',
  logging: 'all',
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
})
