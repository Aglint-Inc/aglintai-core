import { Pool } from "pg";

import dotenv from "dotenv";
dotenv.config();
// const user = process.env.DATABASE_USER;
// const host = process.env.HOST;
// const database = process.env.DATABASE;
// const password = process.env.PASSWORD;
// const port = Number(process.env.PORT);
const connectionString = process.env.DATABASE_URL!;

if (
  // !user || !host || !database || !password || !port ||
  !connectionString
) {
  throw new Error("Missing environment variables for postgres connection");
}
export { connectionString };
// export const database_Options = {
//   user,
//   host,
//   database,
//   password,
//   port,
//   // port: 6543, // default PostgreSQL port
// };
