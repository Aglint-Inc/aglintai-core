import { type Dispatch, type SetStateAction } from 'react';

import FilterHeader from '@/components/Common/FilterHeader';
import { UIButton } from '@/components/Common/UIButton';
import UITextField from '@/components/Common/UITextField';
import { useAllDepartments } from '@/queries/departments';

export const Header = ({
  isFilterApplied,
  searchText,
  selectedDepartments,
  setSearchText,
  setDepartments,
}: HeaderProps) => {
  const { data: departments } = useAllDepartments();

  const departmentList = departments?.length
    ? departments.map((dep) => ({ label: dep.name, id: dep.id.toString() }))
    : [];

  const resetAllFilter = () => {
    setDepartments([]);
    setSearchText('');
  };

  return (
    <div className='mb-6 flex justify-between items-center'>
      <UITextField
        placeholder='Search interviewers...'
        fieldSize='medium'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='w-[250px]'
      />
      <div className='flex items-center gap-2'>
        {isFilterApplied ? (
          <UIButton size='sm' onClick={resetAllFilter}>
            Reset all
          </UIButton>
        ) : (
          <></>
        )}
        <FilterHeader
          filters={[
            {
              type: 'filter',
              name: 'Department',
              value: selectedDepartments,
              options: departmentList,
              multiSelect: true,
              setValue: (value) => {
                setDepartments(value);
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

type HeaderProps = {
  isFilterApplied: boolean;
  searchText: string;
  selectedDepartments: string[];
  setSearchText: Dispatch<SetStateAction<string>>;
  setDepartments: Dispatch<SetStateAction<string[]>>;
};
