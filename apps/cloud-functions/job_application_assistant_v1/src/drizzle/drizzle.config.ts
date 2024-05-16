import type { Config } from "drizzle-kit";
import { connectionString } from "../utils";

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config;
