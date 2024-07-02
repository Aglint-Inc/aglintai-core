import { PlanCombinationRespType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { MemberRow } from '@/devlink3/MemberRow';
import { NoConflicts } from '@/devlink3/NoConflicts';
import { SessionDetails } from '@/devlink3/SessionDetails';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { getFullName } from '@/src/utils/jsonResume';

import { formatTimeWithTimeZone } from '../../../../../utils';
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
        key={session.session_id}
        textSessionName={session_name}
        textSessionDuration={session_duration}
        textSessionTime={`${dayjsLocal(session.start_time).format('hh:mm A')} - ${dayjsLocal(session.end_time).format('hh:mm A')}`}
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
                  variant={'circular-medium'}
                />
              }
              isShadow={member.training_type === 'shadow'}
              isReverseShadow={member.training_type === 'reverse_shadow'}
              textName={getFullName(member.first_name, member.last_name)}
              textTime={formatTimeWithTimeZone({
                start_time: session.start_time,
                end_time: session.end_time,
                timeZone: member.int_tz,
              })}
              slotConflicts={
                <>
                  {allUserConflicts.length === 0 && <NoConflicts />}
                  {userSoftConflicts.length > 0 && (
                    <ConflictWithHover
                      isHardConflict={false}
                      isOutsideWorkHours={false}
                      isSoftConflict={true}
                      conflictReasons={userSoftConflicts}
                      textCount={userSoftConflicts.length}
                    />
                  )}
                  {userHardConflicts.length > 0 && (
                    <ConflictWithHover
                      isHardConflict={true}
                      isOutsideWorkHours={false}
                      isSoftConflict={false}
                      conflictReasons={userHardConflicts}
                      textCount={userHardConflicts.length}
                    />
                  )}
                  {userOutsideWorkHours.length > 0 && (
                    <ConflictWithHover
                      isHardConflict={false}
                      isOutsideWorkHours={true}
                      isSoftConflict={false}
                      conflictReasons={userOutsideWorkHours}
                      textCount={userOutsideWorkHours.length}
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
