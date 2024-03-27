import { MenuItem, Stack, TextField } from '@mui/material';
import React from 'react';

import { palette } from '@/src/context/Theme/Theme';
import { getFullName } from '@/src/utils/jsonResume';

import MuiAvatar from '../MuiAvatar';
type MenuOption = {
  name: string;
  value: string | number;
  start_icon_url?: string;
  meta?: {
    title: string;
    icon: React.JSX.Element;
  }[];
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
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: {
                maxHeight: '250px',
              },
            },
          },
        }}
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
                height='18px'
                width='18px'
              />
            )}
            {getFullName(menu.name, '')}
            <Stack direction={'row'} gap={2} ml={'auto'}>
              {(menu.meta ?? []).map(({ title, icon }, i) => (
                <Meta key={i} title={title} icon={icon} />
              ))}
            </Stack>
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default AvatarSelectDropDown;

const Meta = ({
  title,
  icon = <></>,
}: {
  title: string;
  icon?: React.JSX.Element;
}) => {
  if (title)
    return (
      <Stack
        direction={'row'}
        gap={'4px'}
        style={{ fontSize: '12px', color: palette.grey['500'] }}
      >
        {icon}
        {title}
      </Stack>
    );
};
