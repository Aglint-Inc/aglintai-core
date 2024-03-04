import { useRouter } from 'next/router';
import React from 'react';

import { Breadcrum, InterviewMemberList, PageLayout } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

function ModuleMembersComp() {
  const router = useRouter();
  return (
    <PageLayout
      onClickBack={{
        onClick: () => {
          router.push(`${pageRoutes.SCHEDULING}?tab=interviewModules`);
        }
      }}
      isBackButton={true}
      slotTopbarLeft={
        <>
          <Breadcrum textName={'moduleName'} />
        </>
      }
      slotBody={
        <>
          <InterviewMemberList />
        </>
      }
      slotTopbarRight={<></>}
    />
  );
}

export default ModuleMembersComp;
