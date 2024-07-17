import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

export type GetRoleAndPermissionsAPI = {
  request: {};
  response: {
    rolesAndPermissions: {
      [roles: string]: {
        id: string;
        name: string;
        isEditable: boolean;
        assignedTo: string[];
        description: string;
        permissions: {
          relation_id: string;
          id: number;
          name: DatabaseEnums['permissions_type'];
          title: string;
          description: string;
          dependency_tree: DatabaseTable['permissions']['dependency_tree'];
          isActive: boolean;
        }[];
      };
    };
    all_permission: {
      [permission: number]: {
        id: number;
        name: DatabaseEnums['permissions_type'];
        title: string;
        description: string;
        dependency_tree: DatabaseTable['permissions']['dependency_tree'];
        isActive: boolean;
      };
    };
  };
};
