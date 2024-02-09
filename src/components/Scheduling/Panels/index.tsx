import { AvatarGroup, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  Breadcrum,
  PanelCard,
  PanelDashboard,
  PanelDashboardTopRight,
  SchedulerLayout,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { pageRoutes } from '@/src/utils/pageRouting';

import CreateDialog from './CreateDialog';
import {
  setEditPanel,
  setInterviewPanels,
  setIsCreateDialogOpen,
  setPanelName,
  setSelectedUsers,
  useSchedulingStore,
} from './store';
import { fetchInterviewPanel } from './utils';
import MuiAvatar from '../../Common/MuiAvatar';

function Panels() {
  const router = useRouter();

  const { recruiter, members } = useAuthDetails();
  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);

  useEffect(() => {
    if (recruiter?.id) {
      initialFetch();
    }
    return () => {
      setInterviewPanels([]);
    };
  }, [recruiter?.id]);

  const initialFetch = async () => {
    const res = await fetchInterviewPanel(recruiter.id);
    if (res) {
      setInterviewPanels(res);
    }
  };

  return (
    <>
      <CreateDialog />
      <SchedulerLayout
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
          <PanelDashboard
            isPanelEmtpty={interviewPanels.length === 0}
            slotPanelCard={interviewPanels.map((panel) => {
              return (
                <Stack
                  key={panel.id}
                  onClick={() => {
                    router.push(pageRoutes.SCHEDULINGPANEL + `/${panel.id}`);
                    // setIsCreateDialogOpen('edit');
                    setPanelName(panel.name);
                    setSelectedUsers(
                      members.filter((member) =>
                        panel.relations
                          .map((rel) => rel.user_id)
                          .includes(member.user_id),
                      ),
                    );
                    setEditPanel(panel);
                  }}
                >
                  <PanelCard
                    textPanelName={panel.name}
                    slotAvatarGroup={
                      <AvatarGroup total={panel.relations.length}>
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
