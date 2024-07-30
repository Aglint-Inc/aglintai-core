import { FormControl, MenuItem, TextField } from '@mui/material';
import React from 'react';

function MuiSelect({
  value,
  handleSelect,
  dataset,
  width = '100px',
}: {
  value: number | string;
  handleSelect: any;
  dataset: any[];
  width?: '100px' | '150px' | '200px';
}) {
  return (
    <FormControl>
      <TextField
        sx={{
          width: width,
        }}
        size='small'
        id='demo-simple-select'
        value={String(value)}
        variant='outlined'
        onChange={handleSelect}
        select
      >
        {dataset.map((item, i) => {
          return (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </TextField>
    </FormControl>
  );
}

export default MuiSelect;
