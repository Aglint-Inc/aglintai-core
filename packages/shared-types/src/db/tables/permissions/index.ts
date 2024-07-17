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
  child: number[];
  parent: number;
  sibling: number;
};
