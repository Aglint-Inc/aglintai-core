import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { useAllDepartments } from '@/src/queries/departments';

import {
  FilterType,
  setFilter,
  setFilterVisible,
  useFilterCandidateStore,
} from '../../filter-store';

function FilterDepartment() {
  const { data: departments } = useAllDepartments();
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
  const id = open ? 'departments-filter' : undefined;

  const handleFilterClick = (dep_id: number) => {
    if (filter.department_ids?.includes(dep_id)) {
      setFilter({
        department_ids: filter.department_ids.filter((s) => s !== dep_id),
      });
    } else {
      setFilter({ department_ids: [...filter.department_ids, dep_id] });
    }
  };

  return (
    <>
      <ButtonFilter
        isActive={filter.department_ids.length > 0}
        slotLeftIcon={
          <Stack>
            <GlobalIcon iconName='business_center' />
          </Stack>
        }
        isDotVisible={filter.department_ids.length > 0}
        onClickStatus={{
          id: FilterType.departments + 'click',
          onClick: handleClick,
        }}
        textLabel={'Department'}
        slotRightIcon={
          <Stack>
            <GlobalIcon
              iconName={anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            />
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
            <Stack spacing={2} maxHeight={'50vh'} overflow={'auto'}>
              {departments?.map((dep) => {
                return (
                  <Stack
                    key={dep.id}
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      ':hover': { bgcolor: 'var(--neutral-2)' },
                      borderRadius: 'var(--radius-2)',
                    }}
                    spacing={1}
                    padding={'var(--space-2) var(--space-3)'}
                    marginTop={'0px !important'}
                  >
                    <Checkbox
                      isChecked={filter.department_ids?.includes(dep.id)}
                      onClickCheck={{
                        onClick: () => {
                          handleFilterClick(dep.id);
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleFilterClick(dep.id)}
                    >
                      {dep.name}
                    </Typography>
                  </Stack>
                );
              })}
              {departments?.length === 0 && 'No department found'}
            </Stack>
          }
          onClickDelete={{
            onClick: () => {
              setFilter({ job_ids: [] });
              setFilterVisible(
                filterVisible.filter((f) => f !== FilterType.departments),
              );
            },
          }}
          onClickReset={{
            onClick: () => {
              setFilter({ job_ids: [] });
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterDepartment;
