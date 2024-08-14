import { CallBackAll } from "../../aglintApi";
import { FunctionNames } from "../../aglintApi/supervisor/functions";
import type { TableType } from "./index.types";

export type CustomUserChat = TableType<
  "user_chat",
  {
    type: "user" | "agent";
    function: FunctionNames | null;
    metadata: CallBackAll[];
  }
>;
