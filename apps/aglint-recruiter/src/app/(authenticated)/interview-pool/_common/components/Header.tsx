import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';

import { useAllInterviewModules } from '@/authenticated/hooks';
import FilterHeader from '@/components/Common/FilterHeader';
import { UIButton } from '@/components/Common/UIButton';
import UITextField from '@/components/Common/UITextField';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useAllDepartments } from '@/queries/departments';

import { setIsCreateDialogOpen } from '../../[pool]/_common/stores/store';
import { useHeaderProp } from '.';
import CreateModuleDialog from './CreateModuleDialog';

export const InterviewPoolHeader = () => {
  const {
    searchText,
    selectedDepartments,
    setDepartments,
    setSearchText,
    isFilterApplied,
    handleTabChange,
    activeTab,
  } = useHeaderProp();
  const { data: departments } = useAllDepartments();
  const { checkPermissions } = useRolesAndPermissions();

  const departmentList = departments?.length
    ? departments.map((dep) => ({ label: dep.name, id: dep.id.toString() }))
    : [];

  const resetAllFilter = () => {
    setDepartments([]);
    setSearchText('');
  };

  const { data: allModules } = useAllInterviewModules();

  const archivedLength =
    allModules?.length > 0
      ? allModules?.filter((mod) => mod.is_archived).length
      : 0;
  return (
    <>
      <CreateModuleDialog />
      <div className='mb-6 flex items-center justify-between'>
        <UITextField
          placeholder='Search pool name...'
          fieldSize='medium'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='w-[250px]'
        />
        <div className='flex items-center gap-2'>
          {isFilterApplied && (
            <UIButton variant='ghost' size='sm' onClick={resetAllFilter}>
              Reset all
            </UIButton>
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

          {checkPermissions && checkPermissions(['interview_types']) && (
            <UIButton
              variant='default'
              onClick={() => {
                setIsCreateDialogOpen(true);
              }}
            >
              Create
            </UIButton>
          )}
          {archivedLength > 0 && (
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className='rounded-lg bg-gray-100 p-1'>
                <TabsTrigger
                  value='active'
                  className='data-[state=active]:bg-white data-[state=active]:shadow'
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value='archived'
                  className='data-[state=active]:bg-white data-[state=active]:shadow'
                >
                  Archived
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
};
