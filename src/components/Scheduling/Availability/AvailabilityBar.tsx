import { CircularProgress, IconButton, Popover, Stack } from '@mui/material';
import { TimeIcon } from '@mui/x-date-pickers';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import utc from 'dayjs/plugin/utc';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { LoadedSlotPill } from '@/devlink';
import { AvailableSlots, CheckAvailabilityBar, DurationPop } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { InterviewerGroup } from './Availability';
import {
  AvalabilitySlotType,
  InterviewerAvailabliity,
  InterviewerType,
  MergedEvents,
} from './availability.types';
import {
  setDateRangeTableView,
  setDateRangeView,
  setInterviewers,
  setIsisCalenderLoading,
  setTimeRange,
  setTimeSlot,
  setTimeZone,
  useAvailableStore,
} from './store';
import TimeZone from './TimeZone';
import { mergeInterviewerEvents } from './utils';
import {
  convertFromJSON,
  convertToJSON,
  fetchAvailSlots,
  fetchSavedInts,
  mergeSavedAndAvailableSlots,
} from './utils2';
import SpecializedDatePicker from '../../Common/SpecializedDatePicker';
import SpecializedTimePicker from '../../Common/SpecializedTimePicker';
import UITextField from '../../Common/UITextField';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

dayjs.extend(utc);
dayjs.extend(timezone);

