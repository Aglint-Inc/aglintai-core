//not using
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Collapse, InputAdornment, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useRef, useState } from 'react';

import UITextField from '@/src/components/Common/UITextField';

const SearchField = ({
  val,
  handleSearch,
}: {
  val: string;
  // eslint-disable-next-line no-unused-vars
  handleSearch: (val: string, signal?: AbortSignal) => Promise<void>;
}) => {
  const [value, setValue] = useState(val);
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
    } else {
      const controller = new AbortController();
      const timer = setTimeout(async () => {
        await handleSearch(value, controller.signal);
      }, 400);
      return () => {
        controller.abort();
        clearTimeout(timer);
      };
    }
  }, [value]);

  return (
    <UITextField
      width={'250px'}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value || ''}
      placeholder='Search'
      InputProps={{
        endAdornment: (
          <InputAdornment position='start'>
            <Stack
              position={'absolute'}
              style={{ transform: 'translateX(-12px)' }}
            >
              <Collapse
                in={!(value === '' || value === null)}
                sx={{ position: 'relative' }}
              >
                <IconButton
                  onClick={() => setValue(null)}
                  style={{ transform: 'translateX(-4px)' }}
                >
                  <CloseIcon sx={{ opacity: 0.5 }} />
                </IconButton>
              </Collapse>
              <Collapse
                in={value === '' || value === null}
                sx={{ position: 'relative' }}
              >
                <SearchIcon
                  sx={{ opacity: 0.5 }}
                  style={{ transform: 'translateY(2px)' }}
                />
              </Collapse>
            </Stack>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
