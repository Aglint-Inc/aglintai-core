import { Stack } from '@mui/material';
import React, { useEffect, useState, useTransition } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { QualifiedIcons } from '@/devlink2/QualifiedIcons';
import SearchField from '@/src/components/Common/SearchField/SearchField';
import FilterDropDown from '@/src/components/CompanyDetailComp/TeamManagement/FilterDropDown';

import { useInterviewerList } from '..';

function Filters({ setFilteredInterviewer }) {
  const { data: interviewers, isLoading } = useInterviewerList();

  const [searchText, setSearchText] = useState('');
  const [, startTransition] = useTransition();

  const handleSearchInputChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleTextClear = () => {
    setSearchText('');
    startTransition(() => {
      setFilteredInterviewer(interviewers);
    });
  };

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
    const isFilter = Boolean(
      selectedQualifiedModule.length || selectedTrainingModule.length,
    );
    const isSearch = !!searchText;
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

      const filteredSearch =
        searchText.trim().length &&
        (interviewer.first_name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
          interviewer.position
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          interviewer.email.toLowerCase().includes(searchText.toLowerCase()));

      return isSearch && isFilter
        ? (qualifiedModuleMatch || trainingModuleMatch) && filteredSearch
        : isFilter
          ? qualifiedModuleMatch || trainingModuleMatch
          : isSearch
            ? filteredSearch
            : true;
    });
    setFilteredInterviewer(isSearch || isFilter ? filtered : interviewers);
  }, [selectedQualifiedModule, selectedTrainingModule, searchText]);

  const resetFilter = () => {
    setSelectedQualifiedModule([]);
    setSelectedTrainingModule([]);
  };
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
        <SearchField
          value={searchText}
          onChange={handleSearchInputChange}
          onClear={handleTextClear}
          placeholder='Search Interviewer'
        />
        <FilterDropDown
          title={'Qualified'}
          iconname='person_check'
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
          iconname='person_check'
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
        {(selectedQualifiedModule.length > 0 ||
          selectedTrainingModule.length > 0) && (
          <ButtonGhost
            textButton='Reset All'
            size={2}
            color={'neutral'}
            iconName='refresh'
            isLeftIcon
            onClickButton={{
              onClick: resetFilter,
            }}
          />
        )}
      </Stack>
    </div>
  );
}

export default Filters;
