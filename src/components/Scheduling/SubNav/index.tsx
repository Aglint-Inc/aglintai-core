import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { SublinkTab } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

function SubNav() {
  const router = useRouter();
  const tabs = [
    'all Schedules',
    'my Schedules',
    'interview Modules',
    'email Templates',
    'interviewers',
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
              router.push(
                `${pageRoutes.SCHEDULING}?tab=${item.replace(' ', '')}`
              );
            }
          }}
        />
      ))}
      {/* <SublinkTab
        isActtive={router.query.tab === 'mySchedules'}
        text={'My Schedules'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=mySchedules`);
          },
        }}
      />
      <SublinkTab
        isActtive={router.query.tab === 'interviewModules'}
        text={'Interview Modules'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=interviewModules`);
          },
        }}
      />
      <SublinkTab
        isActtive={router.query.tab === 'emailTemplates'}
        text={'Email Templates'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=emailTemplates`);
          },
        }}
      />
      <SublinkTab
        isActtive={router.query.tab === 'settings'}
        text={'Settings'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=settings`);
          },
        }}
      /> */}
    </>
  );
}

export default SubNav;
