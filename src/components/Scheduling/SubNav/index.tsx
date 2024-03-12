import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { SubLinkSubMenu, SublinkTab } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

function SubNav() {
  const router = useRouter();
  const tabs = [
    'all Schedules',
    'my Schedules',
    'interview Modules',
    'email Templates',
    'all Interviewers',
    'settings'
  ];
  return (
    <>
      {tabs.map((item) => (
        <SublinkTab
          key={item}
          isActtive={router.query.tab === item.replace(' ', '')}
          text={capitalize(item)}
          onClickTab={{
            onClick: () => {
              if (item === 'settings') {
                router.push(
                  `${pageRoutes.SCHEDULING}?tab=${item.replace(' ', '')}&subtab=availability`
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
                      `${pageRoutes.SCHEDULING}?tab=${item.replace(' ', '')}&subtab=availability`
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
                      `${pageRoutes.SCHEDULING}?tab=${item.replace(' ', '')}&subtab=keywords`
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
