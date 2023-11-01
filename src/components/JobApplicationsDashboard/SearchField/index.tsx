import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Collapse, InputAdornment, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

import { useJobApplications } from '@/src/context/JobApplicationsContext';

import UITextField from '../../Common/UITextField';

const SearchField = () => {
  const { searchParameters, handleJobApplicationFilter } = useJobApplications();
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      await handleSearch(value);
    }, 400);
    return () => clearTimeout(timer);
  }, [value]);

  const handleSearch = async (val: string) => {
    const value = val.trim().toLowerCase();
    await handleJobApplicationFilter({
      ...searchParameters,
      search: value,
    });
  };

  return (
    <UITextField
      width={'250px'}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
      placeholder='Search'
      InputProps={{
        endAdornment: (
          <InputAdornment position='start'>
            <Stack
              position={'absolute'}
              style={{ transform: 'translateX(-12px)' }}
            >
              <Collapse in={value !== ''} sx={{ position: 'relative' }}>
                <IconButton
                  onClick={() => setValue('')}
                  style={{ transform: 'translateX(-4px)' }}
                >
                  <CloseIcon sx={{ opacity: 0.5 }} />
                </IconButton>
              </Collapse>
              <Collapse in={value === ''} sx={{ position: 'relative' }}>
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
