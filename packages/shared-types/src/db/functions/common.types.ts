import { Database } from "../schema.types";

export type CustomRequestPayload = Required<
  Pick<
    Database["public"]["Tables"]["request"]["Insert"],
    "assignee_id" | "assigner_id" | "type" | "title"
  >
>;
