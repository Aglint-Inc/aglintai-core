import { DatabaseTable } from '@aglint/shared-types';
import { ApiFindAvailability } from '@aglint/shared-types';
import { PlanCombinationRespType } from '@aglint/shared-types';
import { Dialog, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { Dispatch, useState } from 'react';

import { ScheduleOptions } from '@/devlink2';
import { ButtonGrey, ButtonPrimaryDefaultRegular } from '@/devlink3';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../../AllSchedules/queries/utils';
import SchedulingOptionComp from '../../../AllSchedules/SchedulingApplication/Common/ScheduleOption';
import { mailHandler } from '../../../AllSchedules/utils';
import { useScheduleDetails } from '../../hooks';
import { ScheduleMeeting } from '../../types';

function RescheduleDialog({
  isRescheduleOpen,
  setIsRescheduleOpen,
  schedule,
  cancelReasons,
  dateRange,
  setDateRange,
}: {
  isRescheduleOpen: boolean;
  setIsRescheduleOpen: Dispatch<React.SetStateAction<boolean>>;
  schedule: ScheduleMeeting;
  cancelReasons: ReturnType<typeof useScheduleDetails>['data']['cancel_data'];
  dateRange: {
    start_date: string;
    end_date: string;
  };
  setDateRange: Dispatch<
    React.SetStateAction<{
      start_date: string;
      end_date: string;
    }>
  >;
}) {
  const queryClient = useQueryClient();
  const { recruiter, recruiterUser } = useAuthDetails();
  const currentDate = dayjs();
  const [saving, setSaving] = useState(false);
  const [fetchingPlan, setFetchingPlan] = useState(false);
  const [schedulingOptions, setSchedulingOptions] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [totalSlots, setTotalSlots] = useState(0);

  const [step, setStep] = useState(1);
  const [noOptions, setNoOptions] = useState(false);

  const findScheduleOptions = async () => {
    try {
      setNoOptions(false);
      setFetchingPlan(true);
      const res = await axios.post('/api/scheduling/v1/find_availability', {
        session_ids: [schedule.interview_session.id],
        recruiter_id: recruiter.id,
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
        user_tz: dayjs.tz.guess(),
        is_debreif: false,
      } as ApiFindAvailability);

      if (res.status === 200) {
        const respTyped = res.data as {
          plan_combs: PlanCombinationRespType[];
          total: number;
        };
        if (respTyped.plan_combs.length === 0) {
          setNoOptions(true);
        } else {
          setTotalSlots(respTyped.total);
          setSchedulingOptions(respTyped.plan_combs);
          setIsRescheduleOpen(false);
          setStep(2);
        }
      } else {
        toast.error('Error retrieving availability.');
      }
    } catch (e) {
      toast.error(e.message);
      //
    } finally {
      setFetchingPlan(false);
    }
  };

  const onClickReschedule = async () => {
    try {
      if (schedule?.interview_session.id && !saving) {
        setSaving(true);
        // old filter json remove session_id and cancel calendar event
        const { data: checkFilterJson, error: errMeetFilterJson } =
          await supabase
            .from('interview_filter_json')
            .select('*')
            .contains('session_ids', [schedule?.interview_session.id]);
        if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);
        if (checkFilterJson.length > 0) {
          const updateDbArray = checkFilterJson.map((filterJson) => ({
            ...filterJson,
            session_ids: filterJson.session_ids.filter(
              (id) => id !== schedule.interview_session.id,
            ),
          }));
          const { error: errFilterJson } = await supabase
            .from('interview_filter_json')
            .upsert(updateDbArray);
          if (errFilterJson) throw new Error(errFilterJson.message);
        }
        const { data, error } = await supabase
          .from('interview_meeting')
          .update({ status: 'cancelled' })
          .eq('id', schedule?.interview_meeting.id)
          .select();
        if (error) {
          throw new Error(error.message);
        }
        if (data[0]?.cal_event_id) {
          axios.post('/api/scheduling/v2/cancel_calender_event', {
            calender_event: data[0].cal_event_id,
          });
        }
        // old filter json remove session

        const { error: errorUpdatedMeetings } = await supabase
          .from('interview_meeting')
          .upsert({
            status: 'waiting',
            id: schedule.interview_meeting.id,
            interview_schedule_id:
              schedule.interview_meeting.interview_schedule_id,
          });

        if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: [schedule.interview_session.id],
              recruiter_id: recruiter.id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
              organizer_name: recruiterUser.first_name,
            },
            session_ids: [schedule.interview_session.id],
            schedule_id: schedule.interview_meeting.interview_schedule_id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        addScheduleActivity({
          title: `Candidate invited for session ${schedule.interview_session.name}`,
          logger: recruiterUser.user_id,
          application_id: schedule.applications.id,
          type: 'schedule',
          supabase,
          created_by: recruiterUser.user_id,
        });

        const scheduleName = `Interview for ${schedule.job.job_title} - ${schedule.candidates.first_name}`;

        mailHandler({
          filter_id: filterJson[0].id,
          rec_id: recruiter.id,
          candidate_name: getFullName(
            schedule.candidates.first_name,
            schedule.candidates.last_name,
          ),
          mail: schedule.candidates.email,
          position: schedule.job.job_title,
          schedule_name: scheduleName,
          schedule_id: schedule.interview_meeting.interview_schedule_id,
          supabase,
          rec_mail: recruiterUser.email,
        });

        if (cancelReasons?.length > 0) {
          const { error: errRel } = await supabase
            .from('interview_session_relation')
            .upsert(
              schedule.users.map((item) => {
                return {
                  ...item.interview_session_relation,
                  accepted_status: 'waiting',
                  is_confirmed: false,
                } as DatabaseTable['interview_session_relation'];
              }),
            );
          if (errRel) toast.error(errRel.message);
          const { error: errCancel } = await supabase
            .from('interview_session_cancel')
            .upsert(
              cancelReasons.map((item) => {
                return {
                  ...item.interview_session_cancel,
                  is_resolved: true,
                };
              }),
            );

          if (errCancel) toast.error(errCancel.message);
        }

        queryClient.invalidateQueries({
          queryKey: ['schedule_details', schedule.interview_meeting.id],
        });
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsRescheduleOpen(false);
      setSaving(false);
    }
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          border: 'none',
          borderRadius: '10px',
        },
      }}
      open={isRescheduleOpen}
      onClose={() => {
        setIsRescheduleOpen(false);
      }}
      maxWidth='lg'
    >
      <ScheduleOptions
        onClickClose={{
          onClick: () => {
            setIsRescheduleOpen(false);
          },
        }}
        slotSendtoCandidateButton={
          <Stack direction={'row'} width={'100%'} spacing={2}>
            <Stack width={'100%'}>
              <ButtonGrey
                textLabel={'Back'}
                onClickButton={{
                  onClick: () => {
                    setStep(1);
                  },
                }}
              />
            </Stack>
            <Stack width={'100%'}>
              <ButtonPrimaryDefaultRegular
                buttonText={'Send Booking Link to Candidate'}
                buttonProps={{
                  onClick: () => {
                    if (!saving) onClickReschedule();
                  },
                }}
                endIconSlot={
                  saving && (
                    <Stack height={'16px'} width={'16px'}>
                      <LoaderGrey />
                    </Stack>
                  )
                }
              />
            </Stack>
          </Stack>
        }
        slotPrimaryButton={
          <>
            <ButtonPrimaryDefaultRegular
              buttonText={'Find Availibility'}
              buttonProps={{
                onClick: () => {
                  if (!fetchingPlan) findScheduleOptions();
                },
              }}
              endIconSlot={
                fetchingPlan && (
                  <Stack height={'16px'} width={'16px'}>
                    <LoaderGrey />
                  </Stack>
                )
              }
            />
          </>
        }
        isBasicDetailsVisible={step === 1}
        isMultipleOptionVisible={step === 2}
        slotAvailableCard={
          <SchedulingOptionComp
            schedulingOptions={schedulingOptions}
            isBadgeVisible={true}
            isInterviewVisible={true}
            total={totalSlots}
            isDebrief={false}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        }
        isNoOptionsFoundVisible={noOptions}
        slotCandidateImage={
          <MuiAvatar
            level={getFullName(
              schedule?.candidates.first_name,
              schedule?.candidates.last_name,
            )}
            src={schedule?.candidates.avatar}
            variant={'circular'}
            width={'100%'}
            height={'100%'}
            fontSize={'12px'}
          />
        }
        slotDateRangeInput={
          <Stack direction={'row'} width={'100%'} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(dateRange?.start_date)}
                onChange={(newValue) => {
                  if (dayjs(newValue) < dayjs(dateRange?.end_date)) {
                    setDateRange({
                      start_date: dayjs(newValue)?.toISOString(),
                      end_date: dateRange?.end_date,
                    });
                  } else {
                    setDateRange({
                      start_date: dayjs(newValue).isValid()
                        ? dayjs(newValue)?.toISOString()
                        : null,
                      end_date: null,
                    });
                  }
                }}
                minDate={currentDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    placeholder: 'Start Date',
                  },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(dateRange?.end_date)}
                minDate={dayjs(dateRange?.start_date)}
                maxDate={dayjs(dateRange?.start_date).add(1, 'month')}
                onChange={(newValue) => {
                  setDateRange({
                    start_date: dateRange?.start_date,
                    end_date: dayjs(newValue)?.toISOString(),
                  });
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    placeholder: 'End Date',
                  },
                }}
              />
            </LocalizationProvider>
          </Stack>
        }
        textCandidateName={getFullName(
          schedule.candidates.first_name,
          schedule.candidates.last_name,
        )}
        textPopHeader={'Available Options'}
      />
    </Dialog>
  );
}

export default RescheduleDialog;
