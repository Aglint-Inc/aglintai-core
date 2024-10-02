import {
  type InterviewSessionTypeDB,
  type TargetApiPayloadType,
} from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  dayjsLocal,
  type ProgressLoggerType,
  ScheduleUtils,
} from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { Card, CardContent } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { SelectItem } from '@components/ui/select';
import { DAYS_LIST, SLOTS_LIST } from '@requests/constant';
import { useMeetingList } from '@requests/hooks';
import {
  useCreateCandidateAvailability,
  useUpdateCandidateAvailability,
} from '@requests/hooks/useRequestAvailabilityDetails';
import { type Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { UIDatePicker } from '@/components/Common/UIDatePicker';
import UIDrawer from '@/components/Common/UIDrawer';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { type Request as RequestType } from '@/queries/requests/types';
import { getCompanyDaysCnt } from '@/services/CandidateSchedule/utils/companyWorkingDays';
import { mailSender } from '@/utils/mailSender';
import { handleMeetingsOrganizerResetRelations } from '@/utils/scheduling/upsertMeetingsWithOrganizerId';
import { supabase } from '@/utils/supabase/client';

import EmailTemplate from './_common/components/EmailTemplate';
import {
  setCandidateAvailabilityDrawerOpen,
  setCandidateAvailabilityIdForReRequest,
  setReRequestAvailability,
  useCandidateAvailabilitySchedulingFlowStore,
} from './_common/contexts/CandidateAvailabilityFlowStore';
import { useCandidateAvailability } from './_common/hooks';

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
  const { recruiter, recruiter_user } = useTenant();
  const { updateRequestAvailability } = useUpdateCandidateAvailability();
  const selectedSessions = selectedRequest.request_relation;
  // states
  const [selectedDays, setSelectedDays] = useState(DAYS_LIST[1]);
  const [selectedSlots, setSelectedSlots] = useState(SLOTS_LIST[1]);
  const [selectedDate, setSelectedDate] = useState<{
    start_date: Dayjs;
    end_date: Dayjs;
  }>({
    start_date: dayjsLocal(
      selectedRequest.schedule_start_date || dayjsLocal().toISOString(),
    ),
    end_date: dayjsLocal(
      selectedRequest.schedule_end_date || dayjsLocal().toISOString(),
    ),
  });
  dayjsLocal;
  const [submitting, setSubmitting] = useState(false);
  const { data: sessions } = useMeetingList();

  const { data: candidateAvailability, isFetching } = useCandidateAvailability(
    {
      candidate_availability_id: candidateAvailabilityIdForReRequest,
    },
    { enabled: !!candidateAvailabilityIdForReRequest },
  );
  const { createRequestAvailability } = useCreateCandidateAvailability();

  useEffect(() => {
    if (isFetching && candidateAvailability) {
      const startDate = `${candidateAvailability.date_range[0].split('/')[1]}-${candidateAvailability.date_range[0].split('/')[0]}-${candidateAvailability.date_range[0].split('/')[2]}`;
      const endDate = `${candidateAvailability.date_range[1].split('/')[1]}-${candidateAvailability.date_range[1].split('/')[0]}-${candidateAvailability.date_range[1].split('/')[2]}`;
      setSelectedDays({
        value: candidateAvailability.number_of_days ?? 0,
        label: `${candidateAvailability.number_of_days} Days`,
      });
      setSelectedSlots({
        value: candidateAvailability.number_of_slots ?? 0,
        label: `${candidateAvailability.number_of_slots} Slots`,
      });
      setSelectedDate({
        start_date: dayjsLocal(startDate),
        end_date: dayjsLocal(endDate),
      });
    }
  }, [candidateAvailability]);
  async function handleSubmit() {
    setSubmitting(true);
    if (reRequestAvailability) {
      updateRequestAvailability({
        slots: null,
        visited: false,
        number_of_days: selectedDays.value,
        number_of_slots: selectedSlots.value,
        date_range: [
          selectedDate?.start_date.format('DD/MM/YYYY'),
          selectedDate?.end_date.format('DD/MM/YYYY'),
        ],
        id: candidateAvailabilityIdForReRequest,
      });
      try {
        const payload: TargetApiPayloadType<'availabilityReqResend_email_candidate'> =
          {
            recruiter_user_id: recruiter_user?.user_id ?? '',
            avail_req_id: candidateAvailabilityIdForReRequest,
            is_preview: true,
          };
        mailSender({
          target_api: 'availabilityReqResend_email_candidate',
          payload: payload,
        });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Failed to send email' });
      }

      toast({
        title: 'Request availability has been re-requested successfully',
      });
      setSubmitting(false);
      setCandidateAvailabilityDrawerOpen(false);
      return;
    }
    await handleMeetingsOrganizerResetRelations({
      application_id: selectedRequest.application_id,
      meeting_flow: 'candidate_request',
      selectedSessions: sessions
        ? sessions.map((ses) => ({
            interview_session_id: ses?.interview_session?.id ?? '',
            interview_meeting_id: ses?.interview_meeting?.id ?? '',
            job_id: ses?.interview_meeting?.job_id ?? '',
            recruiter_id: ses?.interview_meeting?.recruiter_id ?? '',
          }))
        : [],
      supabase,
    });
    const result = await createRequestAvailability({
      application_id: String(selectedRequest.application_id),
      recruiter_id: String(recruiter?.id),
      availability: {
        day_offs: false,
        free_keywords: true,
        outside_work_hours: false,
        recruiting_block_keywords: true,
      },
      date_range: [
        selectedDate?.start_date.format('DD/MM/YYYY'),
        selectedDate?.end_date.format('DD/MM/YYYY'),
      ],
      is_task_created: false,
      number_of_days: selectedDays.value,
      number_of_slots: selectedSlots.value,
      total_slots: null,
      request_id: selectedRequest.id,
    });
    if (result) {
      await supabase.from('request_session_relation').insert(
        (sessions ?? []).map((ele) => ({
          session_id: ele.interview_session.id,
          request_availability_id: result.id,
        })),
      );

      // send request availability email to candidate
      try {
        const reqProgressLogger: ProgressLoggerType =
          createRequestProgressLogger({
            request_id: selectedRequest.id,
            supabaseAdmin: supabase,
            event_type: 'REQ_CAND_AVAIL_EMAIL_LINK',
          });
        const payload: TargetApiPayloadType<'sendAvailabilityRequest_email_applicant'> =
          {
            organizer_user_id: recruiter_user?.user_id,
            avail_req_id: result.id,
            preview_details: {
              application_id: selectedRequest.application_id,
            },
            is_preview: true,
          };

        mailSender({
          target_api: 'sendAvailabilityRequest_email_applicant',
          payload,
        });
        await reqProgressLogger({
          is_progress_step: false,
          status: 'completed',
        });
        await reqProgressLogger({
          is_progress_step: true,
          status: 'completed',
          meta: {
            event_run_id: null,
            avail_req_id: result.id,
          },
        });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Failed to send email' });
      }

      toast({ title: 'Request availability created successfully' });
      setSubmitting(false);
      setCandidateAvailabilityDrawerOpen(false);
    }
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
      //@ts-ignore
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
      <UIDrawer
        title={
          reRequestAvailability
            ? 'Re-request Availability'
            : `Request Availability`
        }
        open={candidateAvailabilityDrawerOpen}
        onClose={closeDrawer}
        slotBottom={
          <>
            <UIButton
              variant='outline'
              onClick={() => {
                setCandidateAvailabilityDrawerOpen(false);
              }}
              className='w-full'
            >
              Close
            </UIButton>
            <UIButton
              variant='default'
              disabled={submitting}
              onClick={() => {
                handleSubmit();
              }}
              className='w-full'
              isLoading={submitting}
            >
              {reRequestAvailability
                ? 'Re-Request Availability'
                : 'Send to Candidate'}
            </UIButton>
          </>
        }
      >
        <RequestCandidate
          slotStartDateInput={
            <UIDatePicker
              closeOnSelect={true}
              value={new Date(selectedDate.start_date.toISOString())}
              onAccept={(value: Date) => {
                setSelectedDate({
                  start_date: dayjsLocal(value),
                  end_date: selectedDate.end_date,
                });
              }}
            />
          }
          slotEndDateInput={
            <UIDatePicker
              closeOnSelect={true}
              value={new Date(selectedDate.end_date.toISOString())}
              onAccept={(value: Date) => {
                setSelectedDate({
                  start_date: selectedDate?.start_date,
                  end_date: dayjsLocal(value),
                });
              }}
            />
          }
          slotMinNumberDays={
            <UISelectDropDown
              fullWidth
              value={String(selectedDays.value)}
              menuOptions={DAYS_LIST.filter(
                (_, index) => index + 1 < maxDays,
              ).map(({ label, value }) => {
                return {
                  name: label,
                  value,
                };
              })}
              placeholder='Days'
              onValueChange={(value) => {
                const selectedOption = DAYS_LIST.find(
                  (option) => option.value === Number(value),
                );

                if (selectedOption) {
                  setSelectedDays({
                    label: selectedOption.label,
                    value: selectedOption.value,
                  });
                }
              }}
            >
              {DAYS_LIST.map((option, index) => {
                if (index + 1 < maxDays) {
                  return (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  );
                }
                return null;
              })}
            </UISelectDropDown>
          }
          slotMinNumberSlot={
            <UISelectDropDown
              fullWidth
              value={String(selectedSlots.value)}
              menuOptions={SLOTS_LIST.map(({ label, value }) => ({
                name: label,
                value,
              }))}
              placeholder='Slots'
              onValueChange={(value) => {
                const selectedOption = SLOTS_LIST.find(
                  (option) => option.value === Number(value),
                );
                if (selectedOption) {
                  setSelectedSlots({
                    label: selectedOption.label,
                    value: selectedOption.value,
                  });
                }
              }}
            >
              {SLOTS_LIST.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </UISelectDropDown>
          }
          slotEmailTemplateHolder={
            <EmailTemplate
              application_id={selectedRequest.application_id ?? ''}
            />
          }
        />
      </UIDrawer>
    </>
  );
}

export default CandidateAvailability;

interface RequestCandidateProps {
  slotStartDateInput: React.ReactNode;
  slotEndDateInput: React.ReactNode;
  slotMinNumberDays: React.ReactNode;
  slotMinNumberSlot: React.ReactNode;
  slotEmailTemplateHolder?: React.ReactNode;
}
export function RequestCandidate({
  slotStartDateInput,
  slotEndDateInput,
  slotMinNumberDays,
  slotMinNumberSlot,
  slotEmailTemplateHolder,
}: RequestCandidateProps) {
  return (
    <div className='flex h-full flex-col space-y-6 p-4'>
      <Card>
        <CardContent className='grid grid-cols-2 gap-4 pt-6'>
          <div className='space-y-1'>
            <Label htmlFor='start-date'>Start Date</Label>
            <div id='start-date'>{slotStartDateInput}</div>
          </div>
          <div className='space-y-1'>
            <Label htmlFor='end-date'>End Date</Label>
            <div id='end-date'>{slotEndDateInput}</div>
          </div>
          <div className='space-y-1'>
            <Label htmlFor='min-days'>
              Minimum number of days should be selected
            </Label>
            <div id='min-days'>{slotMinNumberDays}</div>
          </div>
          <div className='space-y-1'>
            <Label htmlFor='min-slots'>
              Minimum number of slots selected per each day
            </Label>
            <div id='min-slots'>{slotMinNumberSlot}</div>
          </div>
        </CardContent>
      </Card>
      <div className='space-y-2'>
        <p>
          {`To proceed with requesting the candidate's availability, please click
          on the button below. Upon doing so, an email containing the following
          message will be sent to the candidate:`}
        </p>
        <div>{slotEmailTemplateHolder ?? slotEmailTemplateHolder}</div>
      </div>
    </div>
  );
}
