import { useRouter } from 'next/router';
import React from 'react';

import { SublinkTab } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

function SubNav() {
  const router = useRouter();
  return (
    <>
      <SublinkTab
        text={'All Schedules'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=allSchedules`);
          },
        }}
      />
      <SublinkTab
        text={'My Schedules'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=mySchedules`);
          },
        }}
      />
      <SublinkTab
        text={'Interview Panel'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=panels`);
          },
        }}
      />
      <SublinkTab
        text={'Email Templates'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=emailTemplates`);
          },
        }}
      />
      <SublinkTab
        text={'Settings'}
        onClickTab={{
          onClick: () => {
            router.push(`${pageRoutes.SCHEDULING}?tab=settings`);
          },
        }}
      />
    </>
  );
}

export default SubNav;
