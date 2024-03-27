/* eslint-disable no-unused-vars */
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';

import { ButtonPrimaryLarge } from '@/devlink';
import {
  AvailableOptionCardDate,
  EmptyGeneral,
  OpenInvitationLink,
  OptionAvailable,
  OptionAvailableCard,
} from '@/devlink2';
import CompanyLogo from '@/src/components/JobApplicationsDashboard/Common/CompanyLogo';

import {
  filterRecordsByDate,
  getAllUniqueDates,
} from '../../AllSchedules/utils';
import { ApiResponse } from '../type';

dayjs.extend(utc);
dayjs.extend(timezone);

function InvitationPending({
  schedule,
  setChangeTime,
  selectedSlot,
  setDialogOpen,
  setSelectedSlot,
}: {
  schedule: ApiResponse;
  setChangeTime: (value: boolean) => void;
  selectedSlot: string;
  setDialogOpen: (value: boolean) => void;
  setSelectedSlot: (value: string) => void;
}) {
  const schedulingOptions = schedule.schedulingOptions.map((option) => ({
    ...option,
    plans: option.plans.map((plan) => ({
      ...plan,
      start_time: dayjs(plan.start_time).tz(dayjs.tz.guess()).toISOString(),
      end_time: dayjs(plan.end_time).tz(dayjs.tz.guess()).toISOString(),
    })),
  }));

  const uniqueDates = getAllUniqueDates({
    records: schedulingOptions,
  }) as string[];

  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0]);

  const filteredRecords = selectedDate
    ? filterRecordsByDate({ records: schedulingOptions, date: selectedDate })
    : schedulingOptions;

  return (
    <>
      {filteredRecords.length < 0}
      <OpenInvitationLink
        slotTimeFixer={
          <Stack
            gap={2}
            direction={'row'}
            sx={{
              flexWrap: 'wrap',
            }}
          >
            {uniqueDates.map((date, ind) => (
              <Stack
                direction={'row'}
                key={date}
                sx={{
                  cursor: 'pointer',
                  border: '1px solid #E9EBED',
                  backgroundColor: selectedDate === date ? '#F7F9FB' : 'white',
                  padding: '4px 12px',
                  borderRadius: '10px',
                }}
                onClick={() => {
                  setSelectedDate(date);
                }}
                spacing={1}
              >
                <Typography variant='body2' fontWeight={700}>
                  {dayjs(date).format('DD')}
                </Typography>
                <Typography variant='body2'>
                  {dayjs(date).format('MMMM')}
                </Typography>
                <Typography variant='body2'>
                  {dayjs(date).format('YYYY')}
                </Typography>
              </Stack>
            ))}
            {filteredRecords.length === 0 && (
              <Stack width={'100%'}>
                <EmptyGeneral textEmpt={'No Meeting Found'} />
              </Stack>
            )}
          </Stack>
        }
        slotCompanyLogo={
          <Stack height={'60px'}>
            <CompanyLogo
              companyName={schedule.recruiter.name}
              companyLogo={schedule.recruiter.logo}
            />
          </Stack>
        }
        onClickAskOptions={{
          onClick: () => {
            setChangeTime(true);
          },
        }}
        isNotFindingTextVisible={schedule.schedule.is_get_more_option}
        isSelected={Boolean(selectedSlot)}
        slotButtonPrimary={
          <Stack width={'100%'}>
            <ButtonPrimaryLarge
              onClickButton={{
                onClick: () => {
                  setDialogOpen(true);
                },
              }}
              textLabel={'Proceed'}
            />
          </Stack>
        }
        textDesc={`Hi ${schedule?.candidate?.first_name}, pick an option that suits you best and take the first step towards joining our team. We look forward to meeting you!`}
        slotInviteLinkCard={filteredRecords?.map((option, ind) => {
          return (
            <Stack
              key={ind}
              onClick={() => {
                setSelectedSlot(option.id);
              }}
              sx={{ cursor: 'pointer' }}
            >
              <OptionAvailableCard
                isActive={selectedSlot === option.id}
                slotCardDate={option.plans.map((pl, indOpt) => {
                  return (
                    <AvailableOptionCardDate
                      isDateWrapVisible={
                        indOpt == 0 ||
                        (!pl.isBreak &&
                          !dayjs(option.plans[indOpt - 1]?.start_time).isSame(
                            pl.start_time,
                            'day',
                          ))
                      }
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
                          textBreakTime={
                            pl.isBreak ? `${pl.duration} Minutes` : ''
                          }
                          isTitleVisible={!pl.isBreak}
                          isBreakVisible={pl.isBreak}
                        />
                      }
                    />
                  );
                })}
              />
            </Stack>
          );
        })}
      />
    </>
  );
}

export default InvitationPending;
