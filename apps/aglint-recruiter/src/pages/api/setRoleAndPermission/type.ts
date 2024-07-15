export type SetRoleAndPermissionAPI = {
  request: {
    delete: string;
    add: number;
    role_id: string;
  };
  response: {
    success: boolean;
    // removiedPermissions: number[];
    addedPermissions: {
      relation_id: string;
      id: number;
    }[];
  };
};
