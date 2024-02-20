import { CircularProgress, IconButton, Popover, Stack } from '@mui/material';
import { TimeIcon } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import utc from 'dayjs/plugin/utc';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';

import { LoadedSlotPill } from '@/devlink';
import {
  AvailableSlots,
  CheckAvailabilityBar,
  DurationPop,
  PanelDetailTitle,
} from '@/devlink2';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { InterviewerGroup } from './Availability';
import {
  AvalabilitySlotType,
  InterviewerAvailabliity,
  MergedEvents,
} from './availability.types';
import {
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
  fetchAvailSlots,
  fetchSavedInts,
  mergeSavedAndAvailableSlots,
} from './utils2';
import SpecializedDatePicker from '../../Common/SpecializedDatePicker';
import SpecializedTimePicker from '../../Common/SpecializedTimePicker';
import UISelect from '../../Common/Uiselect';
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
      const savedIntsPromises = interviewers.map(async (int) => {
        const [saved] = supabaseWrap(
          await supabase
            .from('interview_availabilties')
            .select('slot_availability')
            .eq('user_id', int.interviewerId),
        );
        return {
          intId: int.interviewerId,
          slots: saved.slot_availability as InterviewerAvailabliity[],
        };
      });
      let savedInts = await Promise.all(savedIntsPromises);

      let intSlotAvails = savedInts.map((savedInt) => {
        const avail = (savedInt.slots?.find(
          (av) => av.timeDuration === timeSlot,
        )?.availability ?? {}) as InterviewerAvailabliity['availability'];

        return {
          intId: savedInt.intId,
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
        for (let int of slotInterviewers) {
          intSlotAvails = intSlotAvails.map((intslot) => {
            if (int.interviewerId === intslot.intId) {
              if (!Object.hasOwn(intslot.availability, dateKey)) {
                intslot.availability[String(dateKey)] = [];
              }
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
            (int) => int.intId === savedInt.intId,
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
                (int) => int.intId === savedInt.intId,
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
            .eq('user_id', savedInt.intId),
        );
      });
      await Promise.all(savePromise);
      setCheckedSlots([]);
      setShowAvail(false);
      toast.success('mail sent for');
    } catch (error) {
      toast.error(API_FAIL_MSG);
    } finally {
      setConfirmBtnStatus('loaded');
    }
  };
  const cntChecked = checkedSlots.length;
  if (isInitialising) return <></>;
  return (
    <>
      <PanelDetailTitle
        isLoadingVisible={confirmBtnStatus === 'loading'}
        slotLoader={
          <>{<CircularProgress size={15} sx={{ color: '#fff' }} />}</>
        }
        isSlotSelected={cntChecked > 0}
        slotNumber={cntChecked}
        onClickConfirm={{
          onClick: handleConfirmSlots,
        }}
        onClickDeselect={{
          onClick: () => {
            setCheckedSlots([]);
          },
        }}
      />
      <CheckAvailabilityBar
        textSlotNumber={12}
        isCommonAvailableSlotVisible={showAvail}
        // isSelected={showAvail}
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
                                    ].map((int) => ({
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
          onClick: handleCheckAvailability,
        }}
        onClickClose={{
          onClick: () => {
            setShowAvail(false);
          },
        }}
        slotStartDateInput={
          <>
            <SpecializedDatePicker
              onChange={(date: Dayjs) => {
                setDateRangeViewLocal({
                  ...dateRangeViewLocal,
                  startDate: date.toDate(),
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
                setDateRangeViewLocal({
                  ...dateRangeViewLocal,
                  endDate: date.toDate(),
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
      >
        <UITextField
          value={timeSlotLocal + ' minutes'}
          fullWidth={false}
          InputProps={{
            sx: { width: '80px' },
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
              <UISelect
                menuOptions={[
                  { value: 30, name: '30 minutes' },
                  { value: 45, name: '45 minutes' },
                  { value: 60, name: '1 Hour' },
                  { value: 90, name: '1 Hour 30 minutes' },
                  { value: 120, name: '2 Hour' },
                ]}
                onChange={(e) => {
                  setTimeSlotLocal(Number(e.target.value));
                }}
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
