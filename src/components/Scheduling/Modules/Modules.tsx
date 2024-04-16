import { AvatarGroup, InputAdornment, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  EmptyState,
  InterviewModuleCard,
  InterviewModuleTable,
} from '@/devlink2';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';

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

export function Modules() {
  const router = useRouter();
  const textSearch = useFilterModuleStore((state) => state.textSearch);
  const department = useFilterModuleStore((state) => state.department);
  const createdBy = useFilterModuleStore((state) => state.created_by);
  const { data: allModules, isLoading, isFetching } = useAllInterviewModules();

  const filterModules = allModules.filter((mod) => {
    return (
      (!department || mod.interview_modules.department === department) &&
      (createdBy.length == 0 ||
        createdBy.includes(mod.interview_modules.created_by)) &&
      (!textSearch ||
        mod.interview_modules.name
          .toLowerCase()
          .includes(textSearch.toLowerCase()))
    );
  });

  useEffect(() => {
    return () => {
      resetModulesStore();
    };
  }, []);

  return (
    <>
      <CreateModuleDialog />
      {isLoading || (isFetching && allModules.length == 0) ? (
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
                        <Icon variant='JobSearch' height='14' />
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Search by name'
                  onChange={(e) => {
                    setTextSearch(e.target.value);
                  }}
                  value={textSearch}
                  borderRadius={10}
                />
                <FilterDepartment />
                <FilterCreatedBy />
              </Stack>
            }
            slotInterviewModuleCard={
              <Stack width={'100%'} height={'calc(100vh - 112px)'}>
                {filterModules.length > 0 ? (
                  filterModules.map((mod) => {
                    return (
                      <InterviewModuleCard
                        key={mod.interview_modules.id}
                        isObjectiveVisible={Boolean(
                          mod.interview_modules.description,
                        )}
                        onClickCard={{
                          onClick: () => {
                            router.push(
                              pageRoutes.INTERVIEWMODULE +
                                '/members' +
                                `/${mod.interview_modules.id}`,
                            );
                          },
                        }}
                        textObjective={mod.interview_modules.description}
                        textModuleName={mod.interview_modules.name}
                        slotMemberPic={
                          <AvatarGroup
                            total={mod.users.length}
                            sx={{
                              '& .MuiAvatar-root': {
                                width: '26px',
                                height: '26px',
                                fontSize: '12px',
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
                                  variant='circular'
                                  height='26px'
                                  width='26px'
                                  fontSize='12px'
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
                  })
                ) : (
                  <Stack>
                    <EmptyState
                      slotIcons={
                        <Icon height='60' width='80' variant='EmptyState' />
                      }
                      textDescription={'No Interview Types'}
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
