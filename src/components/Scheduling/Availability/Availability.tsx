/* eslint-disable no-unused-vars */
import { AvatarGroup, Drawer, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoaderSvg } from '@/devlink';
import {
  Breadcrum,
  PageLayout,
  PanelDetail,
  PanelDetailTitle,
  PanelDetailTopRight,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewPanel } from '@/src/context/InterviewPanel/InterviewPanelProvider';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import { StateAvailibility } from './availability.types';
import CalenderHeaderRow from './CalenderHeaderRow';
import PanelRow from './PanelRow';
import SideDrawer from './RequestConfirmSideDrawer';
import {
  resetState,
  setDateRangeView,
  setIsisCalenderLoading,
  setIsisInitialising,
  uncheckAllSlots,
  useAvailableStore,
  useSyncInterviewersCalender,
} from './store';
import TimeDurationDropDown from './TimeDurationDropDown';
import { countSlotStatus, DAYS_LENGTH, getAvailability } from './utils';
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
  const { loading: isInterviewPanelLoading } = useInterviewPanel();
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const { initCalenderAvails, handleSyncMonthifNeeded } =
    useSyncInterviewersCalender();

  const { members } = useAuthDetails();
  const panelName = useSchedulingStore((state) => state.panelName);
  const timeSlot = useAvailableStore((state) => state.timeSlot);
  const isInitialising = useAvailableStore((state) => state.isInitialising);
  const dateRangeView = useAvailableStore((state) => state.dateRangeView);
  const isCalenderLoading = useAvailableStore(
    (state) => state.isCalenderLoading,
  );
  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);
  const checkedInterSlots = useAvailableStore(
    (state) => state.checkedInterSlots,
  );
  const router = useRouter();
  useEffect(() => {
    if (router.isReady && router.query.panel_id && !isInterviewPanelLoading) {
      (async () => {
        try {
          setIsisInitialising(true);
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
          await initCalenderAvails(newInterviewers, timeSlot);
        } catch (err) {
          toast.error(API_FAIL_MSG);
        } finally {
          setIsisInitialising(false);
        }
      })();
    }
    return () => {
      resetState();
    };
  }, [router.isReady, router.query, isInterviewPanelLoading]);

  const handleClickNext = async () => {
    if (isCalenderLoading) return;
    try {
      let newDateRange: StateAvailibility['dateRangeView'] = {
        startDate: dayjs(dateRangeView.endDate).add(1, 'day').toDate(),
        endDate: dayjs(dateRangeView.endDate).add(DAYS_LENGTH, 'day').toDate(),
      };
      setDateRangeView(newDateRange);
      setIsisCalenderLoading(true);
      await handleSyncMonthifNeeded(newDateRange.endDate.toISOString());
    } catch (error) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsisCalenderLoading(false);
    }
  };

  const handleClickPrev = async () => {
    if (isCalenderLoading) return;
    try {
      let newDateRange: StateAvailibility['dateRangeView'] = {
        startDate: dayjs(dateRangeView.startDate)
          .subtract(DAYS_LENGTH, 'day')
          .toDate(),
        endDate: dayjs(dateRangeView.startDate).subtract(1, 'day').toDate(),
      };
      setDateRangeView(newDateRange);
      setIsisCalenderLoading(true);
      await handleSyncMonthifNeeded(newDateRange.startDate.toISOString());
    } catch (error) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsisCalenderLoading(false);
    }
  };

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
                        slotDurationInput={
                          <>
                            <TimeDurationDropDown />
                          </>
                        }
                        textYearMonth={calenderLabel}
                        onClickNext={{
                          onClick: handleClickNext,
                        }}
                        onClickPrev={{
                          onClick: handleClickPrev,
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
                        {isInitialising ? (
                          <Stack
                            direction={'row'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            width={'100vw'}
                            height={'70vh'}
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