const AvailabilityBar = () => {
  const dateRangeView = useAvailableStore((state) => state.dateRangeView);
  const timeZone = useAvailableStore((state) => state.timeZone);
  const timeSlot = useAvailableStore((state) => state.timeSlot);
  const interviewers = useAvailableStore((state) => state.interviewers);
  const isInitialising = useAvailableStore((state) => state.isInitialising);
  const timeRange = useAvailableStore((state) => state.timeRange);
  const [checkedSlots, setCheckedSlots] = useState<string[]>([]);
  const [showAvail, setShowAvail] = useState(false);
  const [mergedEvents, setMergedEvents] = useState<MergedEvents | null>(null);
  const [timeZoneLocal, setTimeZoneLocal] = useState(timeZone);
  const [timeSlotLocal, setTimeSlotLocal] = useState(timeSlot);
  const [dateRangeViewLocal, setDateRangeViewLocal] = useState(dateRangeView);
  const [checkAvailBtnStatus, setCheckAvailBtnStatus] = useState<
    '' | 'loading' | 'loaded' | 'error'
  >('');
  const [confirmBtnStatus, setConfirmBtnStatus] = useState<
    '' | 'loading' | 'loaded' | 'error'
  >('');
  const [timeRangeLocal, setTimeRangeLocal] = useState(timeRange);
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();

  const handleCheckAvailability = async () => {
    try {
      setCheckedSlots([]);
      setCheckAvailBtnStatus('loading');
      setIsisCalenderLoading(true);
      setShowAvail(false);
      if (
        timeZone.value === timeZoneLocal.value &&
        dayjs(dateRangeView.startDate).isSame(
          dateRangeViewLocal.startDate,
          'D',
        ) &&
        dayjs(dateRangeView.endDate).isSame(dateRangeViewLocal.endDate, 'D') &&
        timeSlot === timeSlotLocal
      ) {
        const result = mergeInterviewerEvents(
          interviewers,
          timeSlotLocal,
          timeRangeLocal,
        );
        setMergedEvents(result);
      } else {
        let intSavedSlots = await fetchSavedInts(interviewers);
        const clonedInters = cloneDeep(interviewers);
        let intAvalableSlots = await fetchAvailSlots(
          clonedInters,
          timeSlotLocal,
          dateRangeViewLocal,
          timeRangeLocal,
        );
        const finalINts = mergeSavedAndAvailableSlots(
          intAvalableSlots,
          intSavedSlots,
          dateRangeViewLocal,
        );
        const result = mergeInterviewerEvents(
          finalINts,
          timeSlotLocal,
          timeRangeLocal,
        );
        setMergedEvents(result);
        setTimeZone(timeZoneLocal);
        setDateRangeView(dateRangeViewLocal);
        setTimeSlot(timeSlotLocal);
        setInterviewers(finalINts);
        setTimeRange(timeRangeLocal);
      }
      setShowAvail(true);
      if (
        dayDiffCnt(dateRangeViewLocal.startDate, dateRangeViewLocal.endDate) >=
        5
      ) {
        setDateRangeTableView({
          startDate: dateRangeViewLocal.startDate,
          endDate: dayjs(dateRangeViewLocal.startDate).add(4, 'day').toDate(),
        });
      } else {
        setDateRangeTableView({
          startDate: dateRangeViewLocal.startDate,
          endDate: dateRangeViewLocal.endDate,
        });
      }
    } catch (error) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsisCalenderLoading(false);
      setCheckAvailBtnStatus('loaded');
    }
  };

  const handleConfirmSlots = async () => {
    try {
      setConfirmBtnStatus('loading');
      let mapInts = new Map();
      let savedInts = await await fetchSavedInts(interviewers);

      let intSlotAvails = savedInts.map((savedInt) => {
        const avail = (savedInt.slots?.find(
          (av) => av.timeDuration === timeSlot,
        )?.availability ?? {}) as InterviewerAvailabliity['availability'];

        return {
          intId: savedInt.interviewerId,
          availability: avail,
          cntConfirmed: 0,
          cntRequested: 0,
          timeDuration: timeSlot,
        };
      });
      for (let slot of checkedSlots) {
        const [dateKey, startTime, endTime] = slot.split('_');
        const slotInterviewers =
          mergedEvents[String(dateKey)][`${startTime}_${endTime}`];
        for (let int of slotInterviewers.slots) {
          intSlotAvails = intSlotAvails.map((intslot) => {
            if (int.interviewerId === intslot.intId) {
              if (!Object.hasOwn(intslot.availability, dateKey)) {
                intslot.availability[String(dateKey)] = [];
              }
              mapInts.set(intslot.intId, int);
              let timeSlot: AvalabilitySlotType = {
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                status: 'requested',
              };
              intslot.availability[String(dateKey)].push(timeSlot);
            }
            return intslot;
          });
        }
      }
      for (let savedInt of savedInts) {
        if (!savedInt.slots) {
          savedInt.slots = [];
        }
        if (!savedInt.slots.find((a) => a.timeDuration === timeSlot)) {
          let avail = intSlotAvails.find(
            (int) => int.intId === savedInt.interviewerId,
          ).availability;
          savedInt.slots.push({
            availability: avail,
            timeDuration: timeSlot,
            cntConfirmed: 0,
            cntRequested: 0,
          });
        } else {
          savedInt.slots = savedInt.slots.map((savedAvail) => {
            if (savedAvail.timeDuration === timeSlot) {
              savedAvail.availability = intSlotAvails.find(
                (int) => int.intId === savedInt.interviewerId,
              ).availability;
            }
            return savedAvail;
          });
        }
      }
      const savePromise = savedInts.map(async (savedInt) => {
        return supabaseWrap(
          await supabase
            .from('interview_availabilties')
            .update({
              slot_availability: savedInt.slots as any,
            })
            .eq('user_id', savedInt.interviewerId),
        );
      });
      await Promise.all(savePromise);

      // update ui
      const jsonInts = convertToJSON(interviewers);
      for (let int of savedInts) {
        for (let slot of int.slots) {
          if (slot.timeDuration !== timeSlotLocal) continue;
          for (let dateKey in slot.availability) {
            for (let freeEvent of slot.availability[String(dateKey)]) {
              if (
                !jsonInts[String(int.interviewerId)][Number(slot.timeDuration)][
                  String(dateKey)
                ]
              )
                continue;

              jsonInts[String(int.interviewerId)][Number(slot.timeDuration)][
                String(dateKey)
              ] = jsonInts[String(int.interviewerId)][
                Number(slot.timeDuration)
              ][String(dateKey)].map((d) => {
                if (d.startTime === dayjs(freeEvent.startTime).toISOString()) {
                  d.status = 'requested';
                }
                return d;
              });
            }
          }
        }
      }
      const newInts = convertFromJSON(jsonInts);

      for (let interv of mapInts.keys()) {
        const mailInt: InterviewerType = mapInts.get(interv);
        const panel_id = router.query.panel_id as string;
        const user_id = mailInt.interviewerId;
        const req_user_id = recruiterUser.user_id;
        const link = `${process.env.NEXT_PUBLIC_HOST_NAME}/confirm-availability/${panel_id}?user_id=${user_id}&req_user_id=${req_user_id}&time_duration=${timeSlot}`;
        sendReqMail(mailInt.email, link);
        toast.success(
          `Request confirmation mail sent to ${mailInt.interviewerName}`,
        );
      }
      setInterviewers(newInts);
      setCheckedSlots([]);
      setShowAvail(false);
      setConfirmBtnStatus('loaded');
    } catch (error) {
      toast.error(API_FAIL_MSG);
      setConfirmBtnStatus('error');
    }
  };
  const cntChecked = checkedSlots.length;
  if (isInitialising) return <></>;
  return (
    <>
      <CheckAvailabilityBar
        textSlotNumber={cntChecked}
        isCommonAvailableSlotVisible={showAvail}
        isSelected={cntChecked > 0}
        isButtonLoaderVisible={confirmBtnStatus === 'loading'}
        onClickReqConfirmation={{
          onClick: handleConfirmSlots,
        }}
        slotButtonLoaders={
          <>{<CircularProgress size={15} sx={{ color: '#fff' }} />}</>
        }
        slotTimezoneInput={
          <>
            <TimeZone timeZone={timeZoneLocal} setTimeZone={setTimeZoneLocal} />
          </>
        }
        slotAvailableSlots={
          <>
            {Object.keys(mergedEvents || {}).map((dateKey: string) => {
              let timeKeys = Object.keys(mergedEvents[String(dateKey)]);
              return (
                <AvailableSlots
                  key={dateKey}
                  textDate={dayjs(dateKey).format('DD')}
                  textDay={dayjs(dateKey).format('dddd')}
                  textMonth={dayjs(dateKey).format('MMM')}
                  slotLoadedSlotPill={
                    <>
                      {timeKeys.map((timeKey: string) => {
                        const [start, end] = timeKey.split('_');
                        let checkedPath = `${dateKey}_${timeKey}`;

                        const isChecked = Boolean(
                          checkedSlots.find((s) => s === checkedPath),
                        );
                        return (
                          <>
                            <LoadedSlotPill
                              key={checkedPath}
                              onClickPill={{
                                onClick: () => {
                                  if (isChecked) {
                                    setCheckedSlots((prev) =>
                                      prev.filter((str) => str !== checkedPath),
                                    );
                                  } else {
                                    setCheckedSlots((prev) => [
                                      ...prev,
                                      checkedPath,
                                    ]);
                                  }
                                },
                              }}
                              isNotSelected={!isChecked}
                              isSelectedActive={isChecked}
                              textTime={`${dayjs(start)
                                .tz(timeZone.value)
                                .format('hh:mm A')} - ${dayjs(end)
                                .tz(timeZone.value)

                                .format('hh:mm A')}`}
                              slotImage={
                                <>
                                  <InterviewerGroup
                                    profileUrls={mergedEvents[String(dateKey)][
                                      String(timeKey)
                                    ].slots.map((int) => ({
                                      name: int.interviewerName,
                                      url: int.profileImg,
                                    }))}
                                  />
                                </>
                              }
                            />
                          </>
                        );
                      })}
                    </>
                  }
                />
              );
            })}
          </>
        }
        isButtonLoaderActive={checkAvailBtnStatus === 'loading'}
        slotLoader={
          <>{<CircularProgress size={15} sx={{ color: '#fff' }} />}</>
        }
        isCheckAvailabilityDisable={confirmBtnStatus === 'loading'}
        slotAvatarGroup={<></>}
        slotDurationInput={
          <>
            <DropDown
              timeSlotLocal={timeSlotLocal}
              setTimeSlotLocal={setTimeSlotLocal}
              timeRangeLocal={timeRangeLocal}
              setTimeRangeLocal={setTimeRangeLocal}
            />
          </>
        }
        onClickCheckAvailabilty={{
          onClick: () => {
            handleCheckAvailability();
          },
        }}
        onClickClose={{
          onClick: () => {
            setCheckedSlots([]);
            setShowAvail(false);
          },
        }}
        slotStartDateInput={
          <>
            <SpecializedDatePicker
              onChange={(date: Dayjs) => {
                let d = dayjs(date).format('YYYY-MM-DD');
                setDateRangeViewLocal({
                  ...dateRangeViewLocal,
                  startDate: dayjs(d).toDate(),
                });
              }}
              value={dayjs(dateRangeView.startDate)}
              minDate={dayjs(new Date())}
              label=''
            />
          </>
        }
        slotEndDateInput={
          <>
            <SpecializedDatePicker
              onChange={(date: Dayjs) => {
                let d = dayjs(date).format('YYYY-MM-DD');
                setDateRangeViewLocal({
                  ...dateRangeViewLocal,
                  endDate: dayjs(d).toDate(),
                });
              }}
              value={dayjs(dateRangeView.endDate)}
              minDate={dayjs(dateRangeView.startDate)}
              label=''
            />
          </>
        }
      />
    </>
  );
};

