import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';

import {
  FilterType,
  setFilter,
  setFilterVisible,
  useFilterCandidateStore,
} from '../../filter-store';

function FilterInterviewModule() {
  const { allModules } = useSchedulingContext();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const filter = useFilterCandidateStore((state) => state.filter);

  const filterVisible = useFilterCandidateStore((state) => state.filterVisible);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'interview-panels' : undefined;

  const handleFilterClick = (panel_id: string) => {
    if (filter.module_ids.includes(panel_id)) {
      setFilter({
        module_ids: filter.module_ids.filter((s) => s !== panel_id),
      });
    } else {
      setFilter({ module_ids: [...filter.module_ids, panel_id] });
    }
  };

  return (
    <>
      <ButtonFilter
        slotLeftIcon={
          <Stack>
            <GlobalIcon iconName='group' />
            {/* <svg
              width='15'
              height='16'
              viewBox='0 0 15 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.25 3.875C2.26562 4.29688 2.45312 4.625 2.8125 4.85938C3.1875 5.04688 3.5625 5.04688 3.9375 4.85938C4.29688 4.625 4.48438 4.29688 4.5 3.875C4.48438 3.45312 4.29688 3.125 3.9375 2.89062C3.5625 2.70312 3.1875 2.70312 2.8125 2.89062C2.45312 3.125 2.26562 3.45312 2.25 3.875ZM5.25 3.875C5.23438 4.57812 4.92188 5.11719 4.3125 5.49219C3.6875 5.83594 3.0625 5.83594 2.4375 5.49219C1.82812 5.11719 1.51562 4.57812 1.5 3.875C1.51562 3.17188 1.82812 2.63281 2.4375 2.25781C3.0625 1.91406 3.6875 1.91406 4.3125 2.25781C4.92188 2.63281 5.23438 3.17188 5.25 3.875ZM7.5 5.75C6.9375 5.76562 6.50781 6.01562 6.21094 6.5C5.92969 7 5.92969 7.5 6.21094 8C6.50781 8.48438 6.9375 8.73438 7.5 8.75C8.0625 8.73438 8.49219 8.48438 8.78906 8C9.07031 7.5 9.07031 7 8.78906 6.5C8.49219 6.01562 8.0625 5.76562 7.5 5.75ZM7.5 9.5C7.09375 9.5 6.71875 9.39844 6.375 9.19531C6.03125 8.99219 5.75781 8.71875 5.55469 8.375C5.35156 8.01562 5.25 7.64062 5.25 7.25C5.25 6.85938 5.35156 6.48438 5.55469 6.125C5.75781 5.78125 6.03125 5.50781 6.375 5.30469C6.71875 5.10156 7.09375 5 7.5 5C7.90625 5 8.28125 5.10156 8.625 5.30469C8.96875 5.50781 9.24219 5.78125 9.44531 6.125C9.64844 6.48438 9.75 6.85938 9.75 7.25C9.75 7.64062 9.64844 8.01562 9.44531 8.375C9.24219 8.71875 8.96875 8.99219 8.625 9.19531C8.28125 9.39844 7.90625 9.5 7.5 9.5ZM6.11719 11C5.47656 11.0156 4.92969 11.2344 4.47656 11.6562C4.03906 12.0781 3.79688 12.6094 3.75 13.25H11.25C11.2031 12.6094 10.9609 12.0781 10.5234 11.6562C10.0703 11.2344 9.52344 11.0156 8.88281 11H6.11719ZM6.11719 10.25H8.88281C9.75781 10.2656 10.4922 10.5703 11.0859 11.1641C11.6797 11.7578 11.9844 12.4922 12 13.3672C11.9688 13.7578 11.7578 13.9688 11.3672 14H3.63281C3.24219 13.9688 3.03125 13.7578 3 13.3672C3.01562 12.4922 3.32031 11.7578 3.91406 11.1641C4.50781 10.5703 5.24219 10.2656 6.11719 10.25ZM12 2.75C11.5781 2.76563 11.25 2.95313 11.0156 3.3125C10.8281 3.6875 10.8281 4.0625 11.0156 4.4375C11.25 4.79688 11.5781 4.98438 12 5C12.4219 4.98438 12.75 4.79688 12.9844 4.4375C13.1719 4.0625 13.1719 3.6875 12.9844 3.3125C12.75 2.95313 12.4219 2.76563 12 2.75ZM12 5.75C11.2969 5.73438 10.7578 5.42188 10.3828 4.8125C10.0391 4.1875 10.0391 3.5625 10.3828 2.9375C10.7578 2.32812 11.2969 2.01563 12 2C12.7031 2.01563 13.2422 2.32812 13.6172 2.9375C13.9609 3.5625 13.9609 4.1875 13.6172 4.8125C13.2422 5.42188 12.7031 5.73438 12 5.75ZM12.375 7.25H10.5C10.5 6.98438 10.4688 6.73438 10.4062 6.5H12.375C13.125 6.51562 13.7422 6.77344 14.2266 7.27344C14.7266 7.75781 14.9844 8.375 15 9.125C14.9844 9.35938 14.8594 9.48438 14.625 9.5C14.3906 9.48438 14.2656 9.35938 14.25 9.125C14.2344 8.59375 14.0547 8.14844 13.7109 7.78906C13.3516 7.44531 12.9062 7.26562 12.375 7.25ZM4.5 7.25H2.625C2.09375 7.26562 1.64844 7.44531 1.28906 7.78906C0.945312 8.14844 0.765625 8.59375 0.75 9.125C0.734375 9.35938 0.609375 9.48438 0.375 9.5C0.140625 9.48438 0.015625 9.35938 0 9.125C0.015625 8.375 0.273438 7.75781 0.773438 7.27344C1.25781 6.77344 1.875 6.51562 2.625 6.5H4.59375C4.53125 6.73438 4.5 6.98438 4.5 7.25Z'
                fill='#2F3941'
              />
            </svg> */}
          </Stack>
        }
        isDotVisible={filter.module_ids.length > 0}
        isActive={filter.module_ids.length > 0}
        onClickStatus={{
          id: FilterType.interviewPanels + 'click',
          onClick: handleClick,
        }}
        textLabel={'Interview Type'}
        slotRightIcon={
          <Stack>
            <GlobalIcon iconName='keyboard_arrow_down' />
          </Stack>
        }
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
            borderRadius: 'var(--radius-4)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
          },
        }}
      >
        <FilterDropdown
          slotOption={
            <>
              {allModules?.map((mod) => {
                return (
                  <Stack
                    key={mod.id}
                    direction={'row'}
                    sx={{ alignItems: 'center' }}
                    spacing={1}
                  >
                    <Checkbox
                      isChecked={filter.module_ids.includes(mod.id)}
                      onClickCheck={{
                        onClick: () => {
                          handleFilterClick(mod.id);
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      onClick={() => handleFilterClick(mod.id)}
                    >
                      {mod.name}
                    </Typography>
                  </Stack>
                );
              })}
              {allModules.length === 0 && 'No Interview Types'}
            </>
          }
          onClickDelete={{
            onClick: () => {
              setFilter({ module_ids: [] });
              setFilterVisible(
                filterVisible.filter((f) => f !== FilterType.interviewPanels),
              );
            },
          }}
          onClickReset={{
            onClick: () => {
              setFilter({ module_ids: [] });
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterInterviewModule;
