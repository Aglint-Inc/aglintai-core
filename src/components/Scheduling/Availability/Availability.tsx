/* eslint-disable no-unused-vars */
import { AvatarGroup, Drawer, Slider, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoaderSvg } from '@/devlink';
import {
  Breadcrum,
  GroupedSlots,
  PageLayout,
  PanelDetail,
  PanelDetailTitle,
  PanelDetailTopRight,
  RequestConfirmationSidebar,
} from '@/devlink2';
import { TimeRangeAvailable } from '@/devlink2/TimeRangeAvailable';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewPanel } from '@/src/context/InterviewPanel/InterviewPanelProvider';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import {
  AvalabilitySlotType,
  InterviewerAvailabliity,
  StateAvailibility,
} from './availability.types';
import CalenderHeaderRow from './CalenderHeaderRow';
import PanelRow from './PanelRow';
import SideDrawer from './RequestConfirmSideDrawer';
import {
  resetState,
  setDateRangeView,
  setInitInterviewers,
  setIsLoading,
  uncheckAllSlots,
  useAvailableStore,
} from './store';
import {
  countSlotStatus,
  DAYS_LENGTH,
  getAvailability,
  mergeInterviewerEvents,
} from './utils';
import CreateDialog from '../Panels/CreateDialog';
import {
  setIsCreateDialogOpen,
  setPanelName,
  setSelectedUsers,
  useSchedulingStore,
} from '../Panels/store';
import MuiAvatar from '../../Common/MuiAvatar';
import { API_FAIL_MSG } from '../../JobsDashboard/JobPostCreateUpdate/utils';

const Availability = () => {
  const { loading } = useInterviewPanel();
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const { members } = useAuthDetails();
  const panelName = useSchedulingStore((state) => state.panelName);
  const isloading = useAvailableStore((state) => state.isloading);
  const timeSlot = useAvailableStore((state) => state.timeSlot);
  const dateRangeView = useAvailableStore((state) => state.dateRangeView);
  const router = useRouter();
  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);
  const checkedInterSlots = useAvailableStore(
    (state) => state.checkedInterSlots,
  );
  useEffect(() => {
    if (router.isReady && router.query.panel_id && !loading) {
      (async () => {
        try {
          setIsLoading(true);
          const panel = interviewPanels.find(
            (p) => p.id === router.query.panel_id,
          );
          setPanelName(panel.name);
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
                isMailConnected: Boolean(member?.schedule_auth),
                slots: [],
              };
            });

          let interviewersPromises = newInterviewers.map(async (interW) => {
            if (interW.slots.length === 0) {
              let intAval: InterviewerAvailabliity = {
                timeDuration: timeSlot,
                availability: await getAvailability(
                  new Date().toISOString(),
                  interW.interviewerId,
                  timeSlot,
                ),
                cntConfirmed: 0,
                cntRequested: 0,
              };
              interW.slots = [intAval];

              intAval.cntConfirmed = countSlotStatus(
                interW.slots,
                'confirmed',
                timeSlot,
              );
              intAval.cntRequested = countSlotStatus(
                interW.slots,
                'requested',
                timeSlot,
              );
            }
          });
          await Promise.all(interviewersPromises);
          // console.log(newInterviewers);
          setInitInterviewers(newInterviewers);
        } catch (err) {
          // console.log(err);
          toast.error(API_FAIL_MSG);
        } finally {
          setIsLoading(false);
        }
      })();
    }
    return () => {
      resetState();
    };
  }, [router.isReady, router.query, loading]);

  const calenderLabel = `${dayjs(dateRangeView.startDate).format(
    'DD MMMM',
  )} - ${dayjs(dateRangeView.endDate).format('DD MMMM')}`;

  const handleDeselect = () => {
    uncheckAllSlots();
  };

  let countCheckedSlot = checkedInterSlots.reduce((tot, curr) => {
    return tot + curr.countCheckedSlots;
  }, 0);

  let profileUrls = checkedInterSlots
    .filter((i) => i.countCheckedSlots > 0)
    .map((i) => ({ name: i.interviewerName, url: i.profileImg }));

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
                      <PanelDetailTitle
                        slotDurationInput={<>dropdown</>}
                        textYearMonth={calenderLabel}
                        onClickNext={{
                          onClick: () => {
                            setDateRangeView({
                              startDate: dayjs(dateRangeView.endDate)
                                .add(1, 'day')
                                .toDate(),
                              endDate: dayjs(dateRangeView.endDate)
                                .add(DAYS_LENGTH + 1, 'day')
                                .toDate(),
                            });
                          },
                        }}
                        onClickPrev={{
                          onClick: () => {
                            setDateRangeView({
                              startDate: dayjs(dateRangeView.startDate)
                                .subtract(DAYS_LENGTH + 1, 'day')
                                .toDate(),
                              endDate: dayjs(dateRangeView.startDate)
                                .subtract(1, 'day')
                                .toDate(),
                            });
                          },
                        }}
                        isSlotSelected={countCheckedSlot > 0}
                        slotNumber={countCheckedSlot}
                        onClickConfirm={{
                          onClick: () => {
                            setOpenSideDrawer(true);
                          },
                        }}
                        onClickDeselect={{
                          onClick: () => {
                            handleDeselect();
                          },
                        }}
                        slotSelectedAvatarGroup={
                          <>
                            <InterviewerGroup profileUrls={profileUrls} />
                          </>
                        }
                      />
                      <>
                        <CalenderHeaderRow />
                        {isloading ? (
                          <Stack
                            direction={'row'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            width={'100vw'}
                            height={'60vh'}
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
