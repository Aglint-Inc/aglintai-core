import {
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
} from './customSchema';

export type Applications = DatabaseTable['applications'];
export type ApplicationsInsert = DatabaseTableInsert['applications'];
export type ApplicationsUpdate = DatabaseTableUpdate['applications'];
