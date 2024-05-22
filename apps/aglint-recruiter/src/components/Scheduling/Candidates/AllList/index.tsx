import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import Loader from '@/src/components/Common/Loader';
import { pageRoutes } from '@/src/utils/pageRouting';

import ListCardInterviewSchedule from '../ListCard';
import { ApplicationList } from '../store';

function AllList({
  isPending,
  isError,
  applicationList,
  isFetching,
  isLoading,
}: {
  isPending: boolean;
  isError: boolean;
  applicationList: ApplicationList[];
  isFetching: boolean;
  isLoading;
}) {
  const router = useRouter();
  const onClickCard = (app: ApplicationList) => {
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
        opacity: isLoading ? 0.5 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
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
            <AllInterviewEmpty textDynamic='No candidate found' />
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
