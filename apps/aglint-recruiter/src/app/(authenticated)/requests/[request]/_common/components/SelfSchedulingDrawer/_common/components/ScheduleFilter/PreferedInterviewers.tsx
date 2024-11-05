import { useMeetingList } from '@requests/hooks';
import MembersAutoComplete, {
  type MemberTypeAutoComplete,
} from 'src/app/_common/components/MembersTextField';

import { setLocalFilters, useSelfSchedulingFlowStore } from '../../store/store';

function PreferedInterviewers() {
  const localFilters = useSelfSchedulingFlowStore(
    (state) => state.localFilters,
  );

  const { data: allSessions } = useMeetingList();

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-base font-medium'>Preferred Interviewers</span>
      <div className='flex w-full flex-col gap-1'>
        {allSessions?.map((session, ind) => {
          const uniqueInterviewers: MemberTypeAutoComplete[] = [];

          session.users
            .filter(
              (user) =>
                user.interview_session_relation.interviewer_type ===
                'qualified',
            )
            .forEach((option) => {
              const existingIndex = uniqueInterviewers.findIndex(
                (existingInterv) =>
                  existingInterv.user_id === option.user_details.user_id,
              );

              if (existingIndex === -1) {
                uniqueInterviewers.push({
                  email: option.user_details.email,
                  first_name: option.user_details.first_name,
                  last_name: option.user_details.last_name ?? '',
                  user_id: option.user_details.user_id,
                  position: option.user_details.position ?? '',
                  profile_image: option.user_details.profile_image ?? '',
                });
              }
            });

          const selectedUserIds =
            localFilters.preferredInterviewers.find(
              (ele) => ele.session_id === session.interview_session.id,
            )?.user_ids || [];

          const selectedUsers = uniqueInterviewers.filter((user) =>
            selectedUserIds.includes(user.user_id),
          );

          return (
            <>
              <span className='text-base font-normal'>
                {`Session ${ind + 1} - ${session.interview_session.name}`}
              </span>
              <MembersAutoComplete
                pillColor={'bg-neutral-200'}
                renderUsers={uniqueInterviewers}
                selectedUsers={selectedUsers}
                maxWidth='100%'
                setSelectedUsers={(users) => {
                  if (users.length < session.interview_session.interviewer_cnt)
                    return;
                  localFilters.preferredInterviewers = [
                    ...localFilters.preferredInterviewers.filter(
                      (ele) => ele.session_id !== session.interview_session.id,
                    ),
                    {
                      session_id: session.interview_session.id,
                      user_ids: users.map((user) => user.user_id),
                    },
                  ];
                  setLocalFilters(localFilters);
                }}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default PreferedInterviewers;
