import { type PlanCombinationRespType } from '@aglint/shared-types';

import IconSessionType from '@/components/Common/Icons/IconSessionType';
import InterviewerTrainingTypeIcon from '@/components/Common/Icons/InterviewerTrainingTypeIcon';
import MuiAvatar from '@/components/Common/MuiAvatar';
import { getBreakLabel } from '@/utils/getBreakLabel';
import { getFullName } from '@/utils/jsonResume';

import { MemberRow } from '../../../../MemberRow';
import { SessionDetails } from '../../../../SessionDetails';
import ConflictWithHover from './ConflictWithHover';

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

          const userSoftConflicts = allUserConflicts.filter(
            (item) => item.conflict_type === 'soft',
          );

          const userHardConflicts = allUserConflicts.filter(
            (item) =>
              item.conflict_type !== 'soft' &&
              item.conflict_type !== 'out_of_working_hours',
          );

          const userOutsideWorkHours = allUserConflicts.filter(
            (item) => item.conflict_type === 'out_of_working_hours',
          );

          return (
            <MemberRow
              key={member.user_id}
              textRole={member.position}
              slotInterviewerImage={
                <MuiAvatar
                  level={getFullName(member.first_name, member.last_name)}
                  src={member.profile_image}
                  variant={'rounded'}
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
                  {allUserConflicts.length === 0 && (
                    <ConflictWithHover
                      isNoConflict={true}
                      isHardConflict={false}
                      isOutsideWorkHours={false}
                      isSoftConflict={false}
                      conflictReasons={[]}
                      textCount={'No conflicts'}
                      isToolTipVisible={true}
                    />
                  )}
                  {userSoftConflicts.length > 0 && (
                    <ConflictWithHover
                      isHardConflict={false}
                      isOutsideWorkHours={false}
                      isSoftConflict={true}
                      isNoConflict={false}
                      conflictReasons={userSoftConflicts}
                      textCount={userSoftConflicts.length}
                      isToolTipVisible={true}
                    />
                  )}
                  {userHardConflicts.length > 0 && (
                    <ConflictWithHover
                      isNoConflict={false}
                      isHardConflict={true}
                      isOutsideWorkHours={false}
                      isSoftConflict={false}
                      conflictReasons={userHardConflicts}
                      textCount={userHardConflicts.length}
                      isToolTipVisible={true}
                    />
                  )}
                  {userOutsideWorkHours.length > 0 && (
                    <ConflictWithHover
                      isNoConflict={false}
                      isHardConflict={false}
                      isOutsideWorkHours={true}
                      isSoftConflict={false}
                      conflictReasons={userOutsideWorkHours}
                      textCount={userOutsideWorkHours.length}
                      isToolTipVisible={true}
                    />
                  )}
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