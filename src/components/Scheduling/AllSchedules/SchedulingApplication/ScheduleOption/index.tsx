import { Badge, Stack, Typography } from '@mui/material';
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

function SchedulingOptionComp({
  isBadgeVisible = false
}: {
  isBadgeVisible?: boolean;
}) {
  const schedulingOptions = useSchedulingApplicationStore(
    (state) => state.schedulingOptions
  );
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
                          slotMember={
                            <Stack
                              direction={'row'}
                              sx={{
                                flexWrap: 'wrap',
                                gap: 2.5
                              }}
                            >
                              {pl.selectedIntervs?.map((int) => {
                                return (
                                  <Stack
                                    key={int.interv_id}
                                    direction={'row'}
                                    spacing={1}
                                    sx={{
                                      textWrap: 'nowrap'
                                    }}
                                  >
                                    <MuiAvatar
                                      level={getFullName(int.name, '')}
                                      src={int?.profile_img}
                                      variant={'circular'}
                                      width={'24px'}
                                      height={'24px'}
                                      fontSize={'12px'}
                                    />

                                    <Typography
                                      variant={'body2'}
                                      color={'#000'}
                                    >
                                      {getFullName(int.name, '')}
                                    </Typography>
                                  </Stack>
                                );
                              })}
                              {pl.shadowIntervs?.map((int) => {
                                return (
                                  <Stack
                                    key={int.interv_id}
                                    direction={'row'}
                                    spacing={1}
                                    sx={{
                                      textWrap: 'nowrap'
                                    }}
                                  >
                                    <Badge
                                      key={int.interv_id}
                                      color='secondary'
                                      overlap='circular'
                                      badgeContent={<>S</>}
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                      }}
                                      sx={{
                                        '& .MuiBadge-badge': {
                                          fontSize: '6px',
                                          height: '14px',
                                          minWidth: '14px',
                                          display: isBadgeVisible
                                            ? 'block'
                                            : 'none'
                                        }
                                      }}
                                    >
                                      <MuiAvatar
                                        level={getFullName(int.name, '')}
                                        src={int?.profile_img}
                                        variant={'circular'}
                                        width={'20px'}
                                        height={'20px'}
                                        fontSize={'12px'}
                                      />
                                    </Badge>

                                    <Typography
                                      variant={'body2'}
                                      color={'#000'}
                                    >
                                      {getFullName(int.name, '')}
                                    </Typography>
                                  </Stack>
                                );
                              })}
                              {pl.revShadowIntervs?.map((int) => {
                                return (
                                  <Stack
                                    key={int.interv_id}
                                    direction={'row'}
                                    spacing={1}
                                    sx={{
                                      textWrap: 'nowrap'
                                    }}
                                  >
                                    <Badge
                                      key={int.interv_id}
                                      color='secondary'
                                      overlap='circular'
                                      badgeContent={<>R</>}
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                      }}
                                      sx={{
                                        '& .MuiBadge-badge': {
                                          fontSize: '6px',
                                          height: '14px',
                                          minWidth: '14px',
                                          display: isBadgeVisible
                                            ? 'block'
                                            : 'none'
                                        }
                                      }}
                                    >
                                      <MuiAvatar
                                        level={getFullName(int.name, '')}
                                        src={int?.profile_img}
                                        variant={'circular'}
                                        width={'24px'}
                                        height={'24px'}
                                        fontSize={'12px'}
                                      />
                                    </Badge>

                                    <Typography
                                      variant={'body2'}
                                      color={'#000'}
                                    >
                                      {getFullName(int.name, '')}
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
