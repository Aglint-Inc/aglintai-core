import { Collapse, Stack } from '@mui/material';
import dayjs from 'dayjs';

import {
  CandidateDetailSidebar,
  GroupedSlots,
  SidebarBlockConfirmed,
  SidebarBlockNotScheduled,
  SidebarBlockPending,
  TimeRangePreview,
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import InterviewPanelCardComp from './InterviewPanelCard';
import ScheduleInfoBlockComp from './ScheduleInfoBlockComp';
import {
  setIsCreateScheduleOpen,
  setSelectedApplication,
  useInterviewStore,
} from '../store';
import { mailHandler, TimeSlot } from '../utils';

function SidePanel() {
  const { recruiter } = useAuthDetails();
  const selectedApplication = useInterviewStore(
    (state) => state.selectedApplication,
  );
  const applicationList = useInterviewStore((state) => state.applicationList);

  const currentIndex = applicationList.findIndex(
    (app) => app.applications.id === selectedApplication?.applications.id,
  );

  const resendInvite = async () => {
    mailHandler({
      id: selectedApplication?.schedule?.id,
      candidate_name: selectedApplication?.candidates.first_name,
      company_logo: recruiter.logo,
      company_name: recruiter.name,
      schedule_name: selectedApplication?.schedule?.schedule_name,
    });
  };

  const schedule = selectedApplication?.schedule?.selected_slots as unknown as {
    date: string;
    slots: TimeSlot[];
  }[];

  const totalSlots = schedule
    ?.map((sch) => sch.slots.filter((s) => s.isSelected).length)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <Collapse
      in={Boolean(selectedApplication)}
      orientation='horizontal'
      sx={{ height: '100%' }}
    >
      <Stack width={'450px'} height={'100%'}>
        <CandidateDetailSidebar
          onClickClose={{
            onClick: () => {
              setSelectedApplication(null);
            },
          }}
          slotAvatar={
            <MuiAvatar
              level={getFullName(
                selectedApplication?.candidates.first_name,
                selectedApplication?.candidates.last_name,
              )}
              src={selectedApplication?.candidates.avatar}
              variant={'circular'}
              width={'100%'}
              height={'100%'}
              fontSize={'12px'}
            />
          }
          textScheduleName={selectedApplication?.schedule?.schedule_name}
          slotSidebarContent={
            selectedApplication?.schedule?.status === 'pending' ? (
              <SidebarBlockPending
                slotScheduleInfoBlock={<ScheduleInfoBlockComp />}
                onClickResendInvite={{
                  onClick: () => {
                    resendInvite();
                  },
                }}
                textScheduleName={selectedApplication?.schedule?.schedule_name}
                textSlotNumber={`${totalSlots} slots provided to candidate to choose`}
                slorGroupedSlots={schedule
                  .filter((f) => f.slots.filter((s) => s.isSelected).length > 0)
                  .map((sch) => {
                    return (
                      <GroupedSlots
                        key={sch.date}
                        slotTimeRange={sch.slots
                          .filter((slot) => slot.isSelected)
                          .map((slot) => {
                            return (
                              <TimeRangePreview
                                key={slot.startTime}
                                textTimeRange={`${dayjs(slot.startTime).format('hh:mm')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
                              />
                            );
                          })}
                      />
                    );
                  })}
                slotInterviewPanel={<InterviewPanelCardComp />}
              />
            ) : selectedApplication?.schedule?.status === 'confirmed' ? (
              <SidebarBlockConfirmed
                slotInterviewPanel={<InterviewPanelCardComp />}
                slotScheduleInfo={<ScheduleInfoBlockComp />}
                textScheduleName={selectedApplication?.schedule?.schedule_name}
              />
            ) : selectedApplication?.schedule?.status === 'completed' ? (
              'Completed'
            ) : (
              <SidebarBlockNotScheduled
                onClickSchedule={{
                  onClick: () => {
                    setIsCreateScheduleOpen(true);
                  },
                }}
              />
            )
          }
          onClickLeft={{
            onClick: () => {
              if (currentIndex > 0) {
                setSelectedApplication(applicationList[currentIndex - 1]);
              }
            },
          }}
          onClickRight={{
            onClick: () => {
              if (currentIndex < applicationList.length - 1) {
                setSelectedApplication(applicationList[currentIndex + 1]);
              }
            },
          }}
          textCandidateName={`${selectedApplication?.candidates.first_name} ${selectedApplication?.candidates.last_name}`}
        />
      </Stack>
    </Collapse>
  );
}

export default SidePanel;
