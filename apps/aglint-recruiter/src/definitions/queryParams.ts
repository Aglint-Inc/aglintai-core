import type { CompanySettingTabsType } from '@/company/components/SideNav/utils';
import type { Pages } from '@/constant/queryParamGenerator';

export type QueryParams = Pages<{
  '/company': {
    tab: CompanySettingTabsType;
    email?: string;
  };
}>;
