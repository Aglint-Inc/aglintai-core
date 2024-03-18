import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { AllInterviewEmpty } from '@/devlink2';
import Loader from '@/src/components/Common/Loader';
import { pageRoutes } from '@/src/utils/pageRouting';

import ListCardInterviewSchedule from '../ListCard';
import { setFetchingSchedule } from '../SchedulingApplication/store';
import { ApplicationList } from '../store';

function AllList({
  isPending,
  isError,
  applicationList,
  isFetching,
}: {
  isPending: boolean;
  isError: boolean;
  applicationList: ApplicationList[];
  isFetching: boolean;
}) {
  const router = useRouter();
  const onClickCard = (app: ApplicationList) => {
    setFetchingSchedule(true);
    router.push(
      `${pageRoutes.SCHEDULING}/application/${app.applications.id}`,
      undefined,
      {
        shallow: true,
      },
    );
  };

  return (
    <Stack
      style={{
        opacity: isFetching ? 0.5 : 1,
        pointerEvents: isFetching ? 'none' : 'auto',
      }}
    >
      {isFetching && applicationList.length === 0 && (
        <Stack width={'100%'} height={'500px'}>
          <Loader />
        </Stack>
      )}
      {isPending ? (
        <Stack width={'100%'} height={'100%'}>
          <Loader />
        </Stack>
      ) : isError ? (
        <Stack
          width={'100%'}
          height={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          Unable to fetch schedules
        </Stack>
      ) : (
        <>
          {!isPending && !isFetching && applicationList.length === 0 && (
            <AllInterviewEmpty />
          )}
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
