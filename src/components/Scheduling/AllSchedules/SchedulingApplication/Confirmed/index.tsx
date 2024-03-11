import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import {
  AvailableOptionCardDate,
  OptionAvailable,
  OptionAvailableCard,
  ScheduleInfoConfirmed
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import CandidateDetailsJobDrawer from '../CandidateDetailsJob';
import { setIsViewProfileOpen, useSchedulingApplicationStore } from '../store';

function ConfirmedComp() {
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication
  );
  const members = useSchedulingApplicationStore((state) => state.members);

  return (
    <>
      <CandidateDetailsJobDrawer />
      <ScheduleInfoConfirmed
        onClickViewProfile={{
          onClick: () => {
            setIsViewProfileOpen(true);
          }
        }}
        slotScheduleInfoCard={
          <OptionAvailableCard
            isActive={false}
            slotCardDate={selectedApplication.schedule.confirmed_option?.transformedPlan.map(
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
                                  const user = members.find(
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
        textName={getFullName(
          selectedApplication.candidates.first_name,
          selectedApplication.candidates.last_name
        )}
        textRole={selectedApplication.public_jobs.job_title}
        textLocation={selectedApplication.public_jobs.location || '--'}
        slotProfileImage={
          <MuiAvatar
            level={getFullName(
              selectedApplication?.candidates.first_name,
              selectedApplication?.candidates.last_name
            )}
            src={selectedApplication?.candidates.avatar}
            variant={'circular'}
            width={'100%'}
            height={'100%'}
            fontSize={'12px'}
          />
        }
      />
    </>
  );
}

export default ConfirmedComp;
