import type { mapSaveDepartments } from './process';

export type GreenhouseDepartmentsAPI = {
  request: {};
  response: Awaited<ReturnType<typeof mapSaveDepartments>>;
};
