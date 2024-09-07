import { ButtonSolid } from '@devlink/ButtonSolid';
import { IconButtonSoft } from '@devlink/IconButtonSoft';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { type StageWithSessions } from '@/queries/application';

import {
  setDebriefMembers,
  setEditSession,
  setIsEditOpen,
  setSelectedInterviewers,
  setTrainingInterviewers,
  setTrainingToggle,
} from '../../EditDrawer/store';

function ButtonGroupRight({
  currentSession,
  isEditIconVisible,
  isViewDetailVisible,
}: {
  currentSession: StageWithSessions[0]['sessions'][0];
  isEditIconVisible: boolean;
  isViewDetailVisible: boolean;
}) {
  const router = useRouter();

  const interview_meeting = currentSession.interview_meeting;

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
                        value: user.interview_module_relation?.id,
                        email: user.user_details.email,
                        user_id: user.interview_module_relation?.user_id,
                        first_name: user.user_details.first_name,
                        last_name: user.user_details.last_name,
                        position: user.user_details.position,
                        profile_image: user.user_details.profile_image,
                        module_relation_id: user.interview_module_relation?.id,
                      })) || [],
                  );

                  const trainingInterviewers = currentSession?.users?.filter(
                    (user) =>
                      user.interview_session_relation.interviewer_type ===
                      'training',
                  );

                  setTrainingInterviewers(
                    trainingInterviewers?.map((user) => ({
                      value: user.interview_module_relation?.id,
                      email: user.user_details.email,
                      user_id: user.interview_module_relation?.user_id,
                      first_name: user.user_details.first_name,
                      last_name: user.user_details.last_name,
                      position: user.user_details.position,
                      profile_image: user.user_details.profile_image,
                      module_relation_id: user.interview_module_relation?.id,
                    })),
                  );

                  if (trainingInterviewers?.length > 0) {
                    setTrainingToggle(true);
                  }
                } else {
                  setDebriefMembers(
                    currentSession?.users?.map((user) => ({
                      value: user.interview_module_relation?.id,
                      email: user.user_details.email,
                      user_id: user.interview_module_relation?.user_id,
                      first_name: user.user_details.first_name,
                      last_name: user.user_details.last_name,
                      position: user.user_details.position,
                      profile_image: user.user_details.profile_image,
                      module_relation_id: user.interview_module_relation?.id,
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
