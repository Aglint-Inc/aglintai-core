import { Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { ButtonFilter, FilterDropdown } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { setDepartment, useFilterModuleStore } from '../../filter-store';

function FilterDepartment() {
  const { recruiter } = useAuthDetails();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const department = useFilterModuleStore((state) => state.department);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-status' : undefined;

  const handleFilterClick = (label) => {
    if (department !== label) {
      setDepartment(label);
    } else {
      setDepartment('');
    }
  };

  const renderStatus = (label: string) => {
    return (
      <Typography
        key={label}
        sx={{
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          bgcolor: department === label ? 'grey.200' : '',
          borderRadius: '4px',
          p: 0.8,
        }}
        onClick={() => handleFilterClick(label)}
      >
        {label}
      </Typography>
    );
  };

  return (
    <>
      <ButtonFilter
        isActive={false}
        isDotVisible={Boolean(department)}
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
            borderRadius: '10px',
            borderColor: '#E9EBED',
            minWidth: '176px',
          },
        }}
      >
        <FilterDropdown
          slotOption={
            <Stack maxHeight={'50vh'} overflow={'auto'}>
              {recruiter.departments.map((item) => renderStatus(item))}
            </Stack>
          }
          isRemoveVisible={false}
          onClickReset={{
            onClick: () => {
              setDepartment('');
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterDepartment;
