import { AvatarGroup, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { InterviewModuleCard, InterviewModuleTable } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useScheduling } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { pageRoutes } from '@/src/utils/pageRouting';

import CreateDialog from './CreateDialog';
import { useSchedulingStore } from './store';
import MuiAvatar from '../../Common/MuiAvatar';

function Modules() {
  const router = useRouter();
  const { members } = useAuthDetails();
  const { loading } = useScheduling();
  const interviewModules = useSchedulingStore(
    (state) => state.interviewModules
  );

  return (
    <>
      <CreateDialog />
      {!loading && (
        <>
          <InterviewModuleTable
            slotInterviewModuleCard={interviewModules.map((module) => {
              return (
                <Stack
                  key={module.id}
                  onClick={() => {
                    router.push(
                      pageRoutes.INTERVIEWMODULE + '/members' + `/${module.id}`
                    );
                  }}
                >
                  <InterviewModuleCard
                    textModuleName={module.name}
                    slotMemberPic={
                      <AvatarGroup
                        total={module.relations.length}
                        sx={{
                          '& .MuiAvatar-root': {
                            width: '26px',
                            height: '26px',
                            fontSize: '12px'
                          }
                        }}
                      >
                        {module.relations.slice(0, 5).map((rel) => {
                          const member = members.filter(
                            (member) => member.user_id === rel.user_id
                          )[0];
                          return (
                            <MuiAvatar
                              key={rel.id}
                              src={member?.profile_image}
                              level={member?.first_name}
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
                      module.relations.length !== 0
                        ? `${module.relations.length} Members`
                        : ''
                    }
                    textCompletedSchedules={''}
                    textUpcomingSchedules={''}
                    isCompletedScheduleEmpty={true}
                    isCompletedScheduleVisible={true}
                    isUpcomingScheduleEmpty={true}
                    isUpcomingScheduleVisible={true}
                  />
                </Stack>
              );
            })}
          />
        </>
      )}
    </>
  );
}

export default Modules;
