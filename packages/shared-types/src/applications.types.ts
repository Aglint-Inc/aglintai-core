import {
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
} from "./db/index.schema.types";

export type Applications = DatabaseTable["applications"];
export type ApplicationsInsert = DatabaseTableInsert["applications"];
export type ApplicationsUpdate = DatabaseTableUpdate["applications"];
