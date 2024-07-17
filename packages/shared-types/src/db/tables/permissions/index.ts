import { TableType } from "../index.types";
import { permissionsEnum } from "./type";

export type CustomPermissions = TableType<
  "permissions",
  {
    name: permissionsEnum;
    dependency_tree: DependencyTreeType;
  }
>;

type DependencyTreeType = {
  child: string[];
  parent: string;
  sibling: string;
};
