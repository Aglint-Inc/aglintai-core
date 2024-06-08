import { useApplication } from '.';

export type Application = ReturnType<
  typeof useApplication
>['application']['data'];
