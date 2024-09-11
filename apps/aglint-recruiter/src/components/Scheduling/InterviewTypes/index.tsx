import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@components/ui/breadcrumb';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { GlobalBadge } from '@devlink/GlobalBadge';
import { EmptyState } from '@devlink2/EmptyState';
import { InterviewModuleCard } from '@devlink2/InterviewModuleCard';
import { InterviewModuleTable } from '@devlink2/InterviewModuleTable';
import { AvatarGroup, Box, Stack, Typography } from '@mui/material';
import { Plus, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { UIPageLayout } from '@/components/Common/UIPageLayout';
import UITextField from '@/components/Common/UITextField';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';

import Icon from '../../Common/Icons/Icon';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
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
  const router = useRouter();
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
            <Stack sx={{ height: '100%' }}>
              <Loader />
            </Stack>
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
                  <Stack width={'100%'} height={'calc(100vh - 112px)'}>
                    {filterModules.length > 0 ? (
                      <>
                        {filterModules.map((mod) => {
                          return (
                            <InterviewModuleCard
                              textDepartment={mod.department_name}
                              // isArchivedIconVisible={mod.is_archived}
                              key={mod.id}
                              isObjectiveVisible={Boolean(mod.description)}
                              onClickCard={{
                                onClick: () => {
                                  router.push(
                                    ROUTES[
                                      '/scheduling/interview-types/[type_id]'
                                    ]({ type_id: mod.id }),
                                  );
                                },
                              }}
                              textObjective={mod.description}
                              textModuleName={
                                <Stack direction={'row'} spacing={2}>
                                  <Typography>{mod.name}</Typography>
                                  {mod.is_archived && (
                                    <GlobalBadge
                                      textBadge='Archived'
                                      color={'warning'}
                                    />
                                  )}
                                </Stack>
                              }
                              slotMemberPic={
                                <>
                                  {/* interview types */}
                                  {mod.users.length ? (
                                    <AvatarGroup
                                      variant='rounded'
                                      total={mod.users.length}
                                      sx={{
                                        '& .MuiAvatar-root': {
                                          width: 'var(--space-5)',
                                          height: 'var(--space-5)',
                                          fontSize: 12,
                                        },
                                      }}
                                    >
                                      {mod.users.slice(0, 5).map((user) => {
                                        return (
                                          <MuiAvatar
                                            key={user.user_id}
                                            src={user.profile_image}
                                            level={getFullName(
                                              user.first_name,
                                              user.last_name,
                                            )}
                                            variant='rounded-small'
                                          />
                                        );
                                      })}
                                    </AvatarGroup>
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
                              textMembersCount={
                                mod.users.length !== 0
                                  ? `${mod.users.length} Members`
                                  : ''
                              }
                              textCancelledSchedules={
                                mod.canceled_meeting_count
                              }
                              textCompletedSchedules={
                                mod.completed_meeting_count
                              }
                              textUpcomingSchedules={mod.upcoming_meeting_count}
                              isCompletedScheduleEmpty={
                                mod.completed_meeting_count === 0
                              }
                              isCompletedScheduleVisible={
                                mod.completed_meeting_count > 0
                              }
                              isUpcomingScheduleEmpty={
                                mod.upcoming_meeting_count === 0
                              }
                              isUpcomingScheduleVisible={
                                mod.upcoming_meeting_count > 0
                              }
                            />
                          );
                        })}
                      </>
                    ) : (
                      <Stack p={2}>
                        <Box
                          sx={{
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-2)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: 'calc(100vh - 166px)',
                            backgroundColor: 'var(--neutral-2)', // replace with your desired background color
                          }}
                        >
                          <EmptyState
                            slotIcons={
                              <Icon
                                height='60'
                                width='80'
                                variant='EmptyState'
                              />
                            }
                            textDescription={'No interview types found.'}
                          />
                        </Box>
                      </Stack>
                    )}
                  </Stack>
                }
              />
            </>
          )
        }
      />
    </>
  );
}
