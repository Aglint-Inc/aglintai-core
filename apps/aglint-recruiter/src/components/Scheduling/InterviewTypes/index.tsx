import { AvatarGroup, Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { EmptyState } from '@/devlink2/EmptyState';
import { InterviewModuleCard } from '@/devlink2/InterviewModuleCard';
import { InterviewModuleTable } from '@/devlink2/InterviewModuleTable';
import { TaskSwitchButton } from '@/devlink3/TaskSwitchButton';
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
import { resetModulesStore } from './store';
import { customSortModules } from './utils';

export function Modules() {
  const router = useRouter();
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
        (departments.length === 0 ||
          departments.includes(mod.interview_modules.department)) &&
        (createdBy.length == 0 ||
          createdBy.includes(mod.interview_modules.created_by)) &&
        (!textSearch ||
          mod.interview_modules.name
            .toLowerCase()
            .includes(textSearch.toLowerCase())) &&
        (showArchive || !mod.interview_modules.is_archived)
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
      <CreateModuleDialog />
      {isLoading || isFetching ? (
        <Stack sx={{ height: '100%' }}>
          <Loader />
        </Stack>
      ) : (
        <>
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
                  isJobCandActive={showArchive}
                  isListActive={!showArchive}
                  onClickJobCand={{
                    onClick: () => {
                      setShowArchive(true);
                    },
                  }}
                  onClickList={{
                    onClick: () => {
                      setShowArchive(false);
                    },
                  }}
                  textFirst={'Show Archived'}
                  textSecond={'Hide Archived'}
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
                          textDepartment={mod.interview_modules.department}
                          isArchivedIconVisible={
                            mod.interview_modules.is_archived
                          }
                          key={mod.interview_modules.id}
                          isObjectiveVisible={Boolean(
                            mod.interview_modules.description,
                          )}
                          onClickCard={{
                            onClick: () => {
                              router.push(
                                ROUTES[
                                  '/scheduling/module/members/[module_id]'
                                ]({ module_id: mod.interview_modules.id }),
                              );
                            },
                          }}
                          textObjective={mod.interview_modules.description}
                          textModuleName={mod.interview_modules.name}
                          slotMemberPic={
                            <AvatarGroup
                              variant='rounded'
                              total={mod.users.length}
                              sx={{
                                '& .MuiAvatar-root': {
                                  width: 28,
                                  height: 28,
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
                          }
                          textMembersCount={
                            mod.users.length !== 0
                              ? `${mod.users.length} Members`
                              : ''
                          }
                          textCancelledSchedules={mod.canceled_meeting_count}
                          textCompletedSchedules={mod.completed_meeting_count}
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
                          <Icon height='60' width='80' variant='EmptyState' />
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
      )}
    </>
  );
}
