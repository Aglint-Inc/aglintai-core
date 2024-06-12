import { AvatarGroup, InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { EmptyState } from '@/devlink2/EmptyState';
import { InterviewModuleCard } from '@/devlink2/InterviewModuleCard';
import { InterviewModuleTable } from '@/devlink2/InterviewModuleTable';
import { ArchivedButton } from '@/devlink3/ArchivedButton';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';

import Icon from '../../Common/Icons/Icon';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import UITextField from '../../Common/UITextField';
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
              <Stack direction={'row'} gap={2}>
                <UITextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Icon variant='Search' width='14' height='14' />
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Search by Name'
                  onChange={(e) => {
                    setTextSearch(e.target.value);
                  }}
                  value={textSearch}
                  width={'250px'}
                />
                <FilterDepartment />
                <FilterCreatedBy />
              </Stack>
            }
            slotInterviewModuleCard={
              <Stack width={'100%'} height={'calc(100vh - 112px)'}>
                {filterModules.length > 0 ? (
                  <>
                    {filterModules.map((mod) => {
                      return (
                        <InterviewModuleCard
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
                            <AvatarGroup total={mod.users.length}>
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

                    <ArchivedButton
                      isHideVisible={archives && showArchive}
                      isShowVisible={archives && !showArchive}
                      onClickHide={{
                        onClick: () => {
                          setShowArchive((prev) => !prev);
                        },
                      }}
                      onClickShow={{
                        onClick: () => {
                          setShowArchive((prev) => !prev);
                        },
                      }}
                    />
                  </>
                ) : (
                  <Stack>
                    <EmptyState
                      slotIcons={
                        <Icon height='60' width='80' variant='EmptyState' />
                      }
                      textDescription={'No interview types found.'}
                    />
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
