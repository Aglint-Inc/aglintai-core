import { UIAlert } from '@/components/Common/UIAlert';

import { useSelfSchedulingFlowStore } from '../../../store/store';

function NoSlotError({
  totalNumberHardConflicts,
  totalNumberNoConflicts,
  totalNumberOutsideWorkHours,
  totalNumberSoftConflicts,
}: {
  totalNumberHardConflicts: number;
  totalNumberNoConflicts: number;
  totalNumberOutsideWorkHours: number;
  totalNumberSoftConflicts: number;
}) {
  const { filters } = useSelfSchedulingFlowStore((state) => ({
    filters: state.filters,
  }));

  return (
    <div className='p-4'>
      <UIAlert
        color={'error'}
        title={'No available times found with the current settings.'}
        description={`To proceed, please try one of the following : 
                      ${!filters.isNoConflicts && totalNumberHardConflicts ? `Enable "Show no conflict suggestions".` : ''}
                      ${!filters.isSoftConflicts && totalNumberNoConflicts ? `Enable "Show soft conflict suggestions".` : ''}
                      ${!filters.isHardConflicts && totalNumberOutsideWorkHours ? `Enable "Show hard conflict suggestions".` : ''}
                      ${!filters.isOutSideWorkHours && totalNumberSoftConflicts ? `Enable "Show outside work hours suggestions".` : ''}
                      Change the interviewer by editing the interview plan.
                      Extend the date range for the interviewer.`}
      />
    </div>
  );
}

export default NoSlotError;
