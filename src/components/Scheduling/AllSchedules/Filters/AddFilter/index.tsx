import { Popover } from '@mui/material';
import React from 'react';

import { AddFilter, AllInterviewFilter } from '@/devlink2';

import { setFilterVisible, useInterviewStore } from '../../store';
import { getNextOrderNumber } from '../../utils';

function AddFilterComp() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const filterVisible = useInterviewStore((state) => state.filterVisible);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'add-filter' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {!(
        filterVisible.relatedJobs &&
        filterVisible.dateRange &&
        filterVisible.interviewPanels
      ) && (
        <>
          <AddFilter
            onClickAddFilter={{
              onClick: (e) => {
                handleClick(e);
              },
            }}
          />

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
              isStatusVisible={!filterVisible.status}
              isScheduleTypeVisible={!filterVisible.scheduleType}
              isDurationVisible={false}
              isDataRangeVisible={!filterVisible.dateRange}
              isInterviewPanelVisible={!filterVisible.interviewPanels}
              isRelatedJobVisible={!filterVisible.relatedJobs}
              onClickRelatedJob={{
                onClick: () => {
                  const num = getNextOrderNumber(filterVisible);
                  setFilterVisible({ relatedJobs: num });
                  handleClose();
                },
              }}
              onClickStatus={{
                onClick: () => {
                  const num = getNextOrderNumber(filterVisible);
                  setFilterVisible({ status: num });
                  handleClose();
                },
              }}
              onClickScheduleType={{
                onClick: () => {
                  const num = getNextOrderNumber(filterVisible);
                  setFilterVisible({ scheduleType: num });
                  handleClose();
                },
              }}
              onClickInterviewPanel={{
                onClick: () => {
                  const num = getNextOrderNumber(filterVisible);
                  setFilterVisible({ interviewPanels: num });
                  handleClose();
                },
              }}
              onClickDateRange={{
                onClick: () => {
                  const num = getNextOrderNumber(filterVisible);
                  setFilterVisible({ dateRange: num });
                  handleClose();
                },
              }}
            />
          </Popover>
        </>
      )}
    </>
  );
}

export default AddFilterComp;
