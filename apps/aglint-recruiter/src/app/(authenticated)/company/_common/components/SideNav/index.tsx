import { useEffect, useState } from 'react';

import UITabs, { type UITabType } from '@/common/UITabs';
import { useFlags } from '@/company/hooks/useFlags';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';
import ROUTES from '@/utils/routing/routes';

function VerticalNav() {
  const router = useRouterPro<{
    email: NonNullable<(typeof emailTemplates)['data']>[number]['type'];
    tab: string;
  }>();
  const emailTemplates = api.email.template.get.useQuery();
  const [firstTemplate, setFirstTemplate] = useState<
    NonNullable<(typeof emailTemplates)['data']>[number]['type'] | null
  >(null);
  const { checkPermissions } = useRolesAndPermissions();

  useEffect(() => {
    if (emailTemplates.isFetched && emailTemplates?.data?.length) {
      setFirstTemplate(
        router.queryParams.email || emailTemplates.data[0]?.type,
      );
    }
  }, [emailTemplates.isFetched, router.queryParams.email]);
  const { isShowFeature } = useFlags();

  const settingsItems = [
    {
      name: 'Company Details',
      id: 'company-info',
      icon: 'Building',
      show: true,
    },
    {
      name: 'Working Hours',
      id: 'workingHours',
      icon: 'Clock',
      show: true,
    },
    {
      name: 'Holidays',
      id: 'holidays',
      icon: 'Calendar',
      show: true,
    },
    {
      name: 'User',
      id: 'team',
      icon: 'Users',
      show: true,
    },
    {
      name: 'Roles',
      id: 'roles',
      icon: 'Shield',
      show: isShowFeature('ROLES') && checkPermissions(['view_roles']),
    },
    {
      name: 'Templates',
      id: 'emailTemplate',
      icon: 'FileText',
      show: isShowFeature('SCHEDULING'),
    },
    {
      name: 'Scheduling',
      id: 'scheduling',
      icon: 'CalendarDays',
      show: isShowFeature('SCHEDULING'),
    },
    {
      name: 'Reasons',
      id: 'schedulingReasons',
      icon: 'List',
      show: isShowFeature('SCHEDULING'),
    },
    {
      name: 'Candidate Portal',
      id: 'portalSettings',
      icon: 'Globe',
      show: isShowFeature('CANDIDATE_PORTAL'),
    },
  ] as (UITabType & { show: boolean })[];

  const filteredTabs = settingsItems
    .filter((tab) => tab.show)
    .map((tab) => ({
      name: tab.name,
      id: tab.id,
      icon: tab.icon,
    }));

  return (
    <UITabs
      vertical
      tabs={filteredTabs}
      isKeyDisable={true}
      defaultValue={
        (router.queryParams.tab as unknown as string) || filteredTabs[0].id
      }
      onClick={(value: string) => {
        router.replace(
          `${ROUTES['/company']()}?tab=${value}${value === 'emailTemplate' ? '&email=' + firstTemplate : ''}`,
        );
      }}
    />
  );
}

export default VerticalNav;
