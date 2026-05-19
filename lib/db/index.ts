import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL ?? "";

// During build (no DATABASE_URL), use a dummy URL — real queries won't run at build time
const sql = neon(DATABASE_URL || "postgresql://build:build@build.neon.tech/build");
export const db = drizzle(sql, { schema });

export type DB = typeof db;
