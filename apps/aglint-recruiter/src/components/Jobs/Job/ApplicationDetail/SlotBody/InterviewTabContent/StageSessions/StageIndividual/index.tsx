import { Collapse, Stack } from '@mui/material';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ApplicantDetailStage } from '@/devlink2/ApplicantDetailStage';
import { useApplication } from '@/src/context/ApplicationContext';
import { StageWithSessions } from '@/src/queries/application';

import {
  setIsScheduleOpen,
  setSelectedSessionIds,
  setSelectedStageId,
  useApplicationDetailStore,
} from '../../../../store';
import ScheduleIndividualCard from './ScheduleIndividual';

function StageIndividual({
  stage,
  index,
}: {
  stage: StageWithSessions[0];
  index: number;
}) {
  const { selectedStageId, selectedSessionIds } = useApplicationDetailStore(
    (state) => ({
      selectedStageId: state.selectedStageId,
      selectedSessionIds: state.selectedSessionIds,
    }),
  );

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
        textName={`Stage ${index + 1} ${stage.interview_plan.name}`}
        textInterviewCount={`${sessions.length} interviews`}
        slotInterviewStageDetail={
          <Collapse in={isStageSelected}>
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
          </Collapse>
        }
        onClickDrop={{
          onClick: () => {
            setSelectedSessionIds([]);
            if (isStageSelected) {
              setSelectedStageId(null);
              return;
            } else {
              setSelectedStageId(stage.interview_plan.id);
            }
          },
        }}
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
