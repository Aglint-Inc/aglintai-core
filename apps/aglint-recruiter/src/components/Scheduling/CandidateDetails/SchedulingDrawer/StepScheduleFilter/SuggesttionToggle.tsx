import { Stack } from '@mui/material';

import { ToggleWithText } from '@/devlink3/ToggleWithText';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';

import { setFilters, useSchedulingFlowStore } from '../store';

function SuggesttionToggle() {
  const { filters } = useSchedulingFlowStore((state) => ({
    filters: state.filters,
  }));

  return (
    <>
      <Stack
        direction={'row'}
        spacing={1}
        alignItems={'center'}
        sx={{
          cursor: 'pointer',
        }}
      >
        <ToggleWithText
          slotToggle={
            <AntSwitch
              size='small'
              checked={filters.isNoConflicts}
              onChange={() => {
                setFilters({
                  isNoConflicts: !filters.isNoConflicts,
                });
              }}
            />
          }
          textToggleLight={'Show only no conflicts'}
        />
      </Stack>
      <Stack
        direction={'row'}
        spacing={1}
        alignItems={'center'}
        sx={{
          cursor: 'pointer',
        }}
      >
        <ToggleWithText
          slotToggle={
            <AntSwitch
              size='small'
              checked={filters.isSoftConflicts}
              onChange={() => {
                setFilters({
                  isSoftConflicts: !filters.isSoftConflicts,
                });
              }}
            />
          }
          textToggleLight={'Show soft conflict suggestions'}
        />
      </Stack>
      <Stack
        direction={'row'}
        spacing={1}
        alignItems={'center'}
        sx={{
          cursor: 'pointer',
        }}
      >
        <ToggleWithText
          slotToggle={
            <AntSwitch
              size='small'
              checked={filters.isHardConflicts}
              onChange={() => {
                setFilters({
                  isHardConflicts: !filters.isHardConflicts,
                });
              }}
            />
          }
          textToggleLight={'Show hard conflict suggestions'}
        />
      </Stack>
      <Stack
        direction={'row'}
        spacing={1}
        alignItems={'center'}
        sx={{
          cursor: 'pointer',
        }}
      >
        <ToggleWithText
          slotToggle={
            <AntSwitch
              size='small'
              checked={filters.isOutSideWorkHours}
              onChange={() => {
                setFilters({
                  isOutSideWorkHours: !filters.isOutSideWorkHours,
                });
              }}
            />
          }
          textToggleLight={'Show outside work hours suggestions'}
        />
      </Stack>
    </>
  );
}

export default SuggesttionToggle;
