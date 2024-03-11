import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import {
  AvailableOptionCardDate,
  OptionAvailable,
  OptionAvailableCard
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import { useSchedulingApplicationStore } from '../store';

function SchedulingOptionComp() {
  const schedulingOptions = useSchedulingApplicationStore(
    (state) => state.schedulingOptions
  );
  const members = useSchedulingApplicationStore((state) => state.members);
  return (
    <>
      {schedulingOptions?.map((option, ind) => {
        return (
          <OptionAvailableCard
            isActive={false}
            key={ind}
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
            })}
          />
        );
      })}
    </>
  );
}

export default SchedulingOptionComp;
