import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { setDepartments, useFilterModuleStore } from '../../filter-store';

function FilterDepartment() {
  const { recruiter } = useAuthDetails();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const departments = useFilterModuleStore((state) => state.departments);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-status' : undefined;

  const handleFilterClick = (label) => {
    if (departments.includes(label)) {
      setDepartments(departments.filter((l) => l != label));
    } else {
      setDepartments([...departments, label]);
    }
  };

  const renderStatus = (label: string) => {
    return (
      <Stack direction={'row'} sx={{ alignItems: 'center', ':hover':{bgcolor:'var(--neutral-2)'}, borderRadius:'var(--radius-2)' }} spacing={1}
      padding={'var(--space-2) var(--space-3)'}
      marginTop={'0px !important'}
      >
        <Checkbox
          isChecked={departments.includes(label)}
          onClickCheck={{
            onClick: () => {
              handleFilterClick(label);
            },
          }}
        />
        <Typography
          key={label}
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onClick={() => handleFilterClick(label)}
        >
          {capitalizeFirstLetter(label)}
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
        }}
        textLabel={'Department'}
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
            <Stack maxHeight={'50vh'} overflow={'auto'} spacing={1.5}>
              {recruiter.departments.map((item) => renderStatus(item))}
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
