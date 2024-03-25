import { Popover } from '@mui/material';
import React from 'react';

import { AddFilter, AllInterviewFilter } from '@/devlink2';

import {
  FilterType,
  setFilterVisible,
  useInterviewSchedulingStore,
} from '../../store';

const FILTERS_LENGTH = Object.keys(FilterType).length;

function AddFilterComp() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const filterVisible = useInterviewSchedulingStore(
    (state) => state.filterVisible,
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addFilter = (type: FilterType) => {
    setFilterVisible([...filterVisible, type]);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'add-filter' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <>
        {filterVisible.length !== FILTERS_LENGTH && (
          <AddFilter
            onClickAddFilter={{
              onClick: (e) => {
                handleClick(e);
              },
            }}
          />
        )}

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{ vertical: -10, horizontal: 0 }}
          sx={{
            '& .MuiPopover-paper': {
              border: 'none',
            },
          }}
        >
          <AllInterviewFilter
            isCoordinatorVisible={
              !filterVisible.includes(FilterType.coordinator)
            }
            isStatusVisible={!filterVisible.includes(FilterType.status)}
            isScheduleTypeVisible={
              !filterVisible.includes(FilterType.scheduleType)
            }
            isDurationVisible={false}
            isDataRangeVisible={!filterVisible.includes(FilterType.dateRange)}
            isInterviewPanelVisible={
              !filterVisible.includes(FilterType.interviewPanels)
            }
            isRelatedJobVisible={
              !filterVisible.includes(FilterType.relatedJobs)
            }
            onClickRelatedJob={{
              onClick: () => addFilter(FilterType.relatedJobs),
            }}
            onClickStatus={{ onClick: () => addFilter(FilterType.status) }}
            onClickScheduleType={{
              onClick: () => addFilter(FilterType.scheduleType),
            }}
            onClickInterviewPanel={{
              onClick: () => addFilter(FilterType.interviewPanels),
            }}
            onClickDateRange={{
              onClick: () => addFilter(FilterType.dateRange),
            }}
            onClickCoordinator={{
              onClick: () => addFilter(FilterType.coordinator),
            }}
          />
        </Popover>
      </>
    </>
  );
}

export default AddFilterComp;
