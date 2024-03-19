import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonPrimaryLarge, Page404 } from '@/devlink';
import {
  AvailableOptionCardDate,
  InterviewConfirmed,
  OpenInvitationLink,
  OptionAvailable,
  OptionAvailableCard,
  SessionList
} from '@/devlink2';
import toast from '@/src/utils/toast';

import CheckAvailibility from './CheckAvailibility';
import ConfirmDialog from './ConfirmDialog';
import { ApiResponse } from './type';
import IconScheduleType from '../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../AllSchedules/utils';
import Loader from '../../Common/Loader';

function CandidateInvite() {
  const router = useRouter();
  const currentDate = dayjs();
  const sevenDays = currentDate.add(7, 'day');
  const [schedule, setSchedule] = useState<ApiResponse>(null);
  const [selectedSlot, setSelectedSlot] =
    useState<ApiResponse['schedulingOptions'][0]>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [changeTime, setChangeTime] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: currentDate.toISOString(),
    end_date: sevenDays.toISOString()
  });

  useEffect(() => {
    if (router.isReady && router.query.schedule_id) initialFetch();
  }, [router.isReady]);

  const initialFetch = async () => {
    try {
      const res = await axios.post('/api/scheduling/invite', {
        id: router.query.schedule_id
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

  const handleConfirmSlot = async () => {
    try {
      setSaving(true);
      const res = await axios.post('/api/scheduling/confirm', {
        id: router.query.schedule_id,
        selectedSlot: selectedSlot,
        schedule_name: schedule.schedule.schedule_name,
        company_logo: schedule.recruiter.logo,
        company_name: schedule.recruiter.name,
        candidate_email: 'admin@aglinthq.com'
      });
      if (res.status === 200 && res.data) {
        schedule.schedule.confirmed_option = selectedSlot;
        schedule.schedule.status = 'confirmed';
        setSchedule({
          ...schedule
        });
        setDialogOpen(false);
      }
    } catch (e) {
      toast.error("Couldn't confirm slot, please try again later");
    } finally {
      setSaving(false);
    }
  };

  const schedulingOptions = schedule?.schedulingOptions;

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <ConfirmDialog
        dialogOpen={dialogOpen}
        handleConfirmSlot={handleConfirmSlot}
        saving={saving}
        schedule={schedule}
        selectedSlot={selectedSlot}
        setDialogOpen={setDialogOpen}
      />
      <CheckAvailibility
        changeTime={changeTime}
        setChangeTime={setChangeTime}
        dateRange={dateRange}
        setDateRange={setDateRange}
        schedule={schedule}
        setSchedule={setSchedule}
      />

      {loading ? (
        <Stack height={'100vh'} width={'100%'}>
          <Loader />
        </Stack>
      ) : schedule?.schedule.status == 'pending' ? (
        <OpenInvitationLink
          onClickAskOptions={{
            onClick: () => {
              setChangeTime(true);
            }
          }}
          isNotFindingTextVisible={!selectedSlot}
          slotButtonPrimary={
            selectedSlot?.id && (
              <Stack width={'100%'}>
                <ButtonPrimaryLarge
                  onClickButton={{
                    onClick: () => {
                      setDialogOpen(true);
                    }
                  }}
                  textLabel={'Proceed'}
                />
              </Stack>
            )
          }
          textDesc={`Hi ${schedule?.candidate?.first_name}, pick an option that suits you best and take the first step towards joining our team. We look forward to meeting you!`}
          slotInviteLinkCard={schedulingOptions?.map((option, ind) => {
            return (
              <Stack
                key={ind}
                onClick={() => {
                  setSelectedSlot(option);
                }}
                sx={{ cursor: 'pointer' }}
              >
                <OptionAvailableCard
                  isActive={selectedSlot === option}
                  slotCardDate={option.transformedPlan.map((plan, ind) => {
                    return Object.entries(plan).map(([date, events]) => {
                      return (
                        <AvailableOptionCardDate
                          textDate={dayjs(date).format('DD')}
                          textDay={dayjs(date).format('dddd')}
                          textMonth={dayjs(date).format('MMM')}
                          key={ind}
                          slotOptionAvailable={events.map((pl, ind) => {
                            return (
                              <OptionAvailable
                                textTime={`${dayjs(pl.start_time).format(
                                  'hh:mm A'
                                )} - ${dayjs(pl.end_time).format('hh:mm A')}`}
                                textTitle={pl.module_name}
                                key={ind}
                                textBreakTime={
                                  pl.isBreak ? `${pl.duration} Minutes` : ''
                                }
                                isTitleVisible={!pl.isBreak}
                                isBreakVisible={pl.isBreak}
                              />
                            );
                          })}
                        />
                      );
                    });
                  })}
                />
              </Stack>
            );
          })}
        />
      ) : schedule?.schedule.status == 'confirmed' ? (
        <InterviewConfirmed
          textTitle={schedule.schedule.schedule_name}
          textMailSent={schedule.candidate.email}
          textMeetingPlatform={getScheduleType(schedule.schedule.schedule_type)}
          slotPlatformIcon={
            <IconScheduleType type={schedule.schedule.schedule_type} />
          }
          slotCardDate={
            <OptionAvailableCard
              isActive={false}
              slotCardDate={schedule?.schedule?.confirmed_option?.transformedPlan.map(
                (plan, ind) => {
                  return Object.entries(plan).map(([date, events]) => {
                    return (
                      <AvailableOptionCardDate
                        textDate={dayjs(date).format('DD')}
                        textDay={dayjs(date).format('dddd')}
                        textMonth={dayjs(date).format('MMM')}
                        key={ind}
                        slotOptionAvailable={events.map((pl, ind) => {
                          return (
                            <OptionAvailable
                              textTime={`${dayjs(pl.start_time).format(
                                'hh:mm A'
                              )} - ${dayjs(pl.end_time).format('hh:mm A')}`}
                              textTitle={pl.module_name}
                              key={ind}
                              isTitleVisible={!pl.isBreak}
                              isBreakVisible={pl.isBreak}
                            />
                          );
                        })}
                      />
                    );
                  });
                }
              )}
            />
          }
          onClickSupport={{
            onClick: () => {
              window.open(
                `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${schedule.schedule.application_id}`,
                '_blank'
              );
            }
          }}
          slotSessionList={schedule.schedule.confirmed_option.plans
            .filter((pl) => !pl.isBreak)
            .map((plan, ind) => {
              return (
                <SessionList
                  key={ind}
                  textDuration={plan.duration + ' Minutes'}
                  textSession={plan.module_name}
                />
              );
            })}
        />
      ) : (
        <Page404 />
      )}
    </Stack>
  );
}

export default CandidateInvite;
