import { Button } from '@components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@components/ui/navigation-menu';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { emailTemplateQueries } from '@/queries/email-templates';
import ROUTES from '@/utils/routing/routes';

import { settingsItems, settingSubNavItem } from '../SideNav/utils';
import { emailTempKeys } from './utils';

const SettingsSubNavItem: React.FC = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const emailTemplates = useQuery(
    emailTemplateQueries.emailTemplates(recruiter.id),
  );
  const [firstTemplate, setFirstTemplate] = useState<string | null>(null);
  const { ifAllowed } = useRolesAndPermissions();

  useEffect(() => {
    if (emailTemplates.isFetched) {
      if (router.query.email) {
        setFirstTemplate(router.query.email as string);
      } else {
        setFirstTemplate(
          [...emailTemplates.data]
            ?.filter((emailPath) => emailTempKeys.includes(emailPath.type))
            .filter((v, i, a) => a.findIndex((v2) => v2.type === v.type) === i)
            .sort((a, b) => a.type.localeCompare(b.type))[0].type,
        );
      }
    }
  }, [router, emailTemplates.isFetched, emailTemplates.data]);

  return (
    <NavigationMenu orientation='vertical' className='max-w-[200px]'>
      <NavigationMenuList className='flex-col items-start space-y-1'>
        {settingsItems.map((item, i) => {
          const navItem = (
            <NavigationMenuItem key={i}>
              <Button
                variant={
                  router.query.tab === item.value ? 'secondary' : 'ghost'
                }
                className='w-full justify-start'
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  if (item.value === settingSubNavItem['EMAILTEMPLATE']) {
                    router.push(
                      `${ROUTES['/company']()}?tab=${item.value}&email=${firstTemplate}`,
                    );
                  } else {
                    router.push(`${ROUTES['/company']()}?tab=${item.value}`);
                  }
                }}
              >
                {item.label}
              </Button>
            </NavigationMenuItem>
          );

          return item?.permission
            ? ifAllowed(navItem, [item.permission])
            : navItem;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SettingsSubNavItem;
