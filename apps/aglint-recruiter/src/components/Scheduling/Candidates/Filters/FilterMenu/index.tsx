import { Popover } from '@mui/material';
import React from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { AllInterviewFilter } from '@/devlink2/AllInterviewFilter';

import {
  FilterType,
  setFilterVisible,
  useFilterCandidateStore,
} from '../../filter-store';

const FILTERS_LENGTH = Object.keys(FilterType).length;

function AddFilterComp() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const filterVisible = useFilterCandidateStore((state) => state.filterVisible);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addFilter = (type: FilterType) => {
    setFilterVisible([...filterVisible, type]);
    handleClose();
    setTimeout(() => {
      document.getElementById(type + 'click')?.click(); //auto open filter
    }, 200);
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
          <ButtonGhost
            textButton='Add Filter'
            size={2}
            iconName='add'
            isLeftIcon
            onClickButton={{
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
            isDataRangeVisible={false}
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
