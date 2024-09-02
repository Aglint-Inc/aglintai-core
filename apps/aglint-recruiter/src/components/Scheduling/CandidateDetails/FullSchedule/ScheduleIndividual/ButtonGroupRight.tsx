import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';

import { type SchedulingApplication, setIsEditOpen } from '../../store';
import {
  setDebriefMembers,
  setEditSession,
  setSelectedInterviewers,
  setTrainingInterviewers,
  setTrainingToggle,
} from '../EditDrawer/store';
import { type ScheduleIndividualCardType } from './types';

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
          interview_meeting?.status === 'waiting' ||
          interview_meeting?.status === 'cancelled') && (
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
                if (
                  currentSession.interview_session.session_type !== 'debrief'
                ) {
                  setSelectedInterviewers(
                    currentSession?.users
                      ?.filter(
                        (user) =>
                          user.interview_session_relation.interviewer_type ===
                          'qualified',
                      )
                      .map((user) => ({
                        name: getFullName(
                          user.user_details.first_name,
                          user.user_details.last_name,
                        ),
                        value: user.interview_module_relation?.id,
                        start_icon_url: user.user_details.profile_image,
                      })) || [],
                  );

                  const trainingInterviewers = currentSession?.users?.filter(
                    (user) =>
                      user.interview_session_relation.interviewer_type ===
                      'training',
                  );

                  setTrainingInterviewers(
                    trainingInterviewers?.map((user) => ({
                      name: getFullName(
                        user.user_details.first_name,
                        user.user_details.last_name,
                      ),
                      value: user.interview_module_relation.id,
                      start_icon_url: user.user_details.profile_image,
                    })),
                  );

                  if (trainingInterviewers?.length > 0) {
                    setTrainingToggle(true);
                  }
                } else {
                  setDebriefMembers(
                    currentSession?.users?.map((user) => ({
                      name: getFullName(
                        user.user_details.first_name,
                        user.user_details.last_name,
                      ),
                      value: user.user_details.user_id,
                      start_icon_url: user.user_details.profile_image,
                    })),
                  );
                }
                setIsEditOpen(true);
              },
            }}
          />
        )}
    </Stack>
  );
}

export default ButtonGroupRight;
