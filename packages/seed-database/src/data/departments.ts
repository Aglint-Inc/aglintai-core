import { DatabaseTableInsert } from '@aglint/shared-types';

export const departments: Pick<DatabaseTableInsert['departments'], 'name'>[] = [
  {
    name: 'Sales and Marketing',
  },
  {
    name: 'Product Development',
  },
  {
    name: 'Finance and Accounting',
  },
  {
    name: 'Customer Support',
  },
  {
    name: 'Customer Success',
  },
  {
    name: 'Quality Assurance',
  },
  {
    name: 'Technical Support',
  },
  {
    name: 'Human Resources',
  },
  {
    name: 'Legal',
  },
  {
    name: 'Operations',
  },
];
