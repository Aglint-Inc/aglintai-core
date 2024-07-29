import { Stack } from '@mui/material';

import { GlobalBanner } from '@/devlink2/GlobalBanner';

import { useSchedulingFlowStore } from '../../store';

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
  const { filters } = useSchedulingFlowStore((state) => ({
    filters: state.filters,
  }));

  return (
    <Stack padding={'var(--space-4)'}>
      <GlobalBanner
        color={'error'}
        textTitle={'No available times found with the current settings.'}
        textDescription={`To proceed, please try one of the following : 
                      ${!filters.isNoConflicts && totalNumberHardConflicts ? `Enable "Show no conflict suggestions".` : ''}
                      ${!filters.isSoftConflicts && totalNumberNoConflicts ? `Enable "Show soft conflict suggestions".` : ''}
                      ${!filters.isHardConflicts && totalNumberOutsideWorkHours ? `Enable "Show hard conflict suggestions".` : ''}
                      ${!filters.isOutSideWorkHours && totalNumberSoftConflicts ? `Enable "Show outside work hours suggestions".` : ''}
                      Change the interviewer by editing the interview plan.
                      Extend the date range for the interviewer.`}
        isDescriptionVisible={true}
        slotButtons={<></>}
      />
    </Stack>
  );
}

export default NoSlotError;
