import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ScheduleProgress } from '@/devlink/ScheduleProgress';
import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { Skeleton } from '@/devlink2/Skeleton';
import { SkeletonAllInterviewCard } from '@/devlink2/SkeletonAllInterviewCard';
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
          {Array.from({
            length: 15,
          }).map((_, index) => (
            <SkeletonAllInterviewCard
              key={index}
              slotInterviewProgress={
                <Stack borderRadius={'var(--radius-2)'} overflow={'hidden'}>
                  <ScheduleProgress
                    slotScheduleProgressPill={Array.from({
                      length: index === 0 || !!(index && !(index % 2)) ? 5 : 2,
                    }).map((_, index) => (
                      <Stack
                        key={index}
                        width={'60px'}
                        height={'20px'}
                        position={'relative'}
                      >
                        <Skeleton />
                      </Stack>
                    ))}
                  />
                </Stack>
              }
            />
          ))}
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
