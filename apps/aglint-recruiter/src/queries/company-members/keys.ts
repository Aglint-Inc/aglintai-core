import { appKey, argsToKeys } from '..';
import { getCompanyMembers } from '.';

export const companyMembersKeys = {
  all: { querKey: [appKey, 'company-members'] },
  filterWithRecruiterId: (args: Parameters<typeof getCompanyMembers>[0]) => {
    return {
      queryKey: [
        ...companyMembersKeys.all.querKey,
        ...argsToKeys(args),
      ] as string[],
    };
  },
} as const;
