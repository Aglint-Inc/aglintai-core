import { Popover, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
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
                  {capitalizeFirstLetter(item)}
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
