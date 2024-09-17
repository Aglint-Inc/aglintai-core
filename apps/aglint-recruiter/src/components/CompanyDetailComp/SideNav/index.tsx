import { type permissionsEnum } from '@aglint/shared-types/src/db/tables/permissions/type';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { emailTemplateQueries } from '@/queries/email-templates';
import ROUTES from '@/utils/routing/routes';

import { settingSubNavItem } from './utils';

function VerticalNav() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const emailTemplates = useQuery(
    emailTemplateQueries.emailTemplates(recruiter.id),
  );
  const [firstTemplate, setFirstTemplate] = useState(null);
  const { ifAllowed } = useRolesAndPermissions();

  useEffect(() => {
    if (emailTemplates.isFetched) {
      setFirstTemplate(router.query.email || emailTemplates.data[0]?.type);
    }
  }, [emailTemplates.isFetched, router.query.email]);

  const handleNavClick = (value: string) => {
    const query = { tab: value };
    if (value === settingSubNavItem['EMAILTEMPLATE']) {
      query['email'] = firstTemplate;
    }
    router.push({ pathname: ROUTES['/company'](), query });
  };
  const { isShowFeature } = useAuthDetails();

  const settingsItems = [
    {
      label: 'Company Details',
      value: settingSubNavItem['COMPANYINFO'],
      icon: 'Building',
      show: true,
    },
    {
      label: 'Working Hours',
      value: settingSubNavItem['WORKINGHOURS'],
      icon: 'Clock',
      show: true,
    },
    {
      label: 'Holidays',
      value: settingSubNavItem['HOLIDAYS'],
      icon: 'Calendar',
      show: true,
    },
    {
      label: 'User',
      value: settingSubNavItem['USERS'],
      permission: 'view_users',
      icon: 'Users',
      show: true,
    },
    {
      label: 'Roles',
      value: settingSubNavItem['ROLES'],
      permission: 'view_roles',
      icon: 'Shield',
      show: isShowFeature('ROLES'),
    },
    {
      label: 'Templates',
      value: settingSubNavItem['EMAILTEMPLATE'],
      icon: 'FileText',
      show: isShowFeature('SCHEDULING'),
    },
    {
      label: 'Scheduling',
      value: settingSubNavItem['SCHEDULING'],
      icon: 'CalendarDays',
      show: isShowFeature('SCHEDULING'),
    },
    {
      label: 'Reasons',
      value: settingSubNavItem['SCHEDULING_REASONS'],
      icon: 'List',
      show: isShowFeature('SCHEDULING'),
    },
    {
      label: 'Candidate Portal',
      value: settingSubNavItem['PORTAL_SETTINGS'],
      icon: 'Globe',
      show: isShowFeature('CANDIDATE_PORTAL'),
    },
  ] as {
    label: string;
    value: string;
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
              <Button
                key={i}
                variant='ghost'
                className={cn(
                  'justify-start',
                  router.query.tab === item.value && 'bg-muted',
                )}
                onClick={() => handleNavClick(item.value)}
              >
                {Icon && <Icon className='mr-2 h-4 w-4' />}
                {item.label}
              </Button>
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
