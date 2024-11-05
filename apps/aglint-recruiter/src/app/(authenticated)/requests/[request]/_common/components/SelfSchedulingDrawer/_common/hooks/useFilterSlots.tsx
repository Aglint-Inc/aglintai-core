import { dayjsLocal } from '@aglint/shared-utils';
import _ from 'lodash';

import {
  type SelfSchedulingFlow,
  setDateRange,
  setErrorNoSlotFilter,
  setFilteredSchedulingOptions,
  setFilterLoading,
  setFilters,
  useSelfSchedulingFlowStore,
} from '../store/store';
import { filterSchedulingOptionsArray } from '../utils/filterSchedulingOptionsArray';
import { useFindAvailibility } from './useFindAvailibility';

export const useFilterSlots = () => {
  const { findAvailibility } = useFindAvailibility();
  const { dateRange, schedulingOptions, localFilters, filters } =
    useSelfSchedulingFlowStore((state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      localFilters: state.localFilters,
      filters: state.filters,
    }));

  const filterSlots = async () => {
    const newFilters: SelfSchedulingFlow['filters'] = localFilters;

    setFilters(newFilters);
    setDateRange({
      start_date: localFilters.dateRange.start,
      end_date: localFilters.dateRange.end,
    });
    if (
      dayjsLocal(localFilters.dateRange.start).isSame(
        dayjsLocal(dateRange.start_date),
        'day',
      ) &&
      dayjsLocal(localFilters.dateRange.end).isSame(
        dayjsLocal(dateRange.end_date),
        'day',
      ) &&
      _.isEqual(
        localFilters.preferredInterviewers,
        filters.preferredInterviewers,
      )
    ) {
      const filterSlots = filterSchedulingOptionsArray({
        schedulingOptions,
        filters: newFilters,
      });

      if (filterSlots.numberTotal < 5) {
        setErrorNoSlotFilter(true);
        return;
      } else {
        setErrorNoSlotFilter(false);
      }
      setFilteredSchedulingOptions(filterSlots.combs);
    } else {
      setFilterLoading(true);
      await findAvailibility({
        filters: {
          ...newFilters,
          dateRange: {
            start: localFilters.dateRange.start,
            end: localFilters.dateRange.end,
          },
        },
      });
      setFilterLoading(false);
    }
  };
  return { filterSlots };
};
