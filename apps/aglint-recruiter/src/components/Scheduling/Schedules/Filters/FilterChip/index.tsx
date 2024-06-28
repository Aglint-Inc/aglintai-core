import { Popover, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { ShowCode } from '@/src/components/Common/ShowCode';
import DateRange from '@/src/components/Tasks/Components/DateRange';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { FilterOptionsType } from '../../types';

function FilterChip({
  filterType,
  itemList,
  removeFilter,
  resetSelectedItem,
  handleChange,
  defaultSelectedIds,
}: {
  filterType: FilterOptionsType;
  itemList: { label: string; id: string }[];
  removeFilter: any;
  resetSelectedItem: any;
  handleChange: any;
  defaultSelectedIds?: any;
}) {
  const [selectedItem, setSelectedItem] = useState<any[]>(
    defaultSelectedIds || [],
  );
  // popOver open state
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'jobs-filter' : undefined;

  function onSelectItem(item: { id: any }) {
    if (selectedItem.includes(item.id)) {
      const filterItems = selectedItem.filter((ele) => ele !== item.id);
      setSelectedItem([...filterItems]);
      handleChange([...filterItems]);
      return;
    } else {
      const items = [...selectedItem, item.id];
      setSelectedItem([...items]);
      handleChange([...items]);
    }
  }
  return (
    <>
      <ButtonFilter
        isDotVisible={itemList.length && selectedItem.length > 0}
        isActive={itemList.length && selectedItem.length > 0}
        slotLeftIcon={filterType.Icon}
        onClickStatus={{ onClick: handleClick }}
        textLabel={capitalizeAll(filterType.name.replaceAll('-', ' '))}
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
            <ShowCode>
              <ShowCode.When isTrue={filterType.name === 'date_range'}>
                <DateRange
                  disablePast={false}
                  onChange={(e) => {
                    setSelectedItem(e);
                    handleChange(e);
                  }}
                  value={[dayjs(selectedItem[0]), dayjs(selectedItem[1])]}
                />
              </ShowCode.When>
              <ShowCode.Else>
                <Stack spacing={2} maxHeight={'50vh'} overflow={'auto'}>
                  {itemList?.map((item) => {
                    return (
                      <Stack
                        key={item.id}
                        direction={'row'}
                        sx={{ alignItems: 'center' }}
                        spacing={1}
                      >
                        <Checkbox
                          isChecked={selectedItem.includes(item.id)}
                          onClickCheck={{
                            onClick: () => {
                              onSelectItem(item);
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
                            onSelectItem(item);
                          }}
                        >
                          {capitalizeAll(item.label).replaceAll('_', ' ')}
                        </Typography>
                      </Stack>
                    );
                  })}
                  {itemList?.length === 0 &&
                    `No ${capitalizeAll(filterType.name)}`}
                </Stack>
              </ShowCode.Else>
            </ShowCode>
          }
          onClickDelete={{
            onClick: () => {
              handleClose();
              removeFilter();
              if (selectedItem.length) {
                setSelectedItem([]);
                resetSelectedItem([]);
              }
            },
          }}
          onClickReset={{
            onClick: () => {
              handleClose();
              if (selectedItem.length) {
                setSelectedItem([]);
                resetSelectedItem([]);
              }
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterChip;
