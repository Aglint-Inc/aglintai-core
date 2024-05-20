import { FormControl, TextField } from '@mui/material';

function MuiNumberfield({
  value,
  handleSelect,
  min = 0,
}: {
  value: number | string;
  handleSelect: any;
  min?: number;
}) {
  function handlerMinMax(e) {
    const newValue = +e.target.value;

    if (newValue >= min) handleSelect(newValue);
    else handleSelect(0);
  }
  return (
    <FormControl>
      <TextField
        value={value}
        onChange={handlerMinMax}
        sx={{
          width: '100px',
          '& .MuiInputBase-root': {
            borderColor: '#c4c4c4',
            outline: 'none !important',

            padding: '1px 1.3px',
          },
          '& .Mui-focused': {
            border: '2px solid',
            p: 0,
          },
        }}
        type='tel'
      />
    </FormControl>
  );
}

export default MuiNumberfield;
