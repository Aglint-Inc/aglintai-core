import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@components/ui/breadcrumb';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { GlobalBadge } from '@devlink/GlobalBadge';
import { FileQuestion, Plus, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { UIPageLayout } from '@/components/Common/UIPageLayout';
import UITextField from '@/components/Common/UITextField';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getFullName } from '@/utils/jsonResume';

import Loader from '../../Common/Loader';
import { InterviewModuleCard } from './_common/InterviewModuleCard';
import { InterviewModuleTable } from './_common/InterviewModuleTable';
import CreateModuleDialog from './CreateModuleDialog';
import { setTextSearch, useFilterModuleStore } from './filter-store';
import FilterCreatedBy from './Filters/FilterCreatedBy';
import FilterDepartment from './Filters/FilterDepartment';
import { useAllInterviewModules } from './queries/hooks';
import {
  resetModulesStore,
  setInitalOpen,
  setIsCreateDialogOpen,
} from './store';
import { customSortModules } from './utils';

export function InterviewTypes() {
  const { checkPermissions } = useRolesAndPermissions();
  const textSearch = useFilterModuleStore((state) => state.textSearch);
  const departments = useFilterModuleStore((state) => state.departments);
  const createdBy = useFilterModuleStore((state) => state.created_by);
  const filterReset = useFilterModuleStore((state) => state.reset);
  const { data: allModules, isLoading, isFetching } = useAllInterviewModules();
  const [showArchive, setShowArchive] = useState(false);
  const [archives, setArchives] = useState(false);

  const filterModules = allModules
    ?.filter((mod) => {
      !archives && setArchives(true);
      return (
        (departments.length === 0 || departments.includes(mod.department_id)) &&
        (createdBy.length == 0 || createdBy.includes(mod.created_by)) &&
        (!textSearch ||
          mod.name.toLowerCase().includes(textSearch.toLowerCase())) &&
        (showArchive ? mod.is_archived : mod.is_archived !== true)
      );
    })
    .sort(customSortModules);

  useEffect(() => {
    return () => {
      resetModulesStore();
    };
  }, []);

  return (
    <>
      <UIPageLayout
        slotTopbarRight={
          checkPermissions(['interview_types']) && (
            <UIButton
              variant='default'
              size='sm'
              onClick={() => {
                setIsCreateDialogOpen(true);
              }}
              leftIcon={<Plus />}
            >
              Interview Type
            </UIButton>
          )
        }
        slotTopbarLeft={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Interview Types</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        slotBody={
          isLoading || isFetching ? (
            <div className='flex flex-col h-full'>
              <Loader />
            </div>
          ) : (
            <>
              <CreateModuleDialog />

              <InterviewModuleTable
                slotFilter={
                  <div className='flex flex-row gap-4 justify-between items-center w-full h-8'>
                    <div className='flex flex-row gap-4 justify-center items-center h-full'>
                      <UITextField
                        value={textSearch}
                        placeholder='Search by name.'
                        onChange={(e) => {
                          setTextSearch(e.target.value);
                        }}
                        fieldSize={'medium'}
                      />
                      <FilterDepartment />
                      <FilterCreatedBy />
                      {(departments.length > 0 || createdBy.length > 0) && (
                        <UIButton
                          variant='ghost'
                          size='sm'
                          onClick={filterReset}
                          leftIcon={<RotateCcw />}
                        >
                          Reset All
                        </UIButton>
                      )}
                    </div>
                    <Tabs
                      defaultValue={showArchive ? 'archived' : 'active'}
                      onValueChange={(value) =>
                        setShowArchive(value === 'archived')
                      }
                    >
                      <TabsList
                        className='flex gap-2'
                        style={{ height: '32px' }}
                      >
                        <TabsTrigger
                          value='active'
                          style={{
                            height: '24px',
                            padding: '2px 8px',
                          }}
                        >
                          Active
                        </TabsTrigger>
                        <TabsTrigger
                          value='archived'
                          style={{
                            height: '24px',
                            padding: '2px 8px',
                          }}
                        >
                          Archived
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                }
                slotInterviewModuleCard={
                  <div className='w-full h-[calc(100vh-112px)]'>
                    {filterModules.length > 0 ? (
                      <>
                        {filterModules.map((mod) => {
                          return (
                            <InterviewModuleCard
                              textDepartment={mod.department_name}
                              key={mod.id}
                              navLink={`/scheduling/interview-types/${mod.id}`}
                              textCancelledSchedules={
                                mod.canceled_meeting_count
                              }
                              textCompletedSchedules={
                                mod.completed_meeting_count
                              }
                              textUpcomingSchedules={mod.upcoming_meeting_count}
                              textModuleName={
                                <div className='flex flex-row space-x-2'>
                                  {mod.name}
                                  {mod.is_archived && (
                                    <GlobalBadge
                                      textBadge='Archived'
                                      color={'warning'}
                                    />
                                  )}
                                </div>
                              }
                              slotMemberPic={
                                <>
                                  {mod.users.length ? (
                                    <>
                                      {mod.users.slice(0, 5).map((user) => (
                                        <Avatar key={user.user_id}>
                                          <AvatarImage
                                            src={user.profile_image}
                                            alt={getFullName(
                                              user.first_name,
                                              user.last_name,
                                            )}
                                          />
                                          <AvatarFallback>{`${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`}</AvatarFallback>
                                        </Avatar>
                                      ))}
                                      {mod.users.length > 5 && (
                                        <Avatar>
                                          <AvatarFallback>
                                            +{mod.users.length - 5}
                                          </AvatarFallback>
                                        </Avatar>
                                      )}
                                    </>
                                  ) : (
                                    <UIButton
                                      variant='ghost'
                                      size='sm'
                                      leftIcon={<Plus />}
                                      onClick={() => {
                                        setInitalOpen('qualified');
                                      }}
                                    >
                                      Add Member
                                    </UIButton>
                                  )}
                                </>
                              }
                            />
                          );
                        })}
                      </>
                    ) : (
                      <div className='p-2'>
                        <div className='p-4 rounded-md flex justify-center items-center min-h-[calc(100vh-166px)] bg-neutral-200'>
                          <div className='flex flex-col items-center justify-center space-y-4'>
                            <FileQuestion className='h-16 w-20 text-gray-400' />
                            <p className='text-sm text-gray-500'>
                              No interview types found.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                }
              />
            </>
          )
        }
      />
    </>
  );
}
