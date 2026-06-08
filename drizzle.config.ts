import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle-generated',
  dialect: 'postgresql',
  dbCredentials: {
    // Migrations/DDL need a direct session connection — the transaction-mode
    // pooler (pgbouncer) breaks on prepared statements / DDL. Prefer DIRECT_URL
    // (direct :5432), fall back to DATABASE_URL for local/dev.
    url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },
  // Exclude Better Auth tables from migrations since they're managed by Better Auth
  tablesFilter: ['!user', '!session', '!account', '!verification'],
} satisfies Config;