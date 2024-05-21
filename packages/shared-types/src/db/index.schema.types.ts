import { Database } from "./schema.types";
import { Tables } from "./tables/index.types";
import { Type } from "./utils.types";

export type DB = Type<
  Database,
  { public: Type<Database["public"], { Tables: Tables }> }
>;

export type DatabaseTable = {
  [Table in keyof DB["public"]["Tables"]]: DB["public"]["Tables"][Table]["Row"];
};
export type DatabaseTableInsert = {
  [Table in keyof DB["public"]["Tables"]]: DB["public"]["Tables"][Table]["Insert"];
};
export type DatabaseTableUpdate = {
  [Table in keyof DB["public"]["Tables"]]: DB["public"]["Tables"][Table]["Update"];
};

export type DatabaseEnums = DB["public"]["Enums"];
