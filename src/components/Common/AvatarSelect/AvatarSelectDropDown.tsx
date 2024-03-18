import { MenuItem, TextField } from '@mui/material';
import React from 'react';

import MuiAvatar from '../MuiAvatar';
type MenuOption = {
  name: string;
  value: string | number;
  start_icon_url?: string;
};

type Props = {
  value: string;
  menuOptions: MenuOption[];
  showMenuIcons: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  defaultValue: string;
};

const AvatarSelectDropDown = ({
  menuOptions,
  showMenuIcons = false,
  value,
  onChange,
  defaultValue,
}: Props) => {
  return (
    <>
      <TextField
        select
        onChange={onChange}
        sx={{
          '.MuiSelect-outlined': {
            display: showMenuIcons && 'flex',
            gap: showMenuIcons && '5px',
            alignItems: showMenuIcons && 'center',
          },
        }}
        fullWidth
        value={value}
        defaultValue={defaultValue}
      >
        {...menuOptions.map((menu, idx) => (
          <MenuItem
            sx={{
              padding: '5px',
              direction: 'ltr',
              display: 'flex',
              gap: '5px',
            }}
            key={idx}
            value={menu.value}
          >
            {showMenuIcons && (
              <MuiAvatar
                src={menu.start_icon_url}
                level={menu.name}
                variant='circular'
                fontSize='10px'
                height='25px'
                width='25px'
              />
            )}
            {menu.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default AvatarSelectDropDown;
