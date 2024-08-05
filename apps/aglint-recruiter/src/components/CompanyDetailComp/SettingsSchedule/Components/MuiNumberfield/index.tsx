import { FormControl, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

function MuiNumberfield({
  value,
  handleSelect,
  width = '160px',
  height = '36px',
  max = 100,
}: {
  value: number | string;
  width?: string;
  height?: string;
  handleSelect: any;
  max?: number;
}) {
  const [tempValue, setTempValue] = useState(value);
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  function handlerMinMax(e) {
    let newValue = +e.target.value;
    if (!(newValue >= 0)) newValue = 0;
    if (newValue > max) newValue = max;
    setTempValue(newValue);
    if (tempValue == newValue) return;
    debouncedChange(newValue);
  }

  const debouncedChange = useCallback(
    debounce((newValue) => {
      handleSelect(newValue);
    }, 500),
    [],
  );

  return (
    <FormControl>
      <TextField
        sx={{
          width: width,
          '& .MuiInputBase-root': {
            height: height, // Customize the height here
          },
        }}
        value={Number(tempValue).toString()}
        onChange={handlerMinMax}
        type='number'
      />
    </FormControl>
  );
}

export default MuiNumberfield;
