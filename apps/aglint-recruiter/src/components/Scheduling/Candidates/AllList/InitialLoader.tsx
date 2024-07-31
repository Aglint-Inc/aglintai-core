import { Box, Stack } from '@mui/material';
import React from 'react';

import { ScheduleProgress } from '@/devlink/ScheduleProgress';
import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { Skeleton } from '@/devlink2/Skeleton';
import { SkeletonAllInterviewCard } from '@/devlink2/SkeletonAllInterviewCard';

function InitialLoader({
  isLoading,
  isError,
  rowLength,
}: {
  isLoading: boolean;
  isError: boolean;
  rowLength: number;
}) {
  return (
    <>
      {isLoading ? (
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
          {!isLoading && rowLength === 0 && (
            <Box
              sx={{
                margin: 'var(--space-4)',
                borderRadius: 'var(--radius-2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 166px)',
                backgroundColor: 'var(--neutral-2)',
              }}
            >
              <Box maxWidth='sm' width='300px'>
                <AllInterviewEmpty textDynamic='No candidate found.' />
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
}

export default InitialLoader;
