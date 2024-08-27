import { Checkbox, Popover, Stack, Typography } from '@mui/material';
import React from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import {
  capitalizeAll,
  capitalizeFirstLetter,
} from '@/src/utils/text/textUtils';

export const Filter = ({
  selectedItems,
  setSelectedItems,
  itemList,
  title,
  isSingle = false,
  nameIsTitle = false,
}: {
  title?: string;
  itemList: { name: string; value: any }[];
  selectedItems: any[] | any;
  setSelectedItems: any;
  isSingle?: boolean;
  nameIsTitle?: boolean;
}) => {
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
      <Stack minWidth={'100px'}>
        <ButtonFilter
          isActive={Boolean(selectedItems.length)}
          isDotVisible={isSingle ? false : Boolean(selectedItems.length)}
          onClickStatus={{
            onClick: handleClick,
          }}
          textLabel={
            nameIsTitle
              ? itemList.find((item) => item.value === selectedItems).name
              : title
          }
          slotRightIcon={
            <Stack>
              <GlobalIcon
                iconName={
                  anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                }
              />
            </Stack>
          }
        />
      </Stack>

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
          isResetVisible={isSingle ? false : itemList.length !== 0}
          slotOption={
            itemList?.length ? (
              itemList?.map((item, i) => {
                return (
                  <Stack
                    key={i}
                    direction={'row'}
                    sx={{
                      alignItems: 'center',
                      userSelect: 'none',
                      backgroundColor: isSingle
                        ? selectedItems === item.value
                          ? 'var(--neutral-2)'
                          : ''
                        : '',
                      ':hover': { bgcolor: 'var(--neutral-2)' },
                      borderRadius: 'var(--radius-2)',
                      cursor: 'pointer',
                      minWidth: '120px',
                    }}
                    spacing={1}
                    padding={'var(--space-2) var(--space-2)'}
                    onClick={() => {
                      if (isSingle) setSelectedItems(item.value);
                      else
                        setSelectedItems(() =>
                          selectedItems.includes(item.value)
                            ? selectedItems.filter((pre) => pre !== item.value)
                            : [...selectedItems, item.value],
                        );
                    }}
                  >
                    {!isSingle && (
                      <Checkbox checked={selectedItems.includes(item.value)} />
                    )}
                    <Typography>{capitalizeFirstLetter(item.name)}</Typography>
                  </Stack>
                );
              })
            ) : (
              <GlobalEmptyState
                textDesc={`No ${capitalizeAll(title)}`}
                iconName={'add'}
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
};
