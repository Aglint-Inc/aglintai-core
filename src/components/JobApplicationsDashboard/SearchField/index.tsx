import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import UITextField from '../../Common/UITextField';

const SearchField = ({
  applications,
  setFilteredApplications,
}: {
  applications: JobApplication[];
  setFilteredApplications: Dispatch<SetStateAction<JobApplication[]>>;
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(value);
    }, 400);
    return () => clearTimeout(timer);
  }, [value]);

  const handleSearch = useCallback((val: string) => {
    const value = val.trim().toLowerCase();
    const newApplications = applications.reduce((acc, curr) => {
      if (curr.first_name.toLowerCase().includes(value)) acc.push(curr);
      return acc;
    }, []);
    setFilteredApplications(newApplications);
  }, []);

  return (
    <UITextField
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder='Search'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon sx={{ opacity: 0.5 }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
