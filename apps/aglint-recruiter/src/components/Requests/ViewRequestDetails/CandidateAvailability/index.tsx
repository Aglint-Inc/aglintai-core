import {
  EmailTemplateAPi,
  InterviewSessionTypeDB
} from '@aglint/shared-types';
import { ScheduleUtils } from '@aglint/shared-utils';
import { Autocomplete, Drawer, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { GlobalIcon } from '@/devlink2/GlobalIcon';
import { RequestCandidate } from '@/devlink2/RequestCandidate';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import axios from '@/src/client/axios';
import PopUpArrowIcon from '@/src/components/Common/Icons/PopUpArrowIcon';
import { insertCandidateRequestAvailability } from '@/src/components/Scheduling/CandidateDetails/RequestAvailability/RequestAvailabilityContext';
import {
  requestDaysListOptions,
  slotsListOptions,
} from '@/src/components/Scheduling/CandidateDetails/RequestAvailability/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Request as RequestType } from '@/src/queries/requests/types';
import { getCompanyDaysCnt } from '@/src/services/CandidateScheduleV2/utils/companyWorkingDays';
import dayjs from '@/src/utils/dayjs';
import { handleMeetingsOrganizerResetRelations } from '@/src/utils/scheduling/upsertMeetingsWithOrganizerId';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useMeetingList } from '../hooks';
import EmailTemplate from './Components/EmailTemplate';
import {
  setCandidateAvailabilityDrawerOpen,
  useCandidateAvailabilitySchedulingFlowStore,
} from './store';
function CandidateAvailability({
  selectedRequest,
}: {
  selectedRequest: RequestType;
}) {
  const { candidateAvailabilityDrawerOpen } =
    useCandidateAvailabilitySchedulingFlowStore();
  const { recruiter, recruiterUser } = useAuthDetails();
  const selectedSessions = selectedRequest.request_relation;

  // states
  const [selectedDays, setSelectedDays] = useState(requestDaysListOptions[1]);
  const [selectedSlots, setSelectedSlots] = useState(slotsListOptions[1]);
  const [selectedDate, setSelectedDate] = useState<{
    start_date: dayjs.Dayjs;
    end_date: dayjs.Dayjs;
  } | null>({
    start_date: dayjs(selectedRequest.schedule_start_date),
    end_date: dayjs(selectedRequest.schedule_end_date),
  });
  const [submitting, setSubmitting] = useState(false);
  const { data: sessions } = useMeetingList();
  async function handleSubmit() {
    setSubmitting(true);
    await handleMeetingsOrganizerResetRelations({
      application_id: selectedRequest.application_id,
      meeting_flow: 'candidate_request',
      selectedSessions: sessions.map((ses) => ({
        interview_session_id: ses.interview_session.id,
        interview_meeting_id: ses.interview_meeting.id,
        interview_schedule_id: ses.interview_meeting.interview_schedule_id,
      })),
      supabase,
    });
    const result = await insertCandidateRequestAvailability({
      application_id: String(selectedRequest.application_id),
      recruiter_id: String(recruiter.id),
      availability: {
        day_offs: false,
        free_keywords: true,
        outside_work_hours: false,
        recruiting_block_keywords: true,
      },
      date_range: [
        selectedDate.start_date.format('DD/MM/YYYY'),
        selectedDate.end_date.format('DD/MM/YYYY'),
      ],
      is_task_created: false,
      number_of_days: selectedDays.value,
      number_of_slots: selectedSlots.value,
      total_slots: null,
    });
    // setRequestDetails(result);
    await supabase.from('request_session_relation').insert(
      sessions.map((ele) => ({
        session_id: ele.interview_session.id,
        request_availability_id: result.id,
      })),
    );

    // send request availability email to candidate
    try {
      const payload: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
        {
          organizer_user_id: recruiterUser.user_id,
          avail_req_id: result.id,
        };
      await axios.post(`/api/emails/sendAvailabilityRequest_email_applicant`, {
        ...payload,
      });
    } catch (error) {
      toast.message('Failed to send email');
    }
    toast.success('Request availability created successfully');
    setSubmitting(false);
    setCandidateAvailabilityDrawerOpen(false);
  }

  const meetingsRound = ScheduleUtils.getSessionRounds(
    selectedSessions.map(
      (ele) =>
        ({
          ...ele.interview_session,
        }) as InterviewSessionTypeDB,
    ),
  ) as unknown as InterviewSessionTypeDB[][];
  const maxDays =
    getCompanyDaysCnt(
      recruiter.scheduling_settings,
      selectedDate.start_date.format('DD/MM/YYYY'),
      selectedDate.end_date.format('DD/MM/YYYY'),
    ) -
    (meetingsRound.length - 1);
  return (
    <>
      <Drawer
        anchor={'right'}
        open={candidateAvailabilityDrawerOpen}
        onClose={() => {
          setCandidateAvailabilityDrawerOpen(false);
        }}
      >
        <SideDrawerLarge
          isHeaderIconVisible={true}
          slotHeaderIcon={<GlobalIcon iconName={'exit_to_app'} size={4} />}
          textDrawertitle={`Request Availability`}
          slotSideDrawerbody={
            <RequestCandidate
              slotStartDateInput={
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Basic date picker'
                    defaultValue={dayjs(selectedRequest.schedule_start_date)}
                    format='DD MMMM YYYY'
                    onAccept={(value) => {
                      setSelectedDate({
                        start_date: value,
                        end_date: selectedDate?.end_date,
                      });
                    }}
                    sx={{
                      width: '100%',
                    }}
                  />
                </LocalizationProvider>
              }
              slotEndDateInput={
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={selectedDate?.end_date}
                    label='Basic date picker'
                    format='DD MMMM YYYY'
                    onAccept={(value) => {
                      setSelectedDate({
                        start_date: selectedDate?.start_date,
                        end_date: value,
                      });
                    }}
                    sx={{
                      width: '100%',
                    }}
                  />
                </LocalizationProvider>
              }
              slotMinNumberDays={
                <Autocomplete
                  fullWidth
                  disableClearable
                  disablePortal
                  value={selectedDays}
                  options={requestDaysListOptions}
                  renderOption={(props, option, i) => {
                    if (i.index + 1 < maxDays)
                      return <li {...props}>{option.label}</li>;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder='Days' />
                  )}
                  onChange={(_, value) => {
                    setSelectedDays(value);
                  }}
                  popupIcon={<PopUpArrowIcon />}
                />
              }
              slotMinNumberSlot={
                <Autocomplete
                  fullWidth
                  disableClearable
                  disablePortal
                  value={selectedSlots}
                  options={slotsListOptions}
                  renderOption={(props, option) => {
                    return <li {...props}>{option.label}</li>;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder='Days' />
                  )}
                  onChange={(_, value) => {
                    setSelectedSlots(value);
                  }}
                  popupIcon={<PopUpArrowIcon />}
                />
              }
              slotEmailTemplateHolder={
                <EmailTemplate
                  application_id={selectedRequest.application_id}
                />
              }
            />
          }
          slotButtons={
            <>
              <ButtonSoft
                color={'neutral'}
                size={2}
                onClickButton={{
                  onClick: () => {
                    setCandidateAvailabilityDrawerOpen(false);
                  },
                }}
                textButton={'Close'}
              />
              <ButtonSolid
                size={2}
                isDisabled={submitting}
                isLoading={submitting}
                textButton={'Send to Candidate'}
                onClickButton={{
                  onClick: () => {
                    handleSubmit();
                  },
                }}
              />
            </>
          }
        />
      </Drawer>
    </>
  );
}

export default CandidateAvailability;
