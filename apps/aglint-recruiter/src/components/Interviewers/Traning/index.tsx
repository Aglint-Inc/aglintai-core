import { Avatar, Stack } from '@mui/material';
import React, { useMemo } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { HistoryPill } from '@/devlink3/HistoryPill';
import { InterviewerTraining } from '@/devlink3/InterviewerTraining';
import { InterviewerTrainingList } from '@/devlink3/InterviewerTrainingList';
import { SchedulingAnalyticsContextType } from '@/src/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';
import { useTrainingProgress } from '../Hook';

function TrainingProgress() {
  const { data, isLoading } = useTrainingProgress();

  if (isLoading)
    return (
      <Stack
        height={'100%'}
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Loader />
      </Stack>
    );

  return (
    <>
      <InterviewerTraining
        textDateRange={<></>}
        slotInterviewerTrainnigList={
          data?.length ? (
            data.map((interviewer) => (
              <InterviewerTrainingList
                key={interviewer.user_id}
                textName={interviewer.name}
                textRole={interviewer.position}
                slotTrainingProgress={<Pills {...interviewer} />}
                slotImage={
                  <Avatar
                    // src={interviewer.}
                    alt={interviewer.name}
                    variant='rounded-medium'
                  />
                }
              />
            ))
          ) : (
            <GlobalEmptyState
              iconName={'monitoring'}
              size={9}
              textDesc={'No Data Available'}
            />
          )
        }
      />
    </>
  );
}

export default TrainingProgress;

type Props = Pick<SchedulingAnalyticsContextType['training_progress'], 'data'>;

const Pills = ({
  noreverseshadow,
  noshadow,
  number_of_reverse_shadow,
  number_of_shadow,
}: Pick<
  Props['data'][number],
  | 'noreverseshadow'
  | 'noshadow'
  | 'number_of_reverse_shadow'
  | 'number_of_shadow'
>) => {
  const pillData = useMemo(
    () =>
      [
        ...[...new Array(number_of_shadow)].map(() => ({
          shadow: true,
          active: true,
        })),
        ...[...new Array(noshadow - number_of_shadow)].map(() => ({
          shadow: true,
          active: false,
        })),
        ...[...new Array(number_of_reverse_shadow)].map(() => ({
          shadow: false,
          active: true,
        })),
        ...[...new Array(noreverseshadow - number_of_reverse_shadow)].map(
          () => ({
            shadow: false,
            active: false,
          }),
        ),
      ] satisfies { shadow: boolean; active: boolean }[],
    [number_of_shadow, noshadow, number_of_reverse_shadow, number_of_shadow],
  );

  const maxLength = useMemo(() => pillData.length, [pillData]);

  return (
    <>
      {pillData.map(({ active, shadow }, index) => (
        <HistoryPill
          key={index}
          isActive={active}
          isShadow={shadow}
          isReverseShadow={!shadow}
          position={
            index === 0 ? 'start' : index === maxLength - 1 ? 'end' : ''
          }
        />
      ))}
    </>
  );
};
