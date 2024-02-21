import { AvatarGroup, Drawer, Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CloseJobButton, LoaderSvg } from '@/devlink';
import {
  Breadcrum,
  ButtonWithShadow,
  PageLayout,
  PanelDetail,
  PanelDetailTopRight,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewPanel } from '@/src/context/InterviewPanel/InterviewPanelProvider';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import { StateAvailibility } from './availability.types';
import AvailabilityBar from './AvailabilityBar';
import PanelRow from './PanelRow';
import SideDrawer from './RequestConfirmSideDrawer';
import {
  resetState,
  setInterviewers,
  setIsisCalenderLoading,
  setIsisInitialising,
  setTimeSlot,
  useAvailableStore,
  useSyncInterviewersCalender,
} from './store';
import { handleDelete } from './utils';
import CreateDialog from '../Panels/CreateDialog';
import {
  setEditPanel,
  setInterviewPanels,
  setIsCreateDialogOpen,
  setPanelName,
  setSelectedUsers,
  useSchedulingStore,
} from '../Panels/store';
import MuiAvatar from '../../Common/MuiAvatar';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';

const Availability = () => {
  const { loading: isInterviewPanelLoading } = useInterviewPanel();
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const { initialiseAvailabilities } = useSyncInterviewersCalender();
  const { members } = useAuthDetails();
  const panelName = useSchedulingStore((state) => state.panelName);
  const isInitialising = useAvailableStore((state) => state.isInitialising);
  const dateRangeView = useAvailableStore((state) => state.dateRangeView);
  const timeRange = useAvailableStore((state) => state.timeRange);

  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);

  const [popupEl, setPopupEl] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (router.isReady && router.query.panel_id && !isInterviewPanelLoading) {
      (async () => {
        try {
          setIsisInitialising(true);
          const panel = interviewPanels.find(
            (p) => p.id === router.query.panel_id,
          );

          const activeDuration =
            (panel.duration_available as any)?.activeDuration ?? 30;
          setTimeSlot(activeDuration);
          setPanelName(panel.name);
          setEditPanel(panel);
          setSelectedUsers(
            members.filter((m) =>
              panel.relations.map((r) => r.user_id).includes(m.user_id),
            ),
          );
          const newInterviewers: StateAvailibility['interviewers'] =
            panel.relations.map((t) => {
              const member = members.find((m) => m.user_id === t.user_id);
              return {
                interviewerName: [member?.first_name, member?.last_name]
                  .filter(Boolean)
                  .join(' '),
                interviewerId: member?.user_id,
                profileImg: member?.profile_image ?? '',
                slots: [],
                email: member.email,
                isMailConnected: true,
              };
            });
          setInterviewers(newInterviewers);
          await initialiseAvailabilities(
            newInterviewers,
            activeDuration,
            dateRangeView,
            timeRange,
          );
        } catch (err) {
          // console.log(err);
          toast.error(API_FAIL_MSG);
        } finally {
          setIsisInitialising(false);
          setIsisCalenderLoading(false);
        }
      })();
    }
    return () => {
      resetState();
    };
  }, [router.isReady, router.query, isInterviewPanelLoading]);

  const deleteHandler = async () => {
    const res = await handleDelete(router.query.panel_id);
    if (res) {
      setInterviewPanels(
        interviewPanels.filter((p) => p.id !== router.query.panel_id),
      );
      router.push(pageRoutes.SCHEDULINGPANEL);
    }
  };

  return (
    <>
      {
        <>
          <PageLayout
            slotTopbarLeft={
              <>
                <Breadcrum
                  isLink
                  textName='Scheduler'
                  onClickLink={{
                    onClick: () => {
                      router.push(pageRoutes.SCHEDULING);
                    },
                  }}
                />
                <Breadcrum
                  isLink
                  showArrow
                  textName='Interview Panel'
                  onClickLink={{
                    onClick: () => {
                      router.push(pageRoutes.SCHEDULINGPANEL);
                    },
                  }}
                />
                <Breadcrum showArrow textName={panelName} />
              </>
            }
            slotBody={
              <>
                <PanelDetail
                  slotPanelDetail={
                    <>
                      <AvailabilityBar />

                      <>
                        {isInitialising ? (
                          <Stack
                            direction={'row'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            width={'100vw'}
                            height={'75vh'}
                          >
                            <LoaderSvg />
                          </Stack>
                        ) : (
                          <PanelRow />
                        )}
                      </>
                    </>
                  }
                />
              </>
            }
            slotTopbarRight={
              <>
                <PanelDetailTopRight
                  onClickEditPanel={{
                    onClick: () => {
                      setIsCreateDialogOpen('edit');
                    },
                  }}
                  slotThreeDots={
                    <>
                      <CloseJobButton
                        onClickClose={{
                          onClick: (e) => {
                            setPopupEl(e.currentTarget);
                          },
                        }}
                      />
                    </>
                  }
                />
              </>
            }
          />
          <CreateDialog />
          <Drawer
            open={openSideDrawer}
            anchor='right'
            onClose={() => setOpenSideDrawer(false)}
          >
            <SideDrawer onClose={() => setOpenSideDrawer(false)} />
          </Drawer>
          <Popover
            open={Boolean(popupEl)}
            anchorEl={popupEl}
            onClose={() => {
              setPopupEl(null);
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{
              // mt: 2,
              '& .MuiPaper-root': {
                border: 'none !important',
                overflow: 'visible !important',
              },
            }}
          >
            <ButtonWithShadow
              onClickButton={{
                onClick: () => {
                  deleteHandler();
                },
              }}
            />
          </Popover>
        </>
      }
    </>
  );
};

export default Availability;

export const InterviewerGroup = ({
  profileUrls,
}: {
  profileUrls: { name: string; url: string }[];
}) => {
  return (
    <AvatarGroup
      sx={{
        justifyContent: 'flex-end',
        '& .MuiAvatar-root': {
          width: '24px',
          height: '24px',
          fontSize: '12px',
        },
      }}
      total={profileUrls.length}
    >
      {profileUrls.slice(0, 3).map((rel) => {
        return (
          <MuiAvatar
            key={rel.url}
            src={rel.url}
            level={rel.name}
            variant='circular'
            height='24px'
            width='24px'
            fontSize='8px'
          />
        );
      })}
    </AvatarGroup>
  );
};
