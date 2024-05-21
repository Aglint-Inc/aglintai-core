import { Database } from "..";
import { Tables } from "./tables/index.types";
// import { CustomTables } from "./tables/index.types";
import { Type } from "./utils.types";

export type DB = Type<
  Database,
  { public: Type<Database["public"], { Tables: Tables }> }
>;
