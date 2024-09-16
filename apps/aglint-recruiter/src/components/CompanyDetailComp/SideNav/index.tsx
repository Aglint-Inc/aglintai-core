import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { emailTemplateQueries } from '@/queries/email-templates';
import ROUTES from '@/utils/routing/routes';

import { settingsItems, settingSubNavItem } from './utils';

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

  return (
    <div className='space-y-1'>
      <nav className='flex flex-col'>
        {settingsItems.map((item, i) => {
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
