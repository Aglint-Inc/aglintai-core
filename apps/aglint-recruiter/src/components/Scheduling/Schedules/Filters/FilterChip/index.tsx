import { Popover, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

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
  setSelectedItem,
  selectedItem,
  handleChange,
}: {
  filterType: FilterOptionsType;
  itemList: { label: string; id: string }[];
  removeFilter: any;
  setSelectedItem: any;
  selectedItem: any;
  resetSelectedItem: any;
  handleChange: any;
}) {
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
    if (selectedItem[filterType.name].includes(item.id)) {
      const filterItems = selectedItem[filterType.name].filter(
        (ele) => ele !== item.id,
      );
      setSelectedItem((pre) => ({
        ...pre,
        [filterType.name]: [...filterItems],
      }));
      handleChange([...filterItems]);
      return;
    } else {
      const items = [...selectedItem[filterType.name], item.id];
      setSelectedItem((pre) => ({ ...pre, [filterType.name]: [...items] }));
      handleChange([...items]);
    }
  }

  return (
    <>
      <ButtonFilter
        isDotVisible={
          filterType.name === 'date_range'
            ? selectedItem[filterType.name].length > 0
            : itemList.length && selectedItem[filterType.name].length > 0
        }
        isActive={itemList.length && selectedItem[filterType.name].length > 0}
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
                    setSelectedItem((pre) => ({
                      ...pre,
                      [filterType.name]: e,
                    }));
                    handleChange(e);
                  }}
                  value={[
                    dayjs(selectedItem[filterType.name][0]),
                    dayjs(selectedItem[filterType.name][1]),
                  ]}
                />
              </ShowCode.When>
              <ShowCode.Else>
                <Stack spacing={2} maxHeight={'50vh'} overflow={'auto'}>
                  {itemList?.map((item) => {
                    return (
                      <Stack
                        key={item.id}
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
                          isChecked={selectedItem[filterType.name].includes(
                            item.id,
                          )}
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
              if (selectedItem[filterType.name].length) {
                setSelectedItem((pre) => ({ ...pre, [filterType.name]: [] }));
                resetSelectedItem([]);
              }
            },
          }}
          onClickReset={{
            onClick: () => {
              handleClose();
              if (selectedItem[filterType.name].length) {
                setSelectedItem((pre) => ({ ...pre, [filterType.name]: [] }));
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
