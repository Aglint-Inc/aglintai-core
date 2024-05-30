import { Database } from "../schema.types";
import { Type } from "../utils.types";
import { CustomWorkflowView } from "./workflow_view.types";

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

export type Views = Type<DatabaseViews, { workflow_view: CustomWorkflowView }>;
