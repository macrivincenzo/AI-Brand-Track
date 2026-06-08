import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Reuse ONE pool across warm serverless invocations (and HMR in dev). A fresh
// pool per invocation/module-eval is what exhausts the Supabase pooler
// (EMAXCONNSESSION "max clients reached"). Better Auth imports this same `pool`
// (see lib/auth.ts) so the whole app shares a single pool.
const globalForDb = globalThis as unknown as { pool?: Pool };

const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL!,
    max: 10, // single shared pool; stays under the pooler's server-side limit
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000, // pooler can be slow under load; 2s was too aggressive
    maxUses: 7500,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;

// Create the drizzle database instance with schema
export const db = drizzle(pool, { schema });

// Export the pool for raw queries / Better Auth to share
export { pool };
