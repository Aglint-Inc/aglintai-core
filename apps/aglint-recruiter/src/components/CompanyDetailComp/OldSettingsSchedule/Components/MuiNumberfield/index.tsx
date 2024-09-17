import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import UITextField from '@/components/Common/UITextField';

function MuiNumberfield({
  value,
  handleSelect,
  isDebounceEnable = true,
  isDisable = false,
  isMarginTop = true,
  max = 100,
}: {
  value: number | string;
  width?: string;
  isDebounceEnable?: boolean;
  height?: string;
  isMarginTop?: boolean;
  isDisable?: boolean;
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
    if (isDebounceEnable) {
      debouncedChange(newValue);
    } else {
      handleSelect(newValue);
    }
  }

  const debouncedChange = useCallback(
    debounce((newValue) => {
      handleSelect(newValue);
    }, 500),
    [],
  );

  return (
    <div className={`${isMarginTop ? 'mt-3' : ''}`}>
      <UITextField
        disabled={isDisable}
        value={Number(tempValue).toString()}
        onChange={handlerMinMax}
        type='number'
        className='w-full'
      />
    </div>
  );
}

export default MuiNumberfield;
// import { FormControl, TextField } from '@mui/material';
// import { debounce } from 'lodash';
// import { useCallback, useEffect, useState } from 'react';

// function MuiNumberfield({
//   value,
//   handleSelect,
//   width = '160px',
//   isDebounceEnable = true,
//   isDisable = false,
//   isMarginTop = true,
//   max = 100,
// }: {
//   value: number | string;
//   width?: string;
//   isDebounceEnable?: boolean;
//   height?: string;
//   isMarginTop?: boolean;
//   isDisable?: boolean;
//   handleSelect: any;
//   max?: number;
// }) {
//   const [tempValue, setTempValue] = useState(value);
//   useEffect(() => {
//     setTempValue(value);
//   }, [value]);

//   function handlerMinMax(e) {
//     let newValue = +e.target.value;
//     if (!(newValue >= 0)) newValue = 0;
//     if (newValue > max) newValue = max;
//     setTempValue(newValue);
//     if (tempValue == newValue) return;
//     if (isDebounceEnable) {
//       debouncedChange(newValue);
//     } else {
//       handleSelect(newValue);
//     }
//   }

//   const debouncedChange = useCallback(
//     debounce((newValue) => {
//       handleSelect(newValue);
//     }, 500),
//     [],
//   );

//   return (
//     <FormControl
//       sx={{
//         marginTop: isMarginTop ? '12px !important' : '',
//       }}
//     >
//       <TextField
//         disabled={isDisable}
//         inputProps={{ type: 'number' }}
//         sx={{
//           width: width,
//           '& .MuiInputBase-root': {
//             // height: height, // Customize the height here
//           },
//           '& .MuiInputBase-input': {
//             // bgcolor: 'yellow',
//             paddingRight: 0,
//             width: width,
//             border: 'none',
//             margin: 'none !important',
//           },
//         }}
//         value={Number(tempValue).toString()}
//         onChange={handlerMinMax}
//         type='number'
//       />
//     </FormControl>
//   );
// }

// export default MuiNumberfield;
