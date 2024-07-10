import { DatabaseEnums } from '@aglint/shared-types';
import {
  Checkbox,
  Dialog,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Dispatch, useEffect, useState } from 'react';

import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { cancelMailHandler } from '../../CandidateDetails/mailUtils';
import {
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../CandidateDetails/SchedulingDrawer/store';
import { setRescheduleSessionIds } from '../../CandidateDetails/store';
import { addScheduleActivity } from '../../Candidates/queries/utils';
import { DateIcon } from '../../Settings/Components/DateSelector';
import {
  removeSessionFromFilterJson,
  removeSessionFromRequestAvailibility,
} from '../utils';

function RescheduleDialog({
  isRescheduleOpen,
  refetch,
  setIsRescheduleOpen,
  application_id,
  meeting_id,
  session_id,
  meeting_flow,
  session_name,
}: {
  isRescheduleOpen: boolean;
  refetch: () => void;
  setIsRescheduleOpen: Dispatch<React.SetStateAction<boolean>>;
  application_id: string;
  meeting_id: string;
  session_id: string;
  meeting_flow: DatabaseEnums['meeting_flow'];
  session_name: string;
}) {
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();
  const currentDate = dayjs();
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>();
  const [sendCancelMail, setSendCancelMail] = useState(true);

  const reasons = recruiter.scheduling_reason?.internal?.rescheduling || [
    'Too Many Interviews',
    'Out of the office',
    'Scheduling conflicts',
    'Illness or emergency',
  ]; // extra array not needed temporarily added

  useEffect(() => {
    setDateRange({
      start_date: currentDate.toISOString(),
      end_date: currentDate.add(15, 'day').toISOString(),
    });
    setReason(reasons[0]);
  }, []);

  const onClickConfirm = async () => {
    try {
      const { error: errMeet } = await supabase
        .from('interview_meeting')
        .update({
          status: 'cancelled',
          start_time: null,
          end_time: null,
          cal_event_id: null,
          meeting_link: null,
          meeting_json: null,
        })
        .eq('id', meeting_id);

      if (errMeet) throw new Error(errMeet.message);

      const { error: errSesRel } = await supabase
        .from('interview_session_relation')
        .update({
          accepted_status: 'waiting',
          is_confirmed: false,
        })
        .eq('session_id', session_id);

      if (errSesRel) throw new Error(errSesRel.message);

      const { error: errInsSesCancel } = await supabase
        .from('interview_session_cancel')
        .insert({
          type: 'reschedule',
          session_id,
          other_details: {
            dateRange: {
              start: dateRange.start_date,
              end: dateRange.end_date,
            },
            note: notes,
          },
          cancel_user_id: recruiterUser.user_id,
          is_resolved: true,
          reason,
        });

      if (errInsSesCancel) throw new Error(errInsSesCancel.message);

      const { error: errUpdSesCancel } = await supabase
        .from('interview_session_cancel')
        .update({
          is_resolved: true,
        })
        .eq('session_id', session_id);

      if (errUpdSesCancel) throw new Error(errUpdSesCancel.message);

      await addScheduleActivity({
        title: `Cancelled session ${session_name} and try to reschedule.`,
        application_id,
        logged_by: 'user',
        supabase,
        created_by: recruiterUser.user_id,
      });

      if (
        meeting_flow === 'self_scheduling' ||
        meeting_flow === 'phone_agent' ||
        meeting_flow === 'mail_agent'
      ) {
        await removeSessionFromFilterJson({
          session_id,
          supabase,
        });
      } else {
        await removeSessionFromRequestAvailibility({
          session_id,
          supabase,
        });
      }

      if (sendCancelMail) {
        cancelMailHandler({
          application_id,
          session_ids: [session_id],
        });
      }

      refetch();
      setRescheduleSessionIds([session_id]);
      setStepScheduling('reschedule');
      setIsScheduleNowOpen(true);

      router.push(
        ROUTES['/scheduling/application/[application_id]']({
          application_id,
        }),
      );
    } catch {
      toast.error('Unable to save cancel reason');
    } finally {
      setIsRescheduleOpen(false);
    }
  };

  return (
    <Dialog
      open={isRescheduleOpen}
      onClose={() => {
        setIsRescheduleOpen(false);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={`Reschedule ${session_name}`}
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsRescheduleOpen(false);
          },
        }}
        onClickAction={{
          onClick: onClickConfirm,
        }}
        textPopupDescription=''
        isDescriptionVisible={false}
        isWidget={true}
        slotWidget={
          <Stack spacing={2}>
            <Typography variant='body1'>
              Please chose the new date range for the interview.
            </Typography>
            <Stack spacing={2} direction={'row'}>
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
                      margin: 'none',
                      placeholder: 'Start Date',
                    },
                  }}
                  slots={{
                    openPickerIcon: DateIcon,
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
                      margin: 'none',
                      placeholder: 'End Date',
                    },
                  }}
                  slots={{
                    openPickerIcon: DateIcon,
                  }}
                />
              </LocalizationProvider>
            </Stack>

            <Typography variant='body1'>
              Please provide a reason for rescheduling and any additional notes.
            </Typography>
            <Stack spacing={1}>
              {reasons.map((rea) => {
                return (
                  <Stack
                    direction={'row'}
                    key={rea}
                    onClick={() => {
                      setReason(rea);
                    }}
                    alignItems={'center'}
                    spacing={1}
                  >
                    <Radio checked={rea === reason} />
                    <Typography
                      variant='body1'
                      color={'var(--neutral-12)'}
                      sx={{ cursor: 'pointer' }}
                    >
                      {rea}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>

            <Typography variant='body1'>Additional Notes</Typography>
            <TextField
              multiline
              value={notes}
              minRows={3}
              placeholder='Add additional notes.'
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />

            <Typography variant='body1' color={'error'}>
              Old meeting will be moved to cancelled status if you proceed.
            </Typography>
            <Stack spacing={1} direction={'row'} alignItems={'center'}>
              <Checkbox
                checked={sendCancelMail}
                onChange={(e) => {
                  setSendCancelMail(e.target.checked);
                }}
              />
              <Typography variant='body1'>
                Send a cancellation email to the candidate
              </Typography>
            </Stack>
          </Stack>
        }
        textPopupButton={'Proceed to Reschedule'}
      />
    </Dialog>
  );
}

export default RescheduleDialog;
