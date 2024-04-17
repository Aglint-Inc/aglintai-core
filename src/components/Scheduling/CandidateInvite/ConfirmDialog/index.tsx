import { Dialog, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';

import { ButtonSuccessRegular } from '@/devlink';
import {
  AvailableOptionCardDate,
  InviteLinkConfirm,
  OptionAvailable,
  OptionAvailableCard,
} from '@/devlink2';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import { ConfirmApiBodyParams } from '@/src/pages/api/scheduling/v1/confirm_interview_slot';
import { SessionsCombType } from '@/src/utils/scheduling_v1/types';
import toast from '@/src/utils/toast';

import { ApiResponse } from '../type';

function ConfirmDialog({
  selectedSlots,
  dialogOpen,
  setDialogOpen,
  schedule,
  allScheduleOptions,
  setSchedule,
}: {
  selectedSlots: string[];
  dialogOpen: boolean;
  setDialogOpen: any;
  schedule: ApiResponse;
  allScheduleOptions: SessionsCombType[][];
  // eslint-disable-next-line no-unused-vars
  setSchedule: (schedule: ApiResponse) => void;
}) {
  const [saving, setSaving] = useState(false);

  const schedulingOptions = [];

  if (allScheduleOptions) {
    allScheduleOptions?.map((option) => {
      schedulingOptions.push(
        option.filter((opt) => selectedSlots.includes(opt.slot_comb_id))[0],
      );
    });
  }

  const handleConfirmSlot = async () => {
    try {
      setSaving(true);
      const selectedSlot = allScheduleOptions?.map((option) => {
        return option.filter((opt) =>
          selectedSlots.includes(opt.slot_comb_id),
        )[0];
      });

      const bodyParams = {
        candidate_plan: selectedSlot,
        recruiter_id: schedule.recruiter.id,
        user_tz: dayjs.tz.guess(),
        candidate_email: schedule.candidate.email,
        schedule_id: schedule.schedule.id,
      } as ConfirmApiBodyParams;

      const res = await axios.post(
        '/api/scheduling/v1/confirm_interview_slot',
        bodyParams,
      );

      if (res.status === 200) {
        toast.success('Slot confirmed successfully');
        const updatedMeetings = schedule.meetings.map((meeting, ind) => ({
          ...meeting,
          interview_meeting: {
            ...meeting.interview_meeting,
            status: 'confirmed',
            start_time: selectedSlot[Number(ind)]?.sessions?.find(
              (ses) => ses.session_id === meeting.interview_meeting.session_id,
            )?.start_time,
            end_time: selectedSlot[Number(ind)]?.sessions?.find(
              (ses) => ses.session_id === meeting.interview_meeting.session_id,
            )?.end_time,
          },
        }));
        setSchedule({
          ...schedule,
          meetings: updatedMeetings,
        } as ApiResponse);
      } else {
        toast.error(
          'Error confirming slot. Please try again later or contact support',
        );
      }

      // eslint-disable-next-line no-console

      setDialogOpen(false);
    } catch (e) {
      toast.error("Couldn't confirm slot, please try again later");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      maxWidth={'lg'}
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false);
      }}
    >
      {schedulingOptions?.length > 0 && (
        <InviteLinkConfirm
          slotInviteLinkCard={
            <Stack spacing={2}>
              {schedulingOptions?.map((option, ind) => {
                return (
                  <OptionAvailableCard
                    key={option}
                    slotCardDate={option?.sessions?.map((ses, indOpt) => {
                      return (
                        <>
                          <AvailableOptionCardDate
                            isDateWrapVisible={
                              indOpt == 0 ||
                              !dayjs(
                                option.sessions[indOpt - 1]?.start_time,
                              ).isSame(ses.start_time, 'day')
                            }
                            textDate={dayjs(ses.start_time).format('DD')}
                            textDay={dayjs(ses.start_time).format('dddd')}
                            textMonth={dayjs(ses.start_time).format('MMM')}
                            key={ses.session_id}
                            slotOptionAvailable={
                              <>
                                <OptionAvailable
                                  textTime={`${dayjs(ses.start_time).format(
                                    'hh:mm A',
                                  )} - ${dayjs(ses.end_time).format(
                                    'hh:mm A',
                                  )}`}
                                  textTitle={ses.module_name}
                                  key={ind}
                                  isTitleVisible={true}
                                  isBreakVisible={false}
                                />
                                {ses.break_duration > 0 &&
                                  indOpt !== option.sessions.length - 1 && (
                                    <OptionAvailable
                                      key={ind}
                                      textTime={''}
                                      textBreakTime={
                                        `${ses.break_duration} Minutes` || ''
                                      }
                                      isTitleVisible={false}
                                      isBreakVisible={true}
                                    />
                                  )}
                              </>
                            }
                          />
                        </>
                      );
                    })}
                  />
                );
              })}
            </Stack>
          }
          onClickClose={{
            onClick: () => {
              setDialogOpen(false);
            },
          }}
          slotConfirmButton={
            <ButtonSuccessRegular
              isEndIcon={saving}
              slotEndIcon={
                <Stack height={'100%'}>
                  <LoaderGrey />
                </Stack>
              }
              wrapperProps={{
                style: {
                  width: '100%',
                  fontSize: '16px',
                },
              }}
              isDisabled={false}
              onClickButton={{
                onClick: () => {
                  if (!saving) handleConfirmSlot();
                },
              }}
              textLabel='Confirm'
            />
          }
        />
      )}
    </Dialog>
  );
}

export default ConfirmDialog;
