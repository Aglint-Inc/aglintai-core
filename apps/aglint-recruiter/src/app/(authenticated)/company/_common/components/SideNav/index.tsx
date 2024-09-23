import { type permissionsEnum } from '@aglint/shared-types/src/db/tables/permissions/type';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getUrlPro, useRouterPro } from '@/hooks/useRouterPro';
import { emailTemplateQueries } from '@/queries/email-templates';

import type { companySettingTabsType } from './utils';

function VerticalNav() {
  const router = useRouterPro();
  const { recruiter } = useAuthDetails();
  const emailTemplates = useQuery(
    emailTemplateQueries.emailTemplates(recruiter.id),
  );
  const [firstTemplate, setFirstTemplate] = useState(null);
  const { ifAllowed } = useRolesAndPermissions();

  useEffect(() => {
    if (emailTemplates.isFetched) {
      setFirstTemplate(
        router.queryParams.email || emailTemplates.data[0]?.type,
      );
    }
  }, [emailTemplates.isFetched, router.queryParams.email]);
  const { isShowFeature } = useAuthDetails();

  const settingsItems = [
    {
      label: 'Company Details',
      value: 'company-info',
      icon: 'Building',
      show: true,
    },
    {
      label: 'Working Hours',
      value: 'workingHours',
      icon: 'Clock',
      show: true,
    },
    {
      label: 'Holidays',
      value: 'holidays',
      icon: 'Calendar',
      show: true,
    },
    {
      label: 'User',
      value: 'team',
      permission: 'view_users',
      icon: 'Users',
      show: true,
    },
    {
      label: 'Roles',
      value: 'roles',
      permission: 'view_roles',
      icon: 'Shield',
      show: isShowFeature('ROLES'),
    },
    {
      label: 'Templates',
      value: 'emailTemplate',
      icon: 'FileText',
      show: isShowFeature('SCHEDULING'),
    },
    {
      label: 'Scheduling',
      value: 'scheduling',
      icon: 'CalendarDays',
      show: isShowFeature('SCHEDULING'),
    },
    {
      label: 'Reasons',
      value: 'schedulingReasons',
      icon: 'List',
      show: isShowFeature('SCHEDULING'),
    },
    {
      label: 'Candidate Portal',
      value: 'portalSettings',
      icon: 'Globe',
      show: isShowFeature('CANDIDATE_PORTAL'),
    },
  ] as {
    label: string;
    value: companySettingTabsType;
    permission?: permissionsEnum | 'authorized';
    icon: string;
    show: boolean;
  }[];

  return (
    <div className='space-y-1'>
      <nav className='flex flex-col'>
        {settingsItems
          .filter((ele) => ele.show)
          .map((item, i) => {
            // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
            const Icon = item.icon ? require('lucide-react')[item.icon] : null;
            const NavButton = (
              <Link
                href={getUrlPro('/company', {
                  searchParams: {
                    tab: item.value,
                    email:
                      item.value === 'emailTemplate'
                        ? firstTemplate
                        : undefined,
                  },
                })}
                key={i}
              >
                <Button
                  variant='ghost'
                  className={cn(
                    'justify-start',
                    router.queryParams.tab === item.value && 'bg-muted',
                  )}
                >
                  {Icon && <Icon className='mr-2 h-4 w-4' />}
                  {item.label}
                </Button>
              </Link>
            );

            return item?.permission
              ? ifAllowed(NavButton, [item.permission])
              : NavButton;
          })}
      </nav>
    </div>
  );
}

export default VerticalNav;
