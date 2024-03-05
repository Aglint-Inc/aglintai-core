import { FormControl, MenuItem, Select } from '@mui/material';
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
      <Select
        sx={{
          width: width,
        }}
        size='small'
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={value}
        variant='outlined'
        onChange={handleSelect}
      >
        {dataset.map((item, i) => {
          return (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default MuiSelect;
