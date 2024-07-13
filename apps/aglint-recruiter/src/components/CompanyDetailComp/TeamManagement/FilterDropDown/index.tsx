import { Popover, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import {
  capitalizeAll,
  capitalizeFirstLetter,
} from '@/src/utils/text/textUtils';
type ItemType = string;

function FilterDropDown({
  title,
  itemList,
  setSelectedItems,
  selectedItems,
  icon,
  iconname,
}: {
  title: string;
  itemList: any[];
  selectedItems: ItemType[];
  setSelectedItems: any;
  icon: ReactNode;
  iconname?: string;
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
        onClickStatus={{
          onClick: handleClick,
        }}
        textLabel={title}
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
      >
        <FilterDropdown
          isRemoveVisible={false}
          isResetVisible={itemList.length !== 0}
          slotOption={
            itemList.length ? (
              itemList?.map((item, i) => {
                return (
                  <Stack
                    key={i}
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      ':hover': { bgcolor: 'var(--neutral-2)' },
                      borderRadius: 'var(--radius-2)',
                      cursor: 'pointer',
                    }}
                    spacing={1}
                    padding={'var(--space-2) var(--space-3)'}
                  >
                    <Checkbox
                      isChecked={selectedItems.includes(item)}
                      onClickCheck={{
                        onClick: () => {
                          if (selectedItems.includes(item)) {
                            setSelectedItems((ele: ItemType[]) =>
                              ele.filter(
                                (innerEle: ItemType) => innerEle !== item,
                              ),
                            );
                          } else {
                            setSelectedItems((ele: ItemType[]) => [
                              ...ele,
                              item,
                            ]);
                          }
                        },
                      }}
                    />
                    <Typography
                      onClick={() => {
                        if (selectedItems.includes(item)) {
                          setSelectedItems((ele: ItemType[]) =>
                            ele.filter(
                              (innerEle: ItemType) => innerEle !== item,
                            ),
                          );
                        } else {
                          setSelectedItems((ele: ItemType[]) => [...ele, item]);
                        }
                      }}
                    >
                      {capitalizeFirstLetter(item)}
                    </Typography>
                  </Stack>
                );
              })
            ) : (
              <GlobalEmptyState
                textDesc={`No ${capitalizeAll(title)}`}
                iconName={iconname}
              />
            )
          }
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
