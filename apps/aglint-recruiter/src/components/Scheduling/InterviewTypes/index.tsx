import { AvatarGroup, Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { EmptyState } from '@/devlink2/EmptyState';
import { InterviewModuleCard } from '@/devlink2/InterviewModuleCard';
import { InterviewModuleTable } from '@/devlink2/InterviewModuleTable';
import { PageLayout } from '@/devlink2/PageLayout';
import { TaskSwitchButton } from '@/devlink3/TaskSwitchButton';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';

import Icon from '../../Common/Icons/Icon';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import SearchField from '../../Common/SearchField/SearchField';
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
      <PageLayout
        slotTopbarRight={
          checkPermissions(['interview_types']) && (
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <ButtonSolid
                isRightIcon={false}
                isLeftIcon={true}
                iconName={'add'}
                size={2}
                textButton={'Interview Type'}
                onClickButton={{
                  onClick: () => {
                    setIsCreateDialogOpen(true);
                  },
                }}
              />
            </Stack>
          )
        }
        slotTopbarLeft={<Breadcrum textName={'Interview Types'} />}
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
                  <Stack
                    direction={'row'}
                    width={'100%'}
                    justifyContent={'space-between'}
                  >
                    <Stack direction={'row'} gap={2}>
                      <SearchField
                        value={textSearch}
                        onClear={() => setTextSearch('')}
                        placeholder='Search by name.'
                        onChange={(e) => {
                          setTextSearch(e.target.value);
                        }}
                      />
                      <FilterDepartment />
                      <FilterCreatedBy />
                      {(departments.length > 0 || createdBy.length > 0) && (
                        <ButtonGhost
                          textButton='Reset All'
                          iconName='refresh'
                          size={2}
                          onClickButton={{
                            onClick: filterReset,
                          }}
                          isLeftIcon
                          color={'neutral'}
                        />
                      )}
                    </Stack>{' '}
                    <TaskSwitchButton
                      isIconVisible={false}
                      isJobCandActive={!showArchive}
                      isListActive={showArchive}
                      onClickJobCand={{
                        onClick: () => {
                          setShowArchive(false);
                        },
                      }}
                      onClickList={{
                        onClick: () => {
                          setShowArchive(true);
                        },
                      }}
                      textFirst={'Active'}
                      textSecond={'Archived'}
                    />
                  </Stack>
                }
                slotInterviewModuleCard={
                  <Stack width={'100%'} height={'calc(100vh - 112px)'}>
                    {filterModules.length > 0 ? (
                      <>
                        {filterModules.map((mod) => {
                          return (
                            <InterviewModuleCard
                              textDepartment={mod.department_name}
                              isArchivedIconVisible={mod.is_archived}
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
                              textModuleName={mod.name}
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
                                    <ButtonGhost
                                      textButton='Add members'
                                      size={1}
                                      iconName='add'
                                      isLeftIcon
                                      onClickButton={{
                                        onClick: () => {
                                          setInitalOpen('qualified');
                                        },
                                      }}
                                    />
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
