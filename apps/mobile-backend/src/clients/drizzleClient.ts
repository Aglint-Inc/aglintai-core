import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  throw new Error('Missing environment variables for postgres connection');
}

export { connectionString };

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
