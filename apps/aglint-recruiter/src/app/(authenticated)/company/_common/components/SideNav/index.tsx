import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { useFlags } from '@/company/hooks/useFlags';
import UITabs, { type UITabType } from '@/components/Common/UITabs';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { emailTemplateQueries } from '@/queries/email-templates';
import ROUTES from '@/utils/routing/routes';

function VerticalNav() {
  const router = useRouterPro();
  const { recruiter } = useTenant();
  const emailTemplates = useQuery(
    emailTemplateQueries.emailTemplates(recruiter.id),
  );
  const [firstTemplate, setFirstTemplate] = useState(null);
  const { checkPermissions } = useRolesAndPermissions();

  useEffect(() => {
    if (emailTemplates.isFetched) {
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
  ] as (UITabType['vertical'] & { show: boolean })[];

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
      defaultValue={(router.queryParams.tab as string) || filteredTabs[0].id}
      onClick={(value: string) => {
        router.replace(
          `${ROUTES['/company']()}?tab=${value}${value === 'emailTemplate' ? '&email=' + firstTemplate : ''}`,
        );
      }}
    />
  );
}

export default VerticalNav;
