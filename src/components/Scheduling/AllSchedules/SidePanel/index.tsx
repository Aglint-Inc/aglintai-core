import { Collapse, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import {
  CandidateDetailSidebar,
  GroupedSlots,
  SidebarBlockConfirmed,
  SidebarBlockNotScheduled,
  SidebarBlockPending,
  TimeRangePreview
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import InterviewPanelCardComp from './InterviewPanelCard';
import ScheduleInfoBlockComp from './ScheduleInfoBlockComp';
import {
  setApplicationList,
  setIsCancelOpen,
  setIsCreateScheduleOpen,
  setIsRescheduleOpen,
  setSelectedApplication,
  useInterviewSchedulingStore
} from '../store';
import { mailHandler, TimeSlot } from '../utils';

function SidePanel() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const selectedApplication = useInterviewSchedulingStore(
    (state) => state.selectedApplication
  );
  const applicationList = useInterviewSchedulingStore(
    (state) => state.applicationList
  );

  const currentIndex = applicationList.findIndex(
    (app) => app.applications.id === selectedApplication?.applications.id
  );

  const resendInvite = async () => {
    if (selectedApplication?.schedule?.id) {
      if (selectedApplication?.schedule.resend_invite <= 3) {
        await supabase
          .from('interview_schedule')
          .update({
            resend_invite: selectedApplication?.schedule.resend_invite + 1
          })
          .eq('id', selectedApplication.schedule.id);

        mailHandler({
          id: selectedApplication.schedule.id,
          candidate_name: selectedApplication.candidates.first_name,
          company_logo: recruiter.logo,
          company_name: recruiter.name,
          schedule_name: selectedApplication.schedule.schedule_name
        });
        selectedApplication.schedule.resend_invite += 1;
        setSelectedApplication({
          ...selectedApplication,
          schedule: selectedApplication.schedule
        });
        applicationList.filter(
          (app) => app.applications.id === selectedApplication.applications.id
        )[0].schedule = {
          ...selectedApplication.schedule,
          resend_invite: selectedApplication.schedule.resend_invite + 1
        };
        setApplicationList([...applicationList]);
      } else {
        toast.error(
          'You have reached the maximum limit of resending the invite'
        );
      }
    }
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
            }
          }}
          slotAvatar={
            <MuiAvatar
              level={getFullName(
                selectedApplication?.candidates.first_name,
                selectedApplication?.candidates.last_name
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
                  }
                }}
                textScheduleName={selectedApplication?.schedule?.schedule_name}
                textSlotNumber={`${totalSlots} slots provided to candidate to choose`}
                slorGroupedSlots={schedule
                  .filter((f) => f.slots.filter((s) => s.isSelected).length > 0)
                  .map((sch) => {
                    return (
                      <GroupedSlots
                        textDate={dayjs(sch.date).format('dddd D MMM YYYY')}
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
                onClickCancelSchedule={{
                  onClick: () => {
                    setIsCancelOpen(true);
                  }
                }}
                onClickReschedule={{
                  onClick: () => {
                    setIsRescheduleOpen(true);
                  }
                }}
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
                  }
                }}
              />
            )
          }
          onClickLeft={{
            onClick: () => {
              if (currentIndex > 0) {
                router.push(
                  `${pageRoutes.SCHEDULING}?tab=allSchedules&application_id=${applicationList[currentIndex - 1].applications.id}`
                );
              }
            }
          }}
          onClickRight={{
            onClick: () => {
              if (currentIndex < applicationList.length - 1) {
                router.push(
                  `${pageRoutes.SCHEDULING}?tab=allSchedules&application_id=${applicationList[currentIndex + 1].applications.id}`
                );
              }
            }
          }}
          textCandidateName={`${selectedApplication?.candidates.first_name} ${selectedApplication?.candidates.last_name}`}
        />
      </Stack>
    </Collapse>
  );
}

export default SidePanel;
