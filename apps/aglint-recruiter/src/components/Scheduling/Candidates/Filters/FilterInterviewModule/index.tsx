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
            <>
              {allModules?.map((mod) => {
                return (
                  <Stack
                    key={mod.id}
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      ':hover': { bgcolor: 'var(--neutral-2)' },
                      borderRadius: 'var(--radius-2)',
                    }}
                    spacing={1}
                    padding={'var(--space-2) var(--space-3)'}
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
