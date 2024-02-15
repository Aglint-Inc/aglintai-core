import { Popover } from '@mui/material';
import React from 'react';

import { AddFilter, AllInterviewFilter } from '@/devlink2';

import { setFilterVisible, useInterviewStore } from '../../store';

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
              isStatusVisible={false}
              isScheduleTypeVisible={false}
              isDurationVisible={false}
              isDataRangeVisible={!filterVisible.dateRange}
              isInterviewPanelVisible={!filterVisible.interviewPanels}
              isRelatedJobVisible={!filterVisible.relatedJobs}
              onClickRelatedJob={{
                onClick: () => {
                  setFilterVisible({ relatedJobs: true });
                  handleClose();
                },
              }}
              onClickInterviewPanel={{
                onClick: () => {
                  setFilterVisible({ interviewPanels: true });
                  handleClose();
                },
              }}
              onClickDateRange={{
                onClick: () => {
                  setFilterVisible({ dateRange: true });
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
