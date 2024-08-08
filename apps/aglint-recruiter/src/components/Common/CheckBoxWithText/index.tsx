import { Checkbox, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

export function CheckBoxWithText({
  children,
  checked,
  onClick,
  disabled,
  text,
}: {
  children?: ReactNode;
  checked: boolean;
  onClick: () => void;
  disabled?: boolean;
  text: string;
}) {
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} gap={1}>
        <Checkbox checked={checked} onClick={onClick} disabled={disabled} />
        <Typography>{text}</Typography>
      </Stack>
      {children}
    </>
  );
}
