import { EmailTemplateAPi, InterviewSessionTypeDB } from '@aglint/shared-types';
import { ScheduleUtils, supabaseWrap } from '@aglint/shared-utils';
import { Autocomplete, Drawer, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { GlobalIcon } from '@/devlink2/GlobalIcon';
import { RequestCandidate } from '@/devlink2/RequestCandidate';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import axios from '@/src/client/axios';
import PopUpArrowIcon from '@/src/components/Common/Icons/PopUpArrowIcon';
import {
  requestDaysListOptions,
  slotsListOptions,
} from '@/src/components/Scheduling/CandidateDetails/RequestAvailability/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import { Request as RequestType } from '@/src/queries/requests/types';
import { getCompanyDaysCnt } from '@/src/services/CandidateScheduleV2/utils/companyWorkingDays';
import dayjs from '@/src/utils/dayjs';
import { handleMeetingsOrganizerResetRelations } from '@/src/utils/scheduling/upsertMeetingsWithOrganizerId';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useMeetingList } from '../hooks';
import EmailTemplate from './Components/EmailTemplate';
import { useCandidateAvailability } from './hooks';
import {
  setCandidateAvailabilityDrawerOpen,
  setCandidateAvailabilityIdForReRequest,
  setReRequestAvailability,
  useCandidateAvailabilitySchedulingFlowStore,
} from './store';
import {
  insertCandidateRequestAvailability,
  updateCandidateRequestAvailability,
} from './utils';
function CandidateAvailability({
  selectedRequest,
}: {
  selectedRequest: RequestType;
}) {
  const {
    candidateAvailabilityDrawerOpen,
    reRequestAvailability,
    candidateAvailabilityIdForReRequest,
  } = useCandidateAvailabilitySchedulingFlowStore();
  const { recruiter, recruiterUser } = useAuthDetails();
  const { handleAsyncUpdateRequest } = useRequests();
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

  const { data: candidateAvailability } = useCandidateAvailability({
    candidateAvailabilityId: candidateAvailabilityIdForReRequest,
  });

  useEffect(() => {
    if (candidateAvailability?.id) {
      const startDate = `${candidateAvailability?.date_range[0].split('/')[1]}-${candidateAvailability?.date_range[0].split('/')[0]}-${candidateAvailability?.date_range[0].split('/')[2]}`;
      const endDate = `${candidateAvailability?.date_range[1].split('/')[1]}-${candidateAvailability?.date_range[1].split('/')[0]}-${candidateAvailability?.date_range[1].split('/')[2]}`;
      setSelectedDays({
        value: candidateAvailability.number_of_days,
        label: `${candidateAvailability.number_of_days} Days`,
      });
      setSelectedSlots({
        value: candidateAvailability.number_of_slots,
        label: `${candidateAvailability.number_of_slots} Slots`,
      });
      setSelectedDate({
        start_date: dayjs(startDate),
        end_date: dayjs(endDate),
      });
    }
  }, [candidateAvailability]);
  async function handleSubmit() {
    setSubmitting(true);
    if (reRequestAvailability) {
      await updateCandidateRequestAvailability({
        data: {
          slots: null,
          visited: false,
          number_of_days: selectedDays.value,
          number_of_slots: selectedSlots.value,
          date_range: [
            selectedDate.start_date.format('DD/MM/YYYY'),
            selectedDate.end_date.format('DD/MM/YYYY'),
          ],
        },
        id: candidateAvailabilityIdForReRequest,
      });

      toast.success('Request availability has been re-requested successfully');
      setSubmitting(false);
      setCandidateAvailabilityDrawerOpen(false);
      return;
    }
    await handleAsyncUpdateRequest({
      payload: {
        requestId: String(selectedRequest?.id),
        requestPayload: {
          status: 'in_progress',
        },
      },
      loading: false,
      toast: false,
    });
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
      request_id: selectedRequest.id,
    });
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
      supabaseWrap(
        await supabase.from('request_progress').insert({
          request_id: selectedRequest.id,
          event_type: 'REQ_CAND_AVAIL_EMAIL_LINK',
          is_progress_step: false,
          status: 'completed',
        }),
      );
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
  function closeDrawer() {
    setCandidateAvailabilityDrawerOpen(false);
    setReRequestAvailability(false);
    setCandidateAvailabilityIdForReRequest('');
  }
  return (
    <>
      <Drawer
        anchor={'right'}
        open={candidateAvailabilityDrawerOpen}
        onClose={closeDrawer}
      >
        <SideDrawerLarge
          isHeaderIconVisible={true}
          slotHeaderIcon={<GlobalIcon iconName={'exit_to_app'} size={4} />}
          textDrawertitle={
            reRequestAvailability
              ? 'Re-request Availability'
              : `Request Availability`
          }
          onClickCancel={{
            onClick: () => {
              closeDrawer();
            },
          }}
          slotSideDrawerbody={
            <RequestCandidate
              slotStartDateInput={
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Basic date picker'
                    value={selectedDate.start_date}
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
                    value={selectedDate?.end_date}
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
                textButton={
                  reRequestAvailability
                    ? 'Re-Request Availability'
                    : 'Send to Candidate'
                }
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
