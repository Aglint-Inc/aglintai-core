import type { Database } from "../schema.types";
import type { CustomizableTypes, Type } from "../utils.types";
import { CustomGetApplicantBadges } from "./get_applicant_badges.types";
import { CustomGetApplicantLocations } from "./get_applicant_locations.types";
import type { CustomGetSectionCounts } from "./getsectioncounts.types";
import type { CustomInsertDebriefSession } from "./insert_debrief_session.types";
import type { CustomUpdateDebriefSession } from "./update_debrief_session.types";

type DatabaseFunctions = Database["public"]["Functions"];
type DatabaseFunctionArgs<T extends keyof DatabaseFunctions> =
  DatabaseFunctions[T]["Args"];
type DatabaseFunctionReturns<T extends keyof DatabaseFunctions> =
  DatabaseFunctions[T]["Returns"];

export type FunctionType<
  T extends keyof DatabaseFunctions,
  U extends DatabaseFunctionArgs<T> extends CustomizableTypes<"Array">
    ? { [id in keyof Partial<DatabaseFunctionArgs<T>[number]>]: any }
    : DatabaseFunctionArgs<T> extends CustomizableTypes<"Object">
      ? { [id in keyof Partial<DatabaseFunctionArgs<T>>]: any }
      : never,
  V extends DatabaseFunctionReturns<T> extends CustomizableTypes<"Array">
    ? { [id in keyof Partial<DatabaseFunctionReturns<T>[number]>]: any }
    : DatabaseFunctionReturns<T> extends CustomizableTypes<"Object">
      ? { [id in keyof Partial<DatabaseFunctionReturns<T>>]: any }
      : any,
> = Type<
  DatabaseFunctions[T],
  //@ts-ignore
  {
    Args: Type<
      DatabaseFunctionArgs<T>,
      //@ts-ignore
      Partial<U>
    >;
    Returns: Type<
      //@ts-ignore
      DatabaseFunctionReturns<T>,
      //@ts-ignore
      Partial<V>
    >;
  }
>;

export type Functions = Type<
  DatabaseFunctions,
  {
    insert_debrief_session: CustomInsertDebriefSession;
    update_debrief_session: CustomUpdateDebriefSession;
    getsectioncounts: CustomGetSectionCounts;
    get_applicant_locations: CustomGetApplicantLocations;
    get_applicant_badges: CustomGetApplicantBadges;
  }
>;
