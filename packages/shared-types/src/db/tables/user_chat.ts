import type { CallBackAll } from "../../aglintApi";
import type { FunctionNames } from "../../aglintApi/supervisor/functions";
import type { TableType } from "./index.types";

export type CustomUserChat = TableType<
  "user_chat",
  {
    type: "user" | "agent";
    function: FunctionNames | null;
    metadata: CallBackAll[];
  }
>;
