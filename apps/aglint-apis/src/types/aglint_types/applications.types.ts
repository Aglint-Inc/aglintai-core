import { Database } from "./schema";

export type Applications = Database['public']['Tables']['applications']['Row'];
export type ApplicationsInsert =
  Database['public']['Tables']['applications']['Insert'];
export type ApplicationsUpdate =
  Database['public']['Tables']['applications']['Update'];