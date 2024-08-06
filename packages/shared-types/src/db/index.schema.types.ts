import type { Functions } from "./functions/index.types";
import type { Database } from "./schema.types";
import type { Tables } from "./tables/index.types";
import type { Custom } from "./utils.types";
import type { Views } from "./views/index.types";

export type DB = Custom<
  Database,
  {
    public: Custom<
      Database["public"],
      { Tables: Tables; Views: Views; Functions: Functions }
    >;
  }
>;

export type DatabaseFunctions = {
  [Functions in keyof DB["public"]["Functions"]]: DB["public"]["Functions"][Functions];
};
export type DatabaseView = {
  [View in keyof DB["public"]["Views"]]: DB["public"]["Views"][View]["Row"];
};
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
