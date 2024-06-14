import { appKey } from '..';

export const companyMembersKeys = {
  companyMembers: () => ({ queryKey: [appKey, 'company-members'] }),
} as const;
