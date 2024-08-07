import { CallBackAll } from "@aglint/shared-utils";
import { FunctionNames } from "../../aglintApi/supervisor";
import type { TableType } from "./index.types";

export type CustomUserChat = TableType<
  "user_chat",
  {
    type: "user" | "agent";
    function: FunctionNames;
    metadata: CallBackAll[];
  }
>;
