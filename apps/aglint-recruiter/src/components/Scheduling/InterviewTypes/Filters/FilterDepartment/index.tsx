import { Checkbox } from '@components/ui/checkbox';
import { GlobalIcon } from '@devlink/GlobalIcon';
import { ButtonFilter } from '@devlink2/ButtonFilter';
import { FilterDropdown } from '@devlink2/FilterDropdown';
import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { useAllDepartments } from '@/queries/departments';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { setDepartments, useFilterModuleStore } from '../../filter-store';

function FilterDepartment() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const departments = useFilterModuleStore((state) => state.departments);
  const query = useAllDepartments();

  const allDepartments = query?.data || [];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-status' : undefined;

  const handleFilterClick = (
    item: ReturnType<typeof useAllDepartments>['data'][0],
  ) => {
    if (departments.some((id) => id === item.id)) {
      setDepartments(departments.filter((id) => id != item.id));
    } else {
      setDepartments([...departments, item.id]);
    }
  };

  const renderStatus = (
    item: ReturnType<typeof useAllDepartments>['data'][0],
  ) => {
    return (
      <Stack
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
          checked={!!departments.find((id) => id === item.id)}
          onClick={() => {
            handleFilterClick(item);
          }}
        />
        <Typography
          key={item.id}
          sx={{
            fontSize: '14px',
            cursor: 'pointer',
          }}
          onClick={() => handleFilterClick(item)}
        >
          {capitalizeFirstLetter(item.name)}
        </Typography>
      </Stack>
    );
  };

  return (
    <>
      <ButtonFilter
        isActive={departments.length > 0}
        isDotVisible={departments.length > 0}
        onClickStatus={{
          id: 'department' + 'click',
          onClick: handleClick,
          style: {
            whiteSpace: 'nowrap',
            height: '100%',
          },
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
            <Stack maxHeight={'50vh'} overflow={'auto'} spacing={1.5}>
              {allDepartments.map((item) => renderStatus(item))}
            </Stack>
          }
          isRemoveVisible={false}
          onClickReset={{
            onClick: () => {
              setDepartments([]);
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterDepartment;
