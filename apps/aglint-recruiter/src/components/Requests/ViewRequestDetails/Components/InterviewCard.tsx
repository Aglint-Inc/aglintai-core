import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { InterviewerListRd } from '@/devlink2/InterviewerListRd';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import IconSessionType from '@/src/components/Scheduling/CandidateDetails/RightPanel/IconSessionType';
import IconScheduleType from '@/src/components/Scheduling/Candidates/ListCard/Icon/IconScheduleType';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { getMeetingsList } from '../hooks';

function InterviewCard({
  session_id,
  meetingList,
}: {
  session_id: string;
  meetingList: Awaited<ReturnType<typeof getMeetingsList>>;
}) {
  const session_meetings = meetingList?.meeting_details.find(
    (meeting) => meeting.session_id === session_id,
  );
  // const session_interviewers = meetingList?.meeting_interviewers.filter(
  //   (interviewer) => interviewer.session_id === session_id,
  // );

  return (
    <div>
      <InterviewerListRd
        slotStatus={
          <StatusBadge
            isCancelledVisible={session_meetings?.status === 'cancelled'}
            isConfirmedVisible={session_meetings?.status === 'confirmed'}
            isWaitingVisible={session_meetings?.status === 'waiting'}
            isCompletedVisible={session_meetings?.status === 'completed'}
            isNotScheduledVisible={
              session_meetings?.status === 'not_scheduled' || false
            }
          />
        }
        slotTextWithIcon={
          <>
            <TextWithIcon
              iconName={
                <IconSessionType type={session_meetings?.session_type} />
              }
              textContent={session_meetings?.session_name}
            />
            <TextWithIcon
              iconName={'hourglass_empty'}
              textContent={getBreakLabel(session_meetings?.session_duration)}
            />

            <TextWithIcon
              iconName={
                <IconScheduleType type={session_meetings?.schedule_type} />
              }
              textContent={capitalizeFirstLetter(
                session_meetings?.schedule_type,
              )}
            />
          </>
        }
        slotIconButtonSoft={
          <IconButtonSoft
            iconName='call_made'
            color={'neutral'}
            size={1}
            onClickButton={{
              onClick: () => {
                window.open(
                  `/scheduling/application/${session_meetings.application_id}`,
                );
              },
            }}
          />
        }
      />
    </div>
  );
}

export default InterviewCard;
