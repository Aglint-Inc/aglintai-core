import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { ButtonPrimarySmall } from '@/devlink';
import {
  AvailableOptionCardDate,
  InterviewConfirmed,
  OptionAvailable,
  OptionAvailableCard,
  SessionList,
} from '@/devlink2';
import CompanyLogo from '@/src/components/JobApplicationsDashboard/Common/CompanyLogo';
import { CalendarEvent } from '@/src/utils/schedule-utils/types';

import { ApiResponse } from '../type';
import IconScheduleType from '../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../AllSchedules/utils';

function InvitationConfirmed({ schedule }: { schedule: ApiResponse }) {
  return (
    <>
      <InterviewConfirmed
        slotCompanyLogo={
          <Stack height={'60px'}>
            <CompanyLogo
              companyName={schedule.recruiter.name}
              companyLogo={schedule.recruiter.logo}
            />
          </Stack>
        }
        textTitle={schedule.schedule.schedule_name}
        textMailSent={schedule.candidate.email}
        textMeetingPlatform={getScheduleType(schedule.schedule.schedule_type)}
        slotPlatformIcon={
          <IconScheduleType type={schedule.schedule.schedule_type} />
        }
        slotCardDate={
          <OptionAvailableCard
            isActive={true}
            slotCardDate={schedule?.schedule?.confirmed_option?.plans.map(
              (pl, ind) => {
                return (
                  <AvailableOptionCardDate
                    textDate={dayjs(pl.start_time).format('DD')}
                    textDay={dayjs(pl.start_time).format('dddd')}
                    textMonth={dayjs(pl.start_time).format('MMM')}
                    key={ind}
                    slotOptionAvailable={
                      <OptionAvailable
                        textTime={`${dayjs(pl.start_time).format(
                          'hh:mm A',
                        )} - ${dayjs(pl.end_time).format('hh:mm A')}`}
                        textTitle={pl.module_name}
                        key={ind}
                        isTitleVisible={!pl.isBreak}
                        isBreakVisible={pl.isBreak}
                        slotMember={
                          <Stack spacing={1}>
                            <Stack direction={'row'}>
                              <ButtonPrimarySmall
                                isDisabled={
                                  dayjs(pl.start_time).isAfter(
                                    dayjs().add(3, 'hour'),
                                  ) || dayjs().isAfter(dayjs(pl.end_time))
                                }
                                textLabel={'Join Meeting'}
                                onClickButton={{
                                  onClick: () => {
                                    window.open(
                                      (
                                        schedule.meetings.find(
                                          (meet) =>
                                            meet.module_id == pl.module_id,
                                        ).meeting_json as CalendarEvent
                                      ).hangoutLink,
                                      '_blank',
                                    );
                                  },
                                }}
                              />
                            </Stack>
                            <Typography variant='caption'>
                              Meeting link will get enabled 3 hours before
                              meeting
                            </Typography>
                          </Stack>
                        }
                      />
                    }
                  />
                );
              },
            )}
          />
        }
        onClickSupport={{
          onClick: () => {
            window.open(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${schedule.schedule.application_id}`,
              '_blank',
            );
          },
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
    </>
  );
}

export default InvitationConfirmed;
