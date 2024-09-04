import { type SelectChangeEvent, Select, Stack } from '@mui/material';
import { type FC, type ReactNode } from 'react';

const SelectionComp: FC<{
  value: any;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: SelectChangeEvent<any>) => void;
  children: ReactNode;
  height?: number;
}> = ({ value, onChange, children, height = 40 }) => {
  return (
    <Stack width={'100%'}>
      <Select
        value={value}
        onChange={onChange}
        sx={{
          height: `${height}px`,
          '&:hover': {
            '&& fieldset': {
              border: '1px solid (var(--neutral--6)',
            },
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid (var(--neutral--11)) !important',
            // boxShadow: '0 0 0 2.5px #b4cce4',
          },
        }}
      >
        {children}
      </Select>
    </Stack>
  );
};

export default SelectionComp;
