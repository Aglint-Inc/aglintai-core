import { Popover, Stack, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

export function FilterDropDownDash<T>({
  itemList,
  value,
  onChange,
}: {
  value: T;
  itemList: { label: string; value: T }[];
  onChange: Dispatch<SetStateAction<T>>;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const [selectedItem, setSelectedItem] = useState<T>(value);
  const open = Boolean(anchorEl);

  const handleChange = (val) => {
    onChange(val);
    setSelectedItem(val);
    setAnchorEl(null);
  };
  return (
    <>
      <ButtonFilter
        isActive={false}
        isDotVisible={false}
        slotLeftIcon={<Stack></Stack>}
        onClickStatus={{
          onClick: (e) => setAnchorEl(e.currentTarget),
          style: {
            padding: '4px',
          },
        }}
        textLabel={capitalizeFirstLetter(
          itemList.find((item) => item.value === selectedItem).label,
        )}
        slotRightIcon={
          <Stack>
            <GlobalIcon
              iconName={anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            />
          </Stack>
        }
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: 'var(--radius-4)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
            marginTop: '5px',
          },
        }}
      >
        <FilterDropdown
          isRemoveVisible={false}
          isResetVisible={false}
          slotOption={itemList.map((item, i) => {
            return (
              <Stack
                key={i}
                direction={'row'}
                sx={{
                  alignItems: 'center',
                  cursor: 'pointer',
                  background:
                    item.value === selectedItem ? 'var(--neutral-2)' : '',
                  ':hover': { bgcolor: 'var(--neutral-2)' },
                  borderRadius: 'var(--radius-2)',
                }}
                spacing={1}
                padding={'var(--space-2) var(--space-3)'}
                onClick={() => {
                  handleChange(item.value);
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  {capitalizeFirstLetter(String(item.label))}
                </Typography>
              </Stack>
            );
          })}
        />
      </Popover>
    </>
  );
}
