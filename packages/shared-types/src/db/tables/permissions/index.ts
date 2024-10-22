import { TableType } from '../index.types';
import { permissionsEnum } from './type';

export type CustomPermissions = TableType<
  'permissions',
  {
    name: permissionsEnum | 'authorized';
    meta: MetaType;
  }
>;

type MetaType = {
  module: boolean;
  description: string;
  dependency_tree: {
    child: string[];
    parent: string | null;
    sibling: string | null;
  };
};
