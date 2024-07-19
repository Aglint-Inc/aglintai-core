import { DatabaseTable } from '@aglint/shared-types';

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
          name: DatabaseTable['permissions']['name'];
          title: string;
          description: string;
          meta: DatabaseTable['permissions']['meta'];
          isActive: boolean;
        }[];
      };
    };
    all_permission: {
      [permission: number]: {
        id: number;
        name: DatabaseTable['permissions']['name'];
        title: string;
        description: string;
        meta: DatabaseTable['permissions']['meta'];
        isActive: boolean;
      };
    };
  };
};
