import { Dialog, Stack, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonPrimaryLarge, ButtonSuccessLarge } from '@/devlink';
import {
  AvailableOptionCardDate,
  InterviewConfirmed,
  InviteLinkConfirm,
  OpenInvitationLink,
  OptionAvailable,
  OptionAvailableCard,
  SessionList
} from '@/devlink2';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { ApiResponse } from './type';
import IconScheduleType from '../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../AllSchedules/utils';
import Loader from '../../Common/Loader';
import LoaderGrey from '../../Common/LoaderGrey';
import MuiAvatar from '../../Common/MuiAvatar';

function CandidateInvite() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<ApiResponse>(null);
  const [selectedSlot, setSelectedSlot] =
    useState<ApiResponse['schedulingOptions'][0]>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

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
        selectedSlot: selectedSlot
      });
      if (res.status === 200 && res.data) {
        schedule.schedule.confirmed_option = selectedSlot;
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
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Dialog
        maxWidth={'lg'}
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <InviteLinkConfirm
          slotInviteLinkCard={
            <OptionAvailableCard
              isActive={false}
              slotCardDate={selectedSlot?.transformedPlan.map((plan, ind) => {
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
                            textTime={`${dayjs(pl.start_time).format('hh:mm A')} - ${dayjs(pl.end_time).format('hh:mm A')}`}
                            textTitle={pl.module_name}
                            key={ind}
                            isTitleVisible={!pl.isBreak}
                            isBreakVisible={pl.isBreak}
                            slotMember={
                              <Stack
                                direction={'row'}
                                sx={{
                                  flexWrap: 'wrap',
                                  gap: 2.5
                                }}
                              >
                                {pl?.attended_inters?.map((int) => {
                                  const user = schedule.members.find(
                                    (member) => member.user_id === int.id
                                  );
                                  if (!user) return null;
                                  return (
                                    <Stack
                                      key={int.id}
                                      direction={'row'}
                                      spacing={1}
                                      sx={{
                                        textWrap: 'nowrap'
                                      }}
                                    >
                                      <MuiAvatar
                                        level={getFullName(
                                          user.first_name,
                                          user.last_name
                                        )}
                                        src={user?.profile_image}
                                        variant={'circular'}
                                        width={'24px'}
                                        height={'24px'}
                                        fontSize={'12px'}
                                      />
                                      <Typography
                                        variant={'body2'}
                                        color={'#000'}
                                      >
                                        {getFullName(
                                          user.first_name,
                                          user.last_name
                                        )}
                                      </Typography>
                                    </Stack>
                                  );
                                })}
                              </Stack>
                            }
                          />
                        );
                      })}
                    />
                  );
                });
              })}
            />
          }
          onClickClose={{
            onClick: () => {
              setDialogOpen(false);
            }
          }}
          slotConfirmButton={
            <ButtonSuccessLarge
              isEndIcon={saving}
              slotEndIcon={
                <Stack>
                  <LoaderGrey />
                </Stack>
              }
              wrapperProps={{
                style: {
                  width: '100%',
                  fontSize: '16px'
                }
              }}
              isDisabled={false}
              onClickButton={{
                onClick: () => {
                  if (!saving) handleConfirmSlot();
                }
              }}
              textLabel='Confirm'
            />
          }
        />
      </Dialog>
      {loading ? (
        <Loader />
      ) : !schedule?.schedule.confirmed_option ? (
        <OpenInvitationLink
          onClickAskOptions={{
            onClick: () => {
              setDialogOpen(true);
            }
          }}
          isNotFindingTextVisible={!selectedSlot}
          slotButtonPrimary={
            selectedSlot?.schedule_id && (
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
                                textTime={`${dayjs(pl.start_time).format('hh:mm A')} - ${dayjs(pl.end_time).format('hh:mm A')}`}
                                textTitle={pl.module_name}
                                key={ind}
                                isTitleVisible={!pl.isBreak}
                                isBreakVisible={pl.isBreak}
                                slotMember={
                                  <Stack
                                    direction={'row'}
                                    sx={{
                                      flexWrap: 'wrap',
                                      gap: 2.5
                                    }}
                                  >
                                    {pl?.attended_inters?.map((int) => {
                                      const user = schedule.members.find(
                                        (member) => member.user_id === int.id
                                      );
                                      if (!user) return null;
                                      return (
                                        <Stack
                                          key={int.id}
                                          direction={'row'}
                                          spacing={1}
                                          sx={{
                                            textWrap: 'nowrap'
                                          }}
                                        >
                                          <MuiAvatar
                                            level={getFullName(
                                              user.first_name,
                                              user.last_name
                                            )}
                                            src={user?.profile_image}
                                            variant={'circular'}
                                            width={'24px'}
                                            height={'24px'}
                                            fontSize={'12px'}
                                          />
                                          <Typography
                                            variant={'body2'}
                                            color={'#000'}
                                          >
                                            {getFullName(
                                              user.first_name,
                                              user.last_name
                                            )}
                                          </Typography>
                                        </Stack>
                                      );
                                    })}
                                  </Stack>
                                }
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
      ) : (
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
                              textTime={`${dayjs(pl.start_time).format('hh:mm A')} - ${dayjs(pl.end_time).format('hh:mm A')}`}
                              textTitle={pl.module_name}
                              key={ind}
                              isTitleVisible={!pl.isBreak}
                              isBreakVisible={pl.isBreak}
                              slotMember={
                                <Stack
                                  direction={'row'}
                                  sx={{
                                    flexWrap: 'wrap',
                                    gap: 2.5
                                  }}
                                >
                                  {pl?.attended_inters?.map((int) => {
                                    const user = schedule.members.find(
                                      (member) => member.user_id === int.id
                                    );
                                    if (!user) return null;
                                    return (
                                      <Stack
                                        key={int.id}
                                        direction={'row'}
                                        spacing={1}
                                        sx={{
                                          textWrap: 'nowrap'
                                        }}
                                      >
                                        <MuiAvatar
                                          level={getFullName(
                                            user.first_name,
                                            user.last_name
                                          )}
                                          src={user?.profile_image}
                                          variant={'circular'}
                                          width={'24px'}
                                          height={'24px'}
                                          fontSize={'12px'}
                                        />
                                        <Typography
                                          variant={'body2'}
                                          color={'#000'}
                                        >
                                          {getFullName(
                                            user.first_name,
                                            user.last_name
                                          )}
                                        </Typography>
                                      </Stack>
                                    );
                                  })}
                                </Stack>
                              }
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
          slotSessionList={schedule.schedule.confirmed_option.plan
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
      )}
    </Stack>
  );
}

export default CandidateInvite;
