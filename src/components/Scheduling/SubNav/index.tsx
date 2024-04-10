import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { SubLinkSubMenu, SublinkTab } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Database } from '@/src/types/schema';
import { pageRoutes } from '@/src/utils/pageRouting';

import { settingsItems } from './utils';

function SubNav() {
  const router = useRouter();
  const { isAllowed } = useAuthDetails();
  const tabs: {
    text: string;
    roles?: Database['public']['Enums']['user_roles'][];
  }[] = [
    { text: 'my Schedules' },
    { text: 'candidates', roles: ['admin', 'recruiter', 'scheduler'] },
    { text: 'interview types', roles: ['admin', 'recruiter', 'scheduler'] },
    { text: 'interviewers', roles: ['admin', 'recruiter', 'scheduler'] },
    { text: 'settings', roles: ['admin', 'recruiter', 'scheduler'] },
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
                  if (!router.query.subtab) {
                    router.push(
                      `${pageRoutes.SCHEDULING}?tab=${item.replace(
                        ' ',
                        '',
                      )}&subtab=${settingsItems[0].value}`,
                    );
                  }
                } else {
                  router.push(
                    `${pageRoutes.SCHEDULING}?tab=${item.replace(' ', '')}`,
                  );
                }
              },
            }}
            isSubMenuVisible={item === 'settings' && router.query.tab === item}
            slotSubLinkSubMenu={<SettingsSubNabItem tab={item} />}
          />
        ))}
    </>
  );
}

export default SubNav;
function SettingsSubNabItem({ tab }: { tab: string }) {
  const router = useRouter();
  return (
    <>
      {settingsItems.map((item, i) => {
        return (
          <SubLinkSubMenu
            key={i}
            textSubMenu={item.label}
            isActive={router.query.subtab === item.value}
            onClickSubMenu={{
              onClick: (e: any) => {
                e.stopPropagation();
                router.push(
                  `${pageRoutes.SCHEDULING}?tab=${tab.replace(
                    ' ',
                    '',
                  )}&subtab=${item.value}`,
                );
              },
            }}
          />
        );
      })}
    </>
  );
}
