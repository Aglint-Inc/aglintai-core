import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import UITextField from '../../Common/UITextField';

const SearchField = ({
  setFilteredApplications,
}: {
  setFilteredApplications: Dispatch<SetStateAction<JobApplication[]>>;
}) => {
  const { applicationsData } = useJobApplications();
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(value);
    }, 400);
    return () => clearTimeout(timer);
  }, [value, applicationsData.applications.length]);

  const handleSearch = (val: string) => {
    const value = val.trim().toLowerCase();
    const newApplications = applicationsData.applications.reduce(
      (acc, curr) => {
        if (curr.first_name.toLowerCase().includes(value)) acc.push(curr);
        return acc;
      },
      [],
    );
    setFilteredApplications(newApplications);
  };

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
