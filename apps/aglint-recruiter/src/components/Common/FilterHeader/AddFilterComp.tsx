import { List, ListItemButton, Popover, Stack } from '@mui/material';
import React from 'react';

import { AddFilter } from '@/devlink2/AddFilter';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

export function AddFilterComp({
  filterList,
  setVisible,
}: {
  filterList: { name: string; index }[];
  // eslint-disable-next-line no-unused-vars
  setVisible: (index: number) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'add-filter' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AddFilter
        onClickAddFilter={{
          style: {
            'align-items': 'center',
          },
          onClick: (e) => {
            handleClick(e);
          },
        }}
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
            border: 'none',
          },
        }}
      >
        <Stack direction={'column'}>
          {filterList.map((item, i) => {
            return (
              <List key={i}>
                <ListItemButton onClick={() => setVisible(item.index)}>
                  {capitalizeFirstLetter(item.name)}
                </ListItemButton>
              </List>
            );
          })}
        </Stack>
      </Popover>
    </>
  );
}
