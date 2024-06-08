import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { Checkbox } from '@/devlink/Checkbox';
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
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
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
            <svg
              width='15'
              height='16'
              viewBox='0 0 15 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.75781 11.2578C7.58594 11.4141 7.41406 11.4141 7.24219 11.2578L2.74219 6.75781C2.58594 6.58594 2.58594 6.41406 2.74219 6.24219C2.91406 6.08594 3.08594 6.08594 3.25781 6.24219L7.5 10.4609L11.7422 6.24219C11.9141 6.08594 12.0859 6.08594 12.2578 6.24219C12.4141 6.41406 12.4141 6.58594 12.2578 6.75781L7.75781 11.2578Z'
                fill='#0F3554'
              />
            </svg>
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
              setDepartments(['']);
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterDepartment;
