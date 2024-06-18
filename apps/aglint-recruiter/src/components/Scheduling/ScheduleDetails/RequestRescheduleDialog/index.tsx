import { InterviewSessionRelationTypeDB } from '@aglint/shared-types';
import { Dialog, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { Dispatch, useEffect, useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../Candidates/queries/utils';
import { DateIcon } from '../../Settings/Components/DateSelector';
import { ScheduleMeeting } from '../types';

function RequestRescheduleDialog({
  isRequestRescheduleOpen,
  setIsRequestRescheduleOpen,
  sessionRelation,
  schedule,
  refetch,
}: {
  isRequestRescheduleOpen: boolean;
  setIsRequestRescheduleOpen: Dispatch<React.SetStateAction<boolean>>;
  sessionRelation: InterviewSessionRelationTypeDB;
  schedule: ScheduleMeeting;
  refetch: () => void;
}) {
  const { recruiter, recruiterUser } = useAuthDetails();
  const currentDate = dayjs();
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const reasons = recruiter.scheduling_reason?.internal?.rescheduling || [
    'Too Many Interviews',
    'Out of the office',
    'Scheduling conflicts',
    'Illness or emergency',
  ];

  useEffect(() => {
    setDateRange({
      start_date: currentDate.toISOString(),
      end_date: currentDate.add(15, 'day').toISOString(),
    });
    setReason('Too Many Interviews');
  }, []);

  const onClickConfirm = async () => {
    try {
      if (sessionRelation?.id) {
        await supabase
          .from('interview_session_relation')
          .update({ accepted_status: 'request_reschedule' })
          .eq('id', sessionRelation.id);

        const { error } = await supabase
          .from('interview_session_cancel')
          .insert({
            reason,
            session_relation_id: sessionRelation.id,
            session_id: schedule.interview_session.id,
            type: 'reschedule',
            other_details: {
              dateRange: {
                start: dateRange.start_date,
                end: dateRange.end_date,
              },
              note: notes,
            },
          });

        if (error) throw new Error();

        addScheduleActivity({
          title: `Requested reschedule for ${schedule.interview_session.name}. Reason: ${reason} `,
          application_id: schedule.schedule.application_id,
          logged_by: 'user',
          supabase: supabase,
          created_by: recruiterUser.user_id,
        });

        refetch();
      }
    } catch {
      toast.error('Unable to save cancel reason');
    } finally {
      setIsRequestRescheduleOpen(false);
    }
  };

  return (
    <Dialog
      open={isRequestRescheduleOpen}
      onClose={() => {
        setIsRequestRescheduleOpen(false);
      }}
    >
      <ConfirmationPopup
        textPopupTitle={'Request Reschedule'}
        isIcon={false}
        onClickCancel={{
          onClick: () => {
            setIsRequestRescheduleOpen(false);
          },
        }}
        onClickAction={{
          onClick: onClickConfirm,
        }}
        isDescriptionVisible={false}
        isWidget={true}
        slotWidget={
          <Stack spacing={2}>
            <Typography variant='body1'>
              Please provide a reason for rescheduling and any additional notes.
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
                    <Checkbox isChecked={rea === reason} />
                    <Typography variant='body1' color={'var(--neutral-12)'}>
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
          </Stack>
        }
        textPopupButton={'Confirm'}
      />
    </Dialog>
  );
}

export default RequestRescheduleDialog;
