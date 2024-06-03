import { FormControlLabel, Switch } from '@mui/material';

function ToggleBtn({ isChecked, handleChange }) {
  return (
    <FormControlLabel
      control={
        <Switch
          onChange={(e, value) => {
            handleChange(value);
            return e;
          }}
          checked={isChecked}
        />
      }
      label=''
    />
  );
}

export default ToggleBtn;
