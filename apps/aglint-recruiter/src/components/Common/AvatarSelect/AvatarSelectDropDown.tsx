import { MenuItem, Stack, TextField } from '@mui/material';
import React from 'react';

import { palette } from '@/src/context/Theme/Theme';

import { WarningSvg } from '../../JobCreate/form';
import MuiAvatar from '../MuiAvatar';
type MenuOption = {
  name: string;
  value: string | number;
  start_icon_url?:
    | string
    | {
        name: string;
        url: string;
      }[];
  icon?: React.JSX.Element;
  meta?: {
    title: string;
    icon: React.JSX.Element;
  }[];
};

type Props = {
  value: string | number;
  menuOptions: MenuOption[];
  showMenuIcons: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  label?: string;
  defaultValue?: string;
  error?: boolean;
  helperText?: string;
};

const AvatarSelectDropDown = ({
  menuOptions,
  showMenuIcons = false,
  value,
  onChange,
  label = null,
  defaultValue = null,
  error = false,
  helperText = null,
}: Props) => {
  return (
    <Stack gap={'6px'} width={'100%'}>
      {label && <Stack>{label}</Stack>}
      <TextField
        select
        onChange={onChange}
        sx={{
          '.MuiOutlinedInput-root': {
            border: `1px solid ${error ? palette.red[500] : palette.grey[300]}`,
            '&.Mui-focused': {
              borderColor: ` ${error ? palette.red[500] : '#1f73b7'}`,
              outline: `3px solid ${error ? palette.red[300] : '#adcce4'}`,
            },
          },
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
        {menuOptions.length === 0 ? (
          <Stack
            px={1}
            style={{
              fontStyle: 'italic',
              color: palette.grey[400],
              cursor: 'default',
            }}
          >
            No options available
          </Stack>
        ) : (
          menuOptions.map((menu, idx) => (
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
              {showMenuIcons &&
                (menu.icon ? (
                  menu.icon
                ) : Array.isArray(menu.start_icon_url) ? (
                  <Stack direction={'row'}>
                    {menu.start_icon_url
                      .slice(0, 3)
                      .map(({ name, url }, index) => (
                        <Stack
                          key={index}
                          sx={{
                            zIndex: menu.start_icon_url.length - index,
                            transform: `translateX(-${index * 30}%)`,
                          }}
                        >
                          <MuiAvatar
                            src={url}
                            level={name}
                            variant='circular'
                            fontSize='10px'
                            height='18px'
                            width='18px'
                          />
                        </Stack>
                      ))}
                    {(menu?.start_icon_url?.slice(3) ?? []).length > 0 && (
                      <Stack sx={{ transform: `translateX(-80%)` }}>
                        <MuiAvatar
                          src={null}
                          level={`${menu.start_icon_url.slice(3).length}+`}
                          variant='circular'
                          fontSize='10px'
                          height='18px'
                          width='18px'
                          bgColor={palette.grey['400']}
                          extended={true}
                        />
                      </Stack>
                    )}
                  </Stack>
                ) : (
                  <MuiAvatar
                    src={menu.start_icon_url}
                    level={menu.name}
                    variant='circular'
                    fontSize='10px'
                    height='18px'
                    width='18px'
                  />
                ))}
              {menu.name}
              <Stack direction={'row'} gap={2} ml={'auto'}>
                {(menu.meta ?? []).map(({ title, icon }, i) => (
                  <Meta key={i} title={title} icon={icon} />
                ))}
              </Stack>
            </MenuItem>
          ))
        )}
      </TextField>
      {error && helperText && (
        <Stack alignItems={'center'} direction={'row'} color={palette.red[500]}>
          <WarningSvg />
          {helperText}
        </Stack>
      )}
    </Stack>
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
        minWidth={'120px'}
        gap={'4px'}
        style={{ fontSize: '12px', color: palette.grey['500'] }}
      >
        {icon}
        {title}
      </Stack>
    );
};
