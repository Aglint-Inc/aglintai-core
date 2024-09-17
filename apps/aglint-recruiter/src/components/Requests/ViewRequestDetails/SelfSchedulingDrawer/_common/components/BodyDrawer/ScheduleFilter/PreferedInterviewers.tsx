import MembersAutoComplete from '@/components/Scheduling/Common/MembersTextField';

import {
  setLocalFilters,
  useSelfSchedulingFlowStore,
} from '../../../store/store';

function PreferedInterviewers() {
  const { schedulingOptions, localFilters } = useSelfSchedulingFlowStore(
    (state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      localFilters: state.localFilters,
    }),
  );

  const uniqueInterviewers = [];

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
            uniqueInterviewers.push(interv);
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
