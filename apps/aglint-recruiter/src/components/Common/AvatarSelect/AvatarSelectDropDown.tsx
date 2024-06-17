import { MenuItem, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

import { WarningSvg } from '../../JobCreate/form';
import MuiAvatar from '../MuiAvatar';
import UITypography from '../UITypography';

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
  labelSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';

  labelBold?: 'default' | 'normal';
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  label?: string;
  defaultValue?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  defaultLabelColor?: string;
};

const AvatarSelectDropDown = ({
  menuOptions,
  showMenuIcons = false,
  value,
  onChange,
  label = null,

  labelBold = 'default',
  labelSize = 'small',
  defaultValue = null,
  error = false,
  helperText = null,
  disabled,
  required,
  defaultLabelColor = null,
}: Props) => {
  let labelColor = defaultLabelColor ? defaultLabelColor : 'var(--neutral-12)';

  if (disabled) {
    labelColor = defaultLabelColor ? defaultLabelColor : 'var(--neutral-11)';
  }
  return (
    <Stack gap={'var(--space-1)'} width={'100%'}>
      {/* {label && <Stack>{label}</Stack>} */}
      {label && (
        <Stack direction={'row'}>
          <UITypography
            type={labelSize}
            color={labelColor}
            fontBold={labelBold}
          >
            {label}
          </UITypography>
          {required && (
            <Typography sx={{ color: 'var(--error-9)', pl: 0.5 }}>
              *{/* <sup>*</sup> */}
            </Typography>
          )}
        </Stack>
      )}
      <TextField
        select
        onChange={onChange}
        error={error}
        sx={{
          '.MuiOutlinedInput-root': {
            // border: `1px solid ${error ? 'var(--error-6)' : 'var(--neutral-6)'}`,
            '&.Mui-focused': {
              // borderColor: ` ${error ? 'var(--error-a6)' : 'var(--accent-a6)'}`,
              // outline: 'none',
              // shadow: 'none',
            },
          },
          '.MuiSelect-outlined': {
            display: showMenuIcons && 'flex',
            gap: showMenuIcons && 'var(--space-1)',
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
                maxHeight: '240px',
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
              color: 'var(--neutral-12)',
              cursor: 'default',
            }}
          >
            No options available
          </Stack>
        ) : (
          menuOptions.map((menu, idx) => (
            <MenuItem
              sx={{
                padding: 'var(--space-2)',
                direction: 'ltr',
                display: 'flex',
                gap: 'var(--space-1)',
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
                            variant='rounded-xs'
                          />
                        </Stack>
                      ))}
                    {(menu?.start_icon_url?.slice(3) ?? []).length > 0 && (
                      <Stack sx={{ transform: `translateX(-80%)` }}>
                        <MuiAvatar
                          src={null}
                          level={`${menu.start_icon_url.slice(3).length}+`}
                          variant='rounded-xs'
                          extended={true}
                        />
                      </Stack>
                    )}
                  </Stack>
                ) : (
                  <MuiAvatar
                    src={menu.start_icon_url}
                    level={menu.name}
                    variant='rounded-xs'
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
        <Stack alignItems={'center'} direction={'row'} color='var(--error-11)'>
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
        gap={'var(--space-1)'}
        style={{ fontSize: 'var(--font-size-1)', color: 'var(--neutral-11)' }}
      >
        {icon}
        {title}
      </Stack>
    );
};
