import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { AllInterviewEmpty } from '@/devlink2';
import { pageRoutes } from '@/src/utils/pageRouting';

import ListCardInterviewSchedule from '../ListCard';
import { ApplicationList, useInterviewSchedulingStore } from '../store';

function AllList() {
  const router = useRouter();
  const applicationList = useInterviewSchedulingStore(
    (state) => state.applicationList
  );
  const fetching = useInterviewSchedulingStore((state) => state.fetching);
  const initialLoading = useInterviewSchedulingStore(
    (state) => state.initialLoading
  );

  const onClickCard = (app: ApplicationList) => {
    router.push(
      `${pageRoutes.SCHEDULING}/application/${app.applications.id}`,
      undefined,
      {
        shallow: true
      }
    );
  };

  return (
    <Stack
      style={{
        opacity: fetching ? 0.5 : 1,
        pointerEvents: fetching ? 'none' : 'auto'
      }}
    >
      {!initialLoading && (
        <>
          {applicationList.length === 0 && <AllInterviewEmpty />}
          {applicationList.map((app) => {
            return (
              <ListCardInterviewSchedule
                key={app.applications.id}
                app={app}
                onClickCard={onClickCard}
              />
            );
          })}
        </>
      )}
    </Stack>
  );
}

export default AllList;