export default AvailabilityBar;

const DropDown = ({
  timeSlotLocal,
  setTimeSlotLocal,
  timeRangeLocal,
  setTimeRangeLocal,
}) => {
  const [dropDownEl, setDropDownEl] = useState(null);
  const [showCustom, setShowCustom] = useState(
    timeRangeLocal !== 30 && timeRangeLocal !== 60 && timeRangeLocal !== 120,
  );

  return (
    <>
      <Stack
        onClick={(e) => {
          setDropDownEl(e.currentTarget);
        }}
        width={'100%'}
      >
        <UITextField
          value={timeSlotLocal + ' minutes'}
          fullWidth={true}
          InputProps={{
            sx: { width: '140px' },
            endAdornment: (
              <IconButton>
                <TimeIcon fontSize='small' />
              </IconButton>
            ),
          }}
        />
      </Stack>
      <Popover
        open={Boolean(dropDownEl)}
        anchorEl={dropDownEl}
        onClose={() => {
          setDropDownEl(false);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          mt: 2,
          '& .MuiPaper-root': {
            border: 'none !important',
            overflow: 'visible !important',
          },
        }}
      >
        <DurationPop
          is1HourActive={timeSlotLocal === 60}
          is2HourActive={timeSlotLocal === 120}
          is30MinActive={timeSlotLocal === 30}
          isCustomActive={showCustom}
          isCustomDurationVisible={showCustom}
          onClick30Min={{
            onClick: () => {
              setTimeSlotLocal(30);
              setShowCustom(false);
            },
          }}
          onClick1Hour={{
            onClick: () => {
              setTimeSlotLocal(60);
              setShowCustom(false);
            },
          }}
          onClick2Hour={{
            onClick: () => {
              setTimeSlotLocal(120);
              setShowCustom(false);
            },
          }}
          onClickCustom={{
            onClick: () => {
              setShowCustom(true);
            },
          }}
          isStartEndVisible
          slotStartTime={
            <>
              <SpecializedTimePicker
                onChange={(time: Dayjs) => {
                  setTimeRangeLocal((prev) => ({
                    ...prev,
                    start: time.toDate(),
                  }));
                }}
                value={dayjs(timeRangeLocal.start)}
              />
            </>
          }
          slotEndTime={
            <>
              <SpecializedTimePicker
                onChange={(time: Dayjs) => {
                  setTimeRangeLocal((prev) => ({
                    ...prev,
                    end: time.toDate(),
                  }));
                }}
                minTime={dayjs(timeRangeLocal.start)}
                value={dayjs(timeRangeLocal.end)}
              />
            </>
          }
          slotCustomDurationInput={
            <>
              <UITextField
                onChange={(e) => {
                  setTimeSlotLocal(Number(e.target.value));
                }}
                type='number'
                defaultValue={30}
                value={timeSlotLocal}
              />
            </>
          }
        />
      </Popover>
    </>
  );
};

export const dayDiffCnt = (date1: Date, date2: Date) => {
  const d1 = dayjs(date1).format('YYYY-MM-DD');
  const d2 = dayjs(date2).format('YYYY-MM-DD');
  return dayjs(d2).diff(d1);
};

export const sendReqMail = async (toEmail, link) => {
  await axios.post('/api/sendgrid', {
    email: toEmail,
    subject: 'Confirm request',
    text: link,
  });
};
