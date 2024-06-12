import type { Database } from "../schema.types";
import type { Type } from "../utils.types";
import { CustomApplicationView } from "./application_view.types";
import type { CustomWorkflowView } from "./workflow_view.types";

type DatabaseViews = Database["public"]["Views"];

export type ViewType<
  T extends keyof DatabaseViews,
  U extends { [id in keyof Partial<DatabaseViews[T]["Row"]>]: any },
> = Type<
  DatabaseViews[T],
  //@ts-ignore
  {
    Row: Type<DatabaseViews[T]["Row"], Partial<U>>;
  }
>;

export type Views = Type<
  DatabaseViews,
  { workflow_view: CustomWorkflowView; application_view: CustomApplicationView }
>;
