import { AvatarGroup, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import {
  Breadcrum,
  PageLayout,
  PanelCard,
  PanelDashboard,
  PanelDashboardTopRight,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewPanel } from '@/src/context/InterviewPanel/InterviewPanelProvider';
import { pageRoutes } from '@/src/utils/pageRouting';

import CreateDialog from './CreateDialog';
import { setIsCreateDialogOpen, useSchedulingStore } from './store';
import MuiAvatar from '../../Common/MuiAvatar';

function Panels() {
  const router = useRouter();
  const { members } = useAuthDetails();
  const { loading } = useInterviewPanel();
  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);

  return (
    <>
      <CreateDialog />
      <PageLayout
        slotTopbarLeft={
          <>
            <Breadcrum
              isLink
              onClickLink={{
                onClick: () => {
                  router.push(pageRoutes.SCHEDULING);
                },
              }}
            />
            <Breadcrum showArrow textName={'Interview Panel'} />
          </>
        }
        slotBody={
          !loading && (
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
          )
        }
        slotTopbarRight={
          <PanelDashboardTopRight
            onClickCreatePanel={{
              onClick: () => {
                setIsCreateDialogOpen('create');
              },
            }}
          />
        }
      />
    </>
  );
}

export default Panels;
