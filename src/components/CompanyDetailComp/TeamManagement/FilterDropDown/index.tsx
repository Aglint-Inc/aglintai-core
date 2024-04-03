/* eslint-disable no-unused-vars */
import { Popover, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import React, { ReactNode } from 'react';

import { Checkbox } from '@/devlink';
import { ButtonFilter, FilterDropdown } from '@/devlink2';
type ItemType = string;

function FilterDropDown({
  title,
  itemList,
  setSelectedItems,
  selectedItems,
  icon,
}: {
  title: string;
  itemList: any[];
  selectedItems: ItemType[];
  setSelectedItems: any;
  icon: ReactNode;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const open = Boolean(anchorEl);
  const id = open ? 'jobs-filter' : undefined;
  function handleClose() {
    setAnchorEl(null);
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <ButtonFilter
        isActive={Boolean(selectedItems.length)}
        isDotVisible={Boolean(selectedItems.length)}
        slotLeftIcon={<Stack>{icon}</Stack>}
        // isDotVisible={filter.job_ids.length > 0}
        onClickStatus={{
          onClick: handleClick,
        }}
        textLabel={title}
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
          isRemoveVisible={false}
          slotOption={itemList?.map((item, i) => {
            return (
              <Stack
                key={i}
                direction={'row'}
                sx={{ alignItems: 'center' }}
                spacing={1}
              >
                <Checkbox
                  isChecked={selectedItems.includes(item)}
                  onClickCheck={{
                    onClick: () => {
                      if (selectedItems.includes(item)) {
                        setSelectedItems((ele: ItemType[]) =>
                          ele.filter((innerEle: ItemType) => innerEle !== item),
                        );
                      } else {
                        setSelectedItems((ele: ItemType[]) => [...ele, item]);
                      }
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (selectedItems.includes(item)) {
                      setSelectedItems((ele: ItemType[]) =>
                        ele.filter((innerEle: ItemType) => innerEle !== item),
                      );
                    } else {
                      setSelectedItems((ele: ItemType[]) => [...ele, item]);
                    }
                  }}
                >
                  {capitalize(item)}
                </Typography>
              </Stack>
            );
          })}
          onClickReset={{
            onClick: () => {
              setSelectedItems(() => []);
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterDropDown;
