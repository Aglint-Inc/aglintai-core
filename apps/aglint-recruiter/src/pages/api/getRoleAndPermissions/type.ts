import { type DatabaseTable } from '@aglint/shared-types';

export type GetRoleAndPermissionsAPI = {
  request: object;
  response: {
    rolesAndPermissions: {
      [roles: string]: {
        id: string;
        name: string;
        isEditable: boolean;
        assignedTo: string[];
        description: string | null;
        permissions: {
          relation_id: string | null;
          id: number;
          title: string | null;
          name: DatabaseTable['permissions']['name'] | null;
          description: string | null;
          meta: DatabaseTable['permissions']['meta'] | null;
          isActive: boolean;
        }[];
      };
    };
    all_permission: {
      [permission: number]: {
        id: number;
        name: DatabaseTable['permissions']['name'];
        title: string;
        description: string | null;
        meta: DatabaseTable['permissions']['meta'];
        isActive: boolean;
      };
    };
  };
};
