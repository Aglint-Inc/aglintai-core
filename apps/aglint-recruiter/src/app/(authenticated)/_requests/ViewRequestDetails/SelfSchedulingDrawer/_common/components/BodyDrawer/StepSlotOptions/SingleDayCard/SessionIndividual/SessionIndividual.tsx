import { type PlanCombinationRespType } from '@aglint/shared-types';

import IconSessionType from '@/components/Common/Icons/IconSessionType';
import InterviewerTrainingTypeIcon from '@/components/Common/Icons/InterviewerTrainingTypeIcon';
import MuiAvatar from '@/components/Common/MuiAvatar';
import { getBreakLabel } from '@/utils/getBreakLabel';
import { getFullName } from '@/utils/jsonResume';

import ConflictWithHover from '../../../../ui/ConflictWithHover';
import { MemberRow } from '../../../../ui/MemberRow';
import { SessionDetails } from '../../../../ui/SessionDetails';

function SessionIndividual({
  session,
}: {
  session: PlanCombinationRespType['sessions'][number];
}) {
  const members = [...session.qualifiedIntervs, ...session.trainingIntervs];

  const session_name = session.session_name;
  const session_duration = getBreakLabel(session.duration);
  return (
    <>
      <SessionDetails
        slotSessionIcon={
          <IconSessionType type={session.session_type} size={14} />
        }
        key={session.session_id}
        textSessionName={session_name}
        textSessionDuration={session_duration}
        isMemberRow={true}
        slotMemberRow={members.map((member) => {
          const allUserConflicts = session.ints_conflicts
            .filter((item) => item.interviewer.user_id === member.user_id)
            .map((item) => item.conflict_reasons)
            .map((item) => item)
            .flat();

          return (
            <MemberRow
              key={member.user_id}
              textRole={member.position}
              slotInterviewerImage={
                <MuiAvatar
                  level={getFullName(member.first_name, member.last_name)}
                  src={member.profile_image}
                  width={'100%'}
                  height={'100%'}
                />
              }
              iconTraining={
                <InterviewerTrainingTypeIcon type={member.training_type} />
              }
              textName={`${getFullName(member.first_name, member.last_name)} 
                 ${member.interviewer_type === 'training' ? '(Training)' : ''}`}
              slotConflicts={
                <>
                  <ConflictWithHover
                    conflictReasons={allUserConflicts}
                    isToolTipVisible={true}
                  />
                </>
              }
            />
          );
        })}
      />
    </>
  );
}

export default SessionIndividual;
