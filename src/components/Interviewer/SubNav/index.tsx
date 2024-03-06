import { useRouter } from 'next/router';
import React from 'react';

import { SublinkTab } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

function SubNav() {
  const router = useRouter();
  return (
    <>
      <SublinkTab
        isActtive={router.query.tab === 'mySchedules'}
        text={'My Schedules'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.INTERVIEWER}?tab=mySchedules`);
          },
        }}
      />
      <SublinkTab
        isActtive={router.query.tab === 'settings'}
        text={'Settings'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.INTERVIEWER}?tab=settings`);
          },
        }}
      />
    </>
  );
}

export default SubNav;
