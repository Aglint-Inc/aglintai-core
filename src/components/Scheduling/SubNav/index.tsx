import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { SubLinkSubMenu, SublinkTab } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Database } from '@/src/types/schema';
import { pageRoutes } from '@/src/utils/pageRouting';

function SubNav() {
  const router = useRouter();
  const { isAllowed } = useAuthDetails();
  const tabs: {
    text: string;
    roles?: Database['public']['Enums']['user_roles'][];
  }[] = [
    { text: 'all Schedules', roles: ['admin', 'recruiter', 'scheduler'] },
    { text: 'my Schedules' },
    { text: 'interview Modules', roles: ['admin', 'recruiter', 'scheduler'] },
    { text: 'email Template', roles: ['admin', 'recruiter', 'scheduler'] },
    { text: 'all Interviewers', roles: ['admin', 'recruiter', 'scheduler'] },
    { text: 'settings', roles: ['admin', 'recruiter', 'scheduler'] }
  ];
  return (
    <>
      {tabs
        .filter((item) => (item.roles ? isAllowed(item.roles) : true))
        .map(({ text: item }) => (
          <SublinkTab
            key={item}
            isActtive={router.query.tab === item.replace(' ', '')}
            text={capitalize(item)}
            onClickTab={{
              onClick: () => {
                if (item === 'settings') {
                  router.push(
                    `${pageRoutes.SCHEDULING}?tab=${item.replace(
                      ' ',
                      ''
                    )}&subtab=availability`
                  );
                } else {
                  router.push(
                    `${pageRoutes.SCHEDULING}?tab=${item.replace(' ', '')}`
                  );
                }
              }
            }}
            isSubMenuVisible={item === 'settings' && router.query.tab === item}
            slotSubLinkSubMenu={
              <>
                <SubLinkSubMenu
                  textSubMenu={'Availability'}
                  isActive={router.query.subtab === 'availability'}
                  onClickSubMenu={{
                    onClick: (e: any) => {
                      e.stopPropagation();
                      router.push(
                        `${pageRoutes.SCHEDULING}?tab=${item.replace(
                          ' ',
                          ''
                        )}&subtab=availability`
                      );
                    }
                  }}
                />
                <SubLinkSubMenu
                  textSubMenu={'Keywords'}
                  isActive={router.query.subtab === 'keywords'}
                  onClickSubMenu={{
                    onClick: (e: any) => {
                      e.stopPropagation();
                      router.push(
                        `${pageRoutes.SCHEDULING}?tab=${item.replace(
                          ' ',
                          ''
                        )}&subtab=keywords`
                      );
                    }
                  }}
                />
              </>
            }
          />
        ))}
    </>
  );
}

export default SubNav;
