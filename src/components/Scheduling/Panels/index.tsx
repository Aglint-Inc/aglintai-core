import { AvatarGroup, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { PanelCard, PanelDashboard } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useScheduling } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { pageRoutes } from '@/src/utils/pageRouting';

import CreateDialog from './CreateDialog';
import { useSchedulingStore } from './store';
import MuiAvatar from '../../Common/MuiAvatar';

function Panels() {
  const router = useRouter();
  const { members } = useAuthDetails();
  const { loading } = useScheduling();
  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);

  return (
    <>
      <CreateDialog />
      {!loading && (
        <PanelDashboard
          isPanelEmtpty={interviewPanels.length === 0}
          slotPanelCard={interviewPanels.map((panel) => {
            return (
              <Stack
                key={panel.id}
                onClick={() => {
                  router.push(pageRoutes.SCHEDULINGPANEL + `/${panel.id}`);
                }}
              >
                <PanelCard
                  textPanelName={panel.name}
                  slotAvatarGroup={
                    <AvatarGroup
                      total={panel.relations.length}
                      sx={{
                        '& .MuiAvatar-root': {
                          width: '40px',
                          height: '40px',
                          fontSize: '16px',
                        },
                      }}
                    >
                      {panel.relations.slice(0, 5).map((rel) => {
                        const member = members.filter(
                          (member) => member.user_id === rel.user_id,
                        )[0];
                        return (
                          <MuiAvatar
                            key={rel.id}
                            src={member?.profile_image}
                            level={member?.first_name}
                            variant='circular'
                            height='40px'
                            width='40px'
                            fontSize='16px'
                          />
                        );
                      })}
                    </AvatarGroup>
                  }
                  textMemberCount={panel.relations.length}
                />
              </Stack>
            );
          })}
        />
      )}
    </>
  );
}

export default Panels;
