import type { Database } from "../schema.types";
import type { Type } from "../utils.types";
import type { CustomGetSectionCounts } from "./getsectioncounts.types";
import type { CustomInsertDebriefSession } from "./insert_debrief_session.types";
import type { CustomUpdateDebriefSession } from "./update_debrief_session.types";

type DatabaseFunctions = Database["public"]["Functions"];

export type FunctionType<
  T extends keyof DatabaseFunctions,
  U extends { [id in keyof Partial<DatabaseFunctions[T]["Args"]>]: any },
  V extends { [id in keyof Partial<DatabaseFunctions[T]["Returns"]>]: any },
> = Type<
  DatabaseFunctions[T],
  //@ts-ignore
  {
    Args: Type<DatabaseFunctions[T]["Args"], Partial<U>>;
    Returns: Type<DatabaseFunctions[T]["Returns"], Partial<V>>;
  }
>;

export type Functions = Type<
  DatabaseFunctions,
  {
    insert_debrief_session: CustomInsertDebriefSession;
    update_debrief_session: CustomUpdateDebriefSession;
    getsectioncounts: CustomGetSectionCounts;
  }
>;
