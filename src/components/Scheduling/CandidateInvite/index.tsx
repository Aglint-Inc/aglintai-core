import { Avatar, AvatarGroup, Dialog, Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  ConfirmSlotPop,
  InterviewConfirmed,
  LoadedSlotPill,
  LoadedSlots,
  OpenedInvitationLink,
} from '@/devlink';
import toast from '@/src/utils/toast';

import { ApiResponse } from './type';
import IconScheduleType from '../Interview/ListCard/Icon';
import { TimeSlot } from '../Interview/utils';
import Icon from '../../Common/Icons/Icon';
import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';

function CandidateInvite() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<ApiResponse>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (router.isReady && router.query.schedule_id) initialFetch();
  }, [router.isReady]);

  const initialFetch = async () => {
    try {
      const res = await axios.post('/api/scheduling/invite', {
        id: router.query.schedule_id,
      });
      if (res.status === 200 && res.data) {
        setSchedule(res.data);
      }
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };

  const scheduleSlots = schedule?.selected_slots as unknown as {
    date: string;
    slots: TimeSlot[];
  }[];

  const handleConfirmSlot = async () => {
    try {
      const res = await axios.post('/api/scheduling/confirm', {
        id: router.query.schedule_id,
        selectedSlot: selectedSlot,
        company_logo: schedule?.interview_panel?.recruiter?.logo,
        company_name: schedule?.interview_panel?.recruiter?.name,
        schedule_name: schedule?.schedule_name,
      });
      if (res.status === 200 && res.data) {
        setSchedule({
          ...schedule,
          schedule_time: selectedSlot as any,
          status: 'confirmed',
        });
        setDialogOpen(false);
      }
    } catch (e) {
      toast.error("Couldn't confirm slot, please try again later");
    }
  };

  return (
    <Stack
      sx={{
        overflow: 'scroll',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Dialog
        open={dialogOpen}
        fullWidth={true}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <ConfirmSlotPop
          onClickClose={{
            onClick: () => {
              setDialogOpen(false);
            },
          }}
          onClickConfirm={{
            onClick: () => {
              handleConfirmSlot();
            },
          }}
          textDate={dayjs(selectedSlot?.endTime).format('DD')}
          textDay={dayjs(selectedSlot?.endTime).format('dddd')}
          textMonth={dayjs(selectedSlot?.endTime).format('MMM')}
          textPlatformName={
            schedule?.schedule_type == 'zoom'
              ? 'Zoom'
              : schedule?.schedule_type == 'in_person_meeting'
                ? 'In Person Meeting'
                : schedule?.schedule_type == 'phone_call'
                  ? 'Phone Call'
                  : 'Google Meet'
          }
          slotPlatformLogo={<IconScheduleType type={schedule?.schedule_type} />}
          textTime={`${dayjs(selectedSlot?.startTime).format('hh:mm A')} - ${dayjs(selectedSlot?.endTime).format('hh:mm A')}`}
          textTitle={schedule?.schedule_name}
        />
      </Dialog>
      {loading ? (
        <Loader />
      ) : !schedule.schedule_time ? (
        <OpenedInvitationLink
          isProceedDisable={!selectedSlot}
          onClickProceed={{
            onClick: () => {
              setDialogOpen(true);
            },
          }}
          textTitle={schedule?.schedule_name}
          slotPlatformLogo={<IconScheduleType type={schedule?.schedule_type} />}
          textPlatform={
            schedule?.schedule_type == 'zoom'
              ? 'Zoom'
              : schedule?.schedule_type == 'in_person_meeting'
                ? 'In Person Meeting'
                : schedule?.schedule_type == 'phone_call'
                  ? 'Phone Call'
                  : 'Google Meet'
          }
          textDesc={`Hi ${schedule?.applications?.candidates?.first_name}, Choose a time slot that suits you best and take the first step towards joining our team. We look forward to meeting you!`}
          textDuration={schedule?.duration / 60 + ' minutes'}
          slotTable={
            <Stack
              justifyContent={'center'}
              maxWidth={'620px'}
              p={'40px'}
              spacing={2}
            >
              {scheduleSlots
                ?.filter((f) => f.slots.filter((s) => s.isSelected).length > 0)
                .map((sch) => {
                  return (
                    <>
                      <LoadedSlots
                        key={dayjs(sch.date).format('DD dddd')}
                        slotLoadedSlotPill={sch.slots
                          .filter((slot) => slot.isSelected)
                          .map((slot) => {
                            return (
                              <>
                                <LoadedSlotPill
                                  isNotSelected={selectedSlot !== slot}
                                  isSelectedActive={selectedSlot === slot}
                                  onClickPill={{
                                    onClick: () => {
                                      if (selectedSlot === slot) {
                                        setSelectedSlot(null);
                                      } else {
                                        setSelectedSlot(slot);
                                      }
                                    },
                                  }}
                                  key={slot.startTime}
                                  textTime={`${dayjs(slot.startTime).format('hh:mm')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
                                  slotImage={
                                    <AvatarGroup
                                      sx={{
                                        '& .MuiAvatar-root': {
                                          width: '24px',
                                          height: '24px',
                                          fontSize: '8px',
                                        },
                                      }}
                                      total={slot.user_ids.length}
                                    >
                                      {slot.user_ids
                                        .slice(0, 5)
                                        .map((user_id) => {
                                          const member = schedule?.users.filter(
                                            (member) =>
                                              member.user_id === user_id,
                                          )[0];
                                          return (
                                            <MuiAvatar
                                              key={user_id}
                                              src={member?.profile_image}
                                              level={member?.first_name}
                                              variant='circular'
                                              height='24px'
                                              width='24px'
                                              fontSize='8px'
                                            />
                                          );
                                        })}
                                    </AvatarGroup>
                                  }
                                />
                              </>
                            );
                          })}
                        textDay={dayjs(sch.date).format('MMM D dddd')}
                      />
                    </>
                  );
                })}
            </Stack>
          }
          slotCompanyImage={
            <Avatar
              src={schedule?.interview_panel?.recruiter?.logo}
              variant='rounded'
              sx={{
                width: '60px',
                height: '60px',
                background: '#fff',
                '& .MuiAvatar-img ': {
                  objectFit: 'contain',
                },
              }}
            >
              <Icon
                variant='CompanyOutlined'
                height='24'
                width='24'
                color='#87929D'
              />
            </Avatar>
          }
        />
      ) : (
        <InterviewConfirmed
          textDate={dayjs(schedule?.schedule_time?.endTime).format('DD')}
          textDay={dayjs(schedule?.schedule_time?.endTime).format('dddd')}
          textMonth={dayjs(schedule?.schedule_time?.endTime).format('MMM')}
          textPlatformName={
            schedule?.schedule_type == 'zoom'
              ? 'Zoom'
              : schedule?.schedule_type == 'in_person_meeting'
                ? 'In Person Meeting'
                : schedule?.schedule_type == 'phone_call'
                  ? 'Phone Call'
                  : 'Google Meet'
          }
          slotPlatformLogo={<IconScheduleType type={schedule?.schedule_type} />}
          textTime={`${dayjs(schedule?.schedule_time?.startTime).format('hh:mm A')} - ${dayjs(schedule?.schedule_time?.endTime).format('hh:mm A')}`}
          slotCompanyLogo={
            <Avatar
              src={schedule?.interview_panel?.recruiter?.logo}
              variant='rounded'
              sx={{
                width: '60px',
                height: '60px',
                background: '#fff',
                '& .MuiAvatar-img ': {
                  objectFit: 'contain',
                },
              }}
            >
              <Icon
                variant='CompanyOutlined'
                height='24'
                width='24'
                color='#87929D'
              />
            </Avatar>
          }
          textSentMail={`Information has sent to ${schedule?.applications?.candidates?.email}`}
          onClickContactSupport={{
            onClick: () => {
              window.open(`mailto:customersuccess@aglinthq.com`);
            },
          }}
          textTitle={schedule?.schedule_name}
        />
      )}
    </Stack>
  );
}

export default CandidateInvite;
