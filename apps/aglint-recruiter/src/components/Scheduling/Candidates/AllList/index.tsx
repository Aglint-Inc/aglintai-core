import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import Loader from '@/src/components/Common/Loader';
import ROUTES from '@/src/utils/routing/routes';

import ListCardInterviewSchedule from '../ListCard';
import { ApplicationList } from '../utils';

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
  isLoading: boolean;
}) {
  const router = useRouter();
  const onClickCard = (app: ApplicationList) => {
    router.push(
      ROUTES['/scheduling/application/[application_id]']({
        application_id: app.applications.id,
      }),
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
        height: 'calc(100vh - 182px)',
        overflowY: 'auto',
      }}
    >
      {isLoading ||
      isPending ||
      (isFetching && applicationList.length === 0) ? (
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
            <Box
              sx={{
                margin: 'var(--space-4)',
                borderRadius: 'var(--radius-2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 166px)',
                backgroundColor: 'var(--neutral-2)', // replace with your desired background color
              }}
            >
              <Box maxWidth='sm' width='300px'>
                <AllInterviewEmpty textDynamic='No candidate found.' />
              </Box>
            </Box>
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
