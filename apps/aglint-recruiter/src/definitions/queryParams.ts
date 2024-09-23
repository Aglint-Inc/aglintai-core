import type { companySettingTabsType } from '@/company/components/SideNav/utils';
import type { Pages } from '@/constant/queryParamGenerator';

export type QueryParams = Pages<{
  '/company': {
    tab: companySettingTabsType;
    email?: string;
  };
}>;
