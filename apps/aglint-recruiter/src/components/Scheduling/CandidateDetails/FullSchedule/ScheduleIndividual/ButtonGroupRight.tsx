import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';

import {
  SchedulingApplication,
  setEditSession,
  setIsEditOpen,
} from '../../store';
import { ScheduleIndividualCardType } from './types';

function ButtonGroupRight({
  interview_meeting,
  currentSession,
  isEditIconVisible,
  isViewDetailVisible,
}: {
  interview_meeting: ScheduleIndividualCardType['interview_meeting'];
  currentSession: SchedulingApplication['initialSessions'][0];
  isEditIconVisible: boolean;
  isViewDetailVisible: boolean;
}) {
  const router = useRouter();
  return (
    <Stack direction={'row'} spacing={'var(--space-2)'}>
      {isViewDetailVisible &&
        (interview_meeting?.status === 'completed' ||
          interview_meeting?.status === 'confirmed' ||
          interview_meeting?.status === 'waiting') && (
          <>
            <ButtonSolid
              size={1}
              color={'neutral'}
              textButton={'View Detail'}
              onClickButton={{
                onClick: (e) => {
                  e.stopPropagation();
                  router.push(
                    `/scheduling/view?meeting_id=${interview_meeting.id}&tab=candidate_details`,
                  );
                },
              }}
              iconName={'north_east'}
              isRightIcon={true}
            />
          </>
        )}

      {isEditIconVisible &&
        (interview_meeting?.status === 'not_scheduled' ||
          interview_meeting?.status === 'cancelled' ||
          !interview_meeting) && (
          <IconButtonSoft
            iconName={'edit'}
            size={1}
            iconSize={3}
            iconWeight={'medium'}
            color={'neutral'}
            onClickButton={{
              onClick: () => {
                setEditSession(currentSession);
                setIsEditOpen(true);
              },
            }}
          />
        )}
    </Stack>
  );
}

export default ButtonGroupRight;
