import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ApplicantDetailStage } from '@/devlink2/ApplicantDetailStage';
import { useApplication } from '@/src/context/ApplicationContext';
import { StageWithSessions } from '@/src/queries/application';

import {
  setIsScheduleOpen,
  setSelectedSessionIds,
  useApplicationDetailStore,
} from '../../../../store';
import ScheduleIndividualCard from './ScheduleIndividual';

function StageIndividual({ stage }: { stage: StageWithSessions[0] }) {
  const router = useRouter();
  const selectedStageId = router.query.stage as string;
  const { selectedSessionIds } = useApplicationDetailStore((state) => ({
    selectedSessionIds: state.selectedSessionIds,
  }));

  const sessions = stage.sessions;
  const isStageSelected = selectedStageId === stage.interview_plan.id;
  const isCurrentSessionSelected = sessions.some((session) =>
    selectedSessionIds.includes(session.interview_session.id),
  );

  const onClickCheckBox = ({ session_id }: { session_id: string }) => {
    if (selectedSessionIds.includes(session_id)) {
      return setSelectedSessionIds(
        selectedSessionIds.filter((id) => id !== session_id),
      );
    }
    return setSelectedSessionIds([...selectedSessionIds, session_id]);
  };

  const {
    meta: { data: detail },
    details: {
      data: { job_status, status },
    },
  } = useApplication();

  return (
    <>
      <ApplicantDetailStage
        textName={`Stage ${stage.interview_plan.plan_order} ${stage.interview_plan.name}`}
        textInterviewCount={`${sessions.length} Interview${sessions.length > 1 ? 's' : ''}`}
        slotInterviewStageDetail={
          <Stack spacing={'var(--space-2)'}>
            {sessions.map((session) => {
              const interview_meeting = session.interview_meeting;
              return (
                <ScheduleIndividualCard
                  session={session}
                  key={session.interview_session.id}
                  selectedSessionIds={selectedSessionIds}
                  onClickCheckBox={onClickCheckBox}
                  isCheckboxVisible={
                    job_status === 'published' &&
                    status === 'interview' &&
                    (!interview_meeting ||
                      interview_meeting.status === 'not_scheduled' ||
                      interview_meeting.status === 'cancelled' ||
                      interview_meeting.status === 'reschedule')
                  }
                  candidate={{
                    name: detail?.name,
                    current_job_title: detail?.current_job_title,
                    timezone: detail?.timezone,
                  }}
                  isEditIconVisible={true}
                  isViewDetailVisible={true}
                />
              );
            })}
          </Stack>
        }
        isCountVisible={!isCurrentSessionSelected}
        isScheduleButtonVisible={
          isStageSelected && selectedSessionIds.length > 0
        }
        slotScheduleButton={
          <ButtonSolid
            textButton={'Schedule'}
            size={2}
            onClickButton={{
              onClick: () => {
                setIsScheduleOpen(true);
              },
            }}
          />
        }
      />
    </>
  );
}

export default StageIndividual;
