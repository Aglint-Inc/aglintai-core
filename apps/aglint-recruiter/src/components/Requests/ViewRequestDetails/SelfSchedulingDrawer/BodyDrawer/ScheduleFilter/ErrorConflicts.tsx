import React, { useMemo } from 'react';
import NoSlotError from './NoSlotError';
import { filterSchedulingOptionsArray } from './utils';
import { useSelfSchedulingFlowStore } from '../../store';

function ErrorConflicts() {
  const { schedulingOptions, errorNoSlotFilter } = useSelfSchedulingFlowStore(
    (state) => ({
      schedulingOptions: state.schedulingOptions,
      errorNoSlotFilter: state.errorNoSlotFilter,
    }),
  );

  const {
    numberHardConflicts: totalNumberHardConflicts,
    numberNoConflicts: totalNumberNoConflicts,
    numberOutsideWorkHours: totalNumberOutsideWorkHours,
    numberSoftConflicts: totalNumberSoftConflicts,
  } = useMemo(
    () =>
      filterSchedulingOptionsArray({
        schedulingOptions,
        filters: {
          isNoConflicts: true,
          isSoftConflicts: true,
          isHardConflicts: true,
          isOutSideWorkHours: true,
          preferredInterviewers: [],
          preferredDateRanges: [],
          isWorkLoad: false,
        },
      }),
    [schedulingOptions],
  );
  return (
    <>
      {errorNoSlotFilter && (
        <NoSlotError
          totalNumberHardConflicts={totalNumberHardConflicts}
          totalNumberNoConflicts={totalNumberNoConflicts}
          totalNumberOutsideWorkHours={totalNumberOutsideWorkHours}
          totalNumberSoftConflicts={totalNumberSoftConflicts}
        />
      )}
    </>
  );
}

export default ErrorConflicts;
