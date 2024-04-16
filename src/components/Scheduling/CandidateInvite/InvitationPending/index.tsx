/* eslint-disable no-unused-vars */
import { LinearProgress, Stack, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { set } from 'lodash';
import { useEffect, useState } from 'react';

import { ButtonPrimaryLarge } from '@/devlink';
import {
  AvailableOptionCardDate,
  DatePill,
  DaysPill,
  EmptyGeneral,
  OpenInvitationLink,
  OptionAvailable,
  OptionAvailableCard,
} from '@/devlink2';
import Loader from '@/src/components/Common/Loader';
import CompanyLogo from '@/src/components/JobApplicationsDashboard/Common/CompanyLogo';
import { SessionsCombType } from '@/src/utils/scheduling_v1/types';
import toast from '@/src/utils/toast';

import ConfirmDialog from '../ConfirmDialog';
import { ApiResponse } from '../type';

dayjs.extend(utc);
dayjs.extend(timezone);

type BookApiBodyParams = {
  candidate_plan: {
    sessions: {
      session_id: string;
      start_time: string;
      end_time: string;
    }[];
  }[];
  recruiter_id: string;
  user_tz: string;
};

function InvitationPending({
  schedule,
  setSchedule,
}: {
  schedule: ApiResponse;
  setSchedule: (schedule: ApiResponse) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] =
    useState<ApiResponse['dateRange'][0]>();
  const [allScheduleOptions, setAllScheduleOptions] = useState<
    SessionsCombType[][]
  >([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetchSlots();
    }
  }, [selectedDate]);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      setStep(0);
      setSelectedSlots([]);
      const resSchOpt = await axios.post(
        `/api/scheduling/v1/find_interview_slots`,
        {
          session_ids: schedule.meetings.map(
            (meeting) => meeting.interview_session.id,
          ),
          recruiter_id: schedule.recruiter.id,
          start_date: selectedDate.start_date,
          end_date: selectedDate.end_date || selectedDate.start_date,
          user_tz: dayjs.tz.guess(),
        },
      );
      if (resSchOpt.status !== 200) {
        throw new Error('Failed to fetch slots');
      }
      setAllScheduleOptions(
        resSchOpt.data.filter((subArr) => subArr.length > 0),
      );
    } catch (e) {
      toast.error('Failed to fetch slots');
    } finally {
      setLoading(false);
    }
  };
  const [dialogOpen, setDialogOpen] = useState(false);

  const schedulingOptions = allScheduleOptions[Number(step)];

  return (
    <>
      <ConfirmDialog
        dialogOpen={dialogOpen}
        schedule={schedule}
        allScheduleOptions={allScheduleOptions}
        selectedSlots={selectedSlots}
        setDialogOpen={setDialogOpen}
        setSchedule={setSchedule}
      />
      <OpenInvitationLink
        slotDatePill={
          <>
            {schedule.dateRange.map((date, ind) => {
              return (
                <DatePill
                  key={ind + 'date'}
                  textDate={`${dayjs(date.start_date, 'DD/MM/YYYY').format(
                    'DD',
                  )}${
                    date.end_date
                      ? ' - ' + dayjs(date.end_date, 'DD/MM/YYYY').format('DD')
                      : ''
                  } ${dayjs(date.start_date, 'DD/MM/YYYY').format(
                    'MMMM YYYY',
                  )}`}
                  onClickDate={{
                    onClick: () => {
                      if (!loading) {
                        setSelectedDate(date);
                      }
                    },
                  }}
                  isActive={selectedDate === date}
                />
              );
            })}
          </>
        }
        slotDaysPill={
          <>
            {!loading &&
              allScheduleOptions.length > 1 &&
              allScheduleOptions.length === schedule.numberOfDays &&
              Array.from({ length: allScheduleOptions.length }).map(
                (_, ind) => {
                  return (
                    <DaysPill
                      key={ind + 'day'}
                      onClickDay={{
                        onClick: () => {
                          setStep(ind);
                        },
                      }}
                      isActive={step === ind}
                      textDay={`Day ${ind + 1}`}
                    />
                  );
                },
              )}
          </>
        }
        slotCompanyLogo={
          <Stack height={'60px'}>
            <CompanyLogo
              companyName={schedule.recruiter.name}
              companyLogo={schedule.recruiter.logo}
              borderRadius={4}
            />
          </Stack>
        }
        isNotFindingTextVisible={schedule.schedule.is_get_more_option}
        isSelected={
          !loading && allScheduleOptions.length === schedule.numberOfDays
        }
        slotButtonPrimary={
          <Stack width={'100%'}>
            <ButtonPrimaryLarge
              onClickButton={{
                onClick: () => {
                  if (
                    schedule.numberOfDays ===
                    selectedSlots.filter((f) => Boolean(f)).length
                  ) {
                    setDialogOpen(true);
                  } else {
                    if (step < schedule.numberOfDays) {
                      setStep((prev) => prev + 1);
                    } else {
                      toast.error('Please select all slots to proceed');
                    }
                  }
                },
              }}
              textLabel={'Proceed'}
            />
          </Stack>
        }
        textDesc={`Hi ${schedule?.candidate?.first_name}, pick an option that suits you best and take the first step towards joining our team. We look forward to meeting you!`}
        slotInviteLinkCard={
          !loading ? (
            allScheduleOptions.length === schedule.numberOfDays ? (
              schedulingOptions?.map((option, ind) => {
                return (
                  <Stack
                    key={ind + 'main'}
                    onClick={() => {
                      selectedSlots[Number(step)] = option.slot_comb_id;
                      setSelectedSlots([...selectedSlots]);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <OptionAvailableCard
                      isActive={
                        selectedSlots[Number(step)] === option.slot_comb_id
                      }
                      slotCardDate={option.sessions.map((ses, indOpt) => {
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
                  </Stack>
                );
              })
            ) : (
              'No slots available for the selected date range'
            )
          ) : (
            <LinearProgress color='info' />
          )
        }
      />
    </>
  );
}

export default InvitationPending;
