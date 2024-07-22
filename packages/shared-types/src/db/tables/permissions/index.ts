import { TableType } from "../index.types";
import { permissionsEnum } from "./type";

export type CustomPermissions = TableType<
  "permissions",
  {
    name: permissionsEnum | "authorized";
    meta: MetaType;
  }
>;

type MetaType = {
  is_module: true;
  description: string;
  dependency_tree: {
    child: string[];
    parent: string;
    sibling: string;
  };
};
