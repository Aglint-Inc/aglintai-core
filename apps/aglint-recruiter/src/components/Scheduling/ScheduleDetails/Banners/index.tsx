import { type DatabaseTable } from '@aglint/shared-types';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { Stack } from '@mui/material';
import React from 'react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';

import { useScheduleDetails } from '../hooks';
import { onClickAccept } from '../utils';

interface CancelReasonCardsProps {
  refetch: () => void;
  sessionRelation: DatabaseTable['interview_session_relation'];
  setIsDeclineOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Banners({
  refetch,
  sessionRelation,
  setIsDeclineOpen,
}: CancelReasonCardsProps) {
  const { data } = useScheduleDetails();
  const schedule = data?.schedule_data;

  const isAcceptVisible =
    sessionRelation?.accepted_status === 'waiting' &&
    schedule.interview_meeting.status === 'confirmed' &&
    sessionRelation?.training_type === 'qualified';

  const isDeclineVisible =
    sessionRelation?.accepted_status !== 'declined' &&
    sessionRelation?.accepted_status !== 'request_reschedule' &&
    schedule.interview_meeting.status === 'confirmed' &&
    sessionRelation?.training_type === 'qualified';

  const isConfirmed = schedule.interview_meeting.status === 'confirmed';

  return (
    <Stack spacing={'var(--space-4)'}>
      {isConfirmed && (isDeclineVisible || isAcceptVisible) && (
        <UIAlert
          color={'info'}
          title={'You are invited for this interview'}
          iconName={'Archive'}
          actions={
            <>
              {isDeclineVisible && (
                <UIButton
                  variant='secondary'
                  size={'sm'}
                  color={'neutral'}
                  onClick={() => {
                    setIsDeclineOpen(true);
                  }}
                >
                  Decline
                </UIButton>
              )}

              {isAcceptVisible && (
                <ButtonSolid
                  size={'1'}
                  textButton={'Accept'}
                  onClickButton={{
                    onClick: async () => {
                      await onClickAccept(sessionRelation.id);
                      refetch();
                    },
                  }}
                />
              )}
            </>
          }
        />
      )}
    </Stack>
  );
}

export default Banners;
