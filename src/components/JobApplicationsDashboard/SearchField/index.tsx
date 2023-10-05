import { useJobApplications } from '@context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
} from '@context/JobApplicationsContext/types';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Collapse, InputAdornment, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import UITextField from '../../Common/UITextField';

const SearchField = ({
  applications,
  section,
  jobUpdate,
  setFilteredApplications,
}: {
  applications: JobApplication[];
  section: JobApplicationSections;
  jobUpdate: boolean;
  setFilteredApplications: Dispatch<SetStateAction<JobApplication[]>>;
}) => {
  const { applicationsData } = useJobApplications();
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(value);
    }, 400);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    handleSearch(value);
  }, [
    applicationsData.applications.new,
    applicationsData.applications.interviewing,
    applicationsData.applications.disqualified,
    applicationsData.applications.qualified,
    section,
    jobUpdate,
  ]);

  const handleSearch = (val: string) => {
    const value = val.trim().toLowerCase();
    const newApplications = applications.reduce((acc, curr) => {
      if (
        curr.first_name.toLowerCase().includes(value) ||
        curr.email.toLowerCase().includes(value)
      )
        acc.push(curr);
      return acc;
    }, []);
    setFilteredApplications(newApplications);
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
