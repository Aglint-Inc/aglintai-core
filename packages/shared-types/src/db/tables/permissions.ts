import type { DatabaseEnums } from "../index.schema.types";
import type { TableType } from "./index.types";

export type CustomPermissions = TableType<
  "permissions",
  {
    dependency_tree: DependencyTreeType;
  }
>;

type DependencyTreeType = {
  child: string[];
  parent: string;
  sibling: string;
};
