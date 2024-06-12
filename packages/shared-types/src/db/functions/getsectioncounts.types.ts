import type { Database } from "../schema.types";
import type { FunctionType } from "./index.types";

export type CustomGetSectionCounts = FunctionType<
  "getsectioncounts",
  {},
  Required<{
    [id in Database["public"]["Enums"]["application_status"]]: number;
  }>
>;
