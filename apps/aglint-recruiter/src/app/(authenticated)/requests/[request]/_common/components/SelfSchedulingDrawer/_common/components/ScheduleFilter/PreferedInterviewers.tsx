import MembersAutoComplete, {
  type MemberTypeAutoComplete,
} from 'src/app/_common/components/MembersTextField';

import { setLocalFilters, useSelfSchedulingFlowStore } from '../../store/store';

function PreferedInterviewers() {
  const { schedulingOptions, localFilters } = useSelfSchedulingFlowStore(
    (state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      localFilters: state.localFilters,
    }),
  );

  const uniqueInterviewers: MemberTypeAutoComplete[] = [];

  schedulingOptions
    .flatMap((option) => option.interview_rounds)
    .flatMap((option) => option.plans)
    .forEach((option) => {
      option.sessions.forEach((session) => {
        //quilifed interviewers
        session.qualifiedIntervs.forEach((interv) => {
          const existingIndex = uniqueInterviewers.findIndex(
            (existingInterv) => existingInterv.user_id === interv.user_id,
          );

          if (existingIndex === -1) {
            uniqueInterviewers.push({
              email: interv.email,
              first_name: interv.first_name,
              last_name: interv.last_name ?? '',
              user_id: interv.user_id,
              position: interv.position ?? '',
              profile_image: interv.profile_image ?? '',
            });
          }
        });
      });
    });

  return (
    <div className='w-full space-y-0.5'>
      <span className='text-base font-medium'>Preferred Interviewers</span>
      <MembersAutoComplete
        pillColor={'bg-neutral-200'}
        renderUsers={uniqueInterviewers}
        selectedUsers={localFilters.preferredInterviewers}
        maxWidth='100%'
        setSelectedUsers={(users) => {
          setLocalFilters({
            preferredInterviewers: users,
          });
        }}
      />
    </div>
  );
}

export default PreferedInterviewers;
