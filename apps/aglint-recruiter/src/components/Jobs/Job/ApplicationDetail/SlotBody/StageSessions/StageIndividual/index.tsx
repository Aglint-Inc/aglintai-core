import { Collapse, Stack } from '@mui/material';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { ApplicantDetailStage } from '@/devlink2/ApplicantDetailStage';
import { StageWithSessions } from '@/src/queries/application';

import {
  setSelectedSessionIds,
  setSelectedStageId,
  useApplicationDetailStore,
} from '../../../store';
import ScheduleIndividualCard from './ScheduleIndividual';

function StageIndividual({
  stage,
  index,
  application_id,
  job_id,
}: {
  stage: StageWithSessions[0];
  index: number;
  application_id: string;
  job_id: string;
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
  return (
    <>
      <ApplicantDetailStage
        textName={`Stage ${index + 1} ${stage.interview_plan.name}`}
        textInterviewCount={`${sessions.length} interviews`}
        slotInterviewStageDetail={
          <Collapse in={isStageSelected}>
            <Stack spacing={'var(--space-2)'}>
              {sessions.map((session) => {
                return (
                  <ScheduleIndividualCard
                    session={session}
                    key={session.interview_session.id}
                    application_id={application_id}
                    job_id={job_id}
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
        slotScheduleButton={<ButtonSolid textButton={'Schedule'} size={2} />}
      />
    </>
  );
}

export default StageIndividual;
