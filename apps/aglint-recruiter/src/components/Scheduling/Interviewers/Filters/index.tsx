import { InputAdornment, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { QualifiedIcons } from '@/devlink2/QualifiedIcons';
import UITextField from '@/src/components/Common/UITextField';
import FilterDropDown from '@/src/components/CompanyDetailComp/TeamManagement/FilterDropDown';

import { useInterviewerList } from '..';

function Filters({ setFilteredInterviewer }) {
  const { data: interviewers, isLoading } = useInterviewerList();

  // search filter interviewers
  const [searchText, setSearchText] = useState('');

  const filterMembers = (searchText: string) => {
    const filtered = interviewers.filter((interviewer) => {
      return (
        interviewer.rec_user.first_name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        interviewer.rec_user.position
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        interviewer.rec_user.email
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    });
    setFilteredInterviewer(filtered);
  };
  useEffect(() => {
    if (searchText) {
      filterMembers(searchText);
    }
  }, [searchText]);

  const handleSearchInputChange = (e: any) => {
    const input = e.target.value.trim();
    if (!input) {
      setFilteredInterviewer(interviewers);
    }
    if (input) setSearchText(e.target.value);
  };
  // search filter END

  // filters by column
  const [selectedQualifiedModule, setSelectedQualifiedModule] = useState<
    string[]
  >([]);
  const [selectedTrainingModule, setSelectedTrainingModule] = useState<
    string[]
  >([]);
  const allQualifiedModules = [];
  const allTrainingModules = [];

  interviewers.forEach((item) => {
    allQualifiedModules.push(
      ...item.qualified_module_names.filter((item) => item),
    );
    allTrainingModules.push(
      ...item.qualified_module_names.filter((item) => item),
    );
  });

  const uniqueQualifiedModules = [...new Set(allQualifiedModules)];
  const uniqueTrainingModules = [...new Set(allQualifiedModules)];

  useEffect(() => {
    const filtered = interviewers.filter((interviewer) => {
      const qualifiedModuleMatch =
        selectedQualifiedModule.length &&
        selectedQualifiedModule.every((element) =>
          interviewer.qualified_module_names.includes(element),
        );
      const trainingModuleMatch =
        selectedTrainingModule.length &&
        selectedTrainingModule.every((element) =>
          interviewer.training_module_names.includes(element),
        );

      return qualifiedModuleMatch || trainingModuleMatch;
    });
    setFilteredInterviewer(filtered.length ? filtered : interviewers);
  }, [selectedQualifiedModule, selectedTrainingModule]);

  // filters by column END

  if (isLoading) {
    return null;
  }
  return (
    <div>
      <Stack
        direction={'row'}
        p={'var(--space-2)'}
        alignItems={'center'}
        spacing={'var(--space-2)'}
        marginRight={5}
      >
        <UITextField
          width='250px'
          height={32}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <GlobalIcon iconName='search' size='5'/>
              </InputAdornment>
            ),
          }}
          placeholder='Search Interviewer'
          onChange={handleSearchInputChange}
        />
        <FilterDropDown
          title={'Qualified'}
          itemList={uniqueQualifiedModules}
          selectedItems={selectedQualifiedModule}
          setSelectedItems={setSelectedQualifiedModule}
          icon={
            <QualifiedIcons
              isQualifiedVisible={true}
              isTrainingVisible={false}
            />
          }
        />
        <FilterDropDown
          title={'Training'}
          itemList={uniqueTrainingModules}
          selectedItems={selectedTrainingModule}
          setSelectedItems={setSelectedTrainingModule}
          icon={
            <QualifiedIcons
              isTrainingVisible={true}
              isQualifiedVisible={false}
            />
          }
        />
      </Stack>
    </div>
  );
}

export default Filters;
