import { type schedulingSettingType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Card } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { capitalize, cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDrawer from '@/components/Common/UIDrawer';
import { LoadMax } from '@/components/CompanyDetailComp/Holidays';
import MuiNumberfield from '@/components/CompanyDetailComp/OldSettingsSchedule/Components/MuiNumberfield';
import SelectTime from '@/components/CompanyDetailComp/OldSettingsSchedule/Components/SelectTime';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { updateMember } from '@/context/AuthContext/utils';

import { getShortTimeZone } from '../../../utils';
import { InterviewLoadCard } from '../_common/InterviewLoadCard';
import { ScheduleSettings } from '../_common/ScheduleSettings';
import InterviewerLevelSettings from '../InterviewerLevelSettings';

type interviewLoadType = {
  type: 'Hours' | 'Interviews';
  value: number;
  max: number;
};
let schedulingSettingObj = {};
function Availibility({
  updateSettings,
  interviewerDetails,
  totalHoursThisWeek,
  totalHoursToday,
  totalInterviewsThisWeek,
  interviewerDetailsRefetch,
  totalInterviewsToday,
}) {
  const [workingHours, setWorkingHours] = useState([]);

  const [selectedTimeZone, setSelectedTimeZone] = useState(null);
  const [isTimeZone, setIsTimeZone] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { recruiter } = useAuthDetails();
  const [isHover, setIsHover] = useState(false);

  const [dailyLmit, setDailyLimit] = useState<interviewLoadType>({
    type: 'Hours',
    value: 20,
    max: LoadMax.dailyHours,
  });
  const [weeklyLmit, setWeeklyLimit] = useState<interviewLoadType>({
    type: 'Hours',
    value: 10,
    max: LoadMax.weeklyHours,
  });

  const handleDailyValue = (value: number) => {
    setDailyLimit((pre) => ({
      ...pre,
      max: pre.type === 'Hours' ? LoadMax.dailyHours : LoadMax.dailyInterviews,
      value:
        pre.type === 'Hours'
          ? value > LoadMax.dailyHours
            ? LoadMax.dailyHours
            : value
          : value > LoadMax.dailyInterviews
            ? LoadMax.dailyInterviews
            : value,
    }));
  };

  const handleWeeklyValue = (value: number) => {
    setWeeklyLimit((pre) => ({
      ...pre,
      max:
        pre.type === 'Hours' ? LoadMax.weeklyHours : LoadMax.weeklyInterviews,
      value:
        pre.type === 'Hours'
          ? value > LoadMax.weeklyHours
            ? LoadMax.weeklyHours
            : value
          : value > LoadMax.weeklyInterviews
            ? LoadMax.weeklyInterviews
            : value,
    }));
  };
  const handleType = (type: 'Hours' | 'Interviews') => {
    setWeeklyLimit((pre) => ({ ...pre, type }));
    setDailyLimit((pre) => ({ ...pre, type }));
    handleWeeklyValue(weeklyLmit.value);
    handleDailyValue(dailyLmit.value);
  };

  const [editDrawer, setEditDrawer] = useState(false);

  const selectStartTime = (value: any, i: number) => {
    setWorkingHours((pre) => {
      const data = pre;
      data[Number(i)].timeRange.startTime =
        `${dayjsLocal(value).format('HH:mm')}`;
      return [...data];
    });
  };

  const selectEndTime = (value: any, i: number) => {
    setWorkingHours((pre) => {
      const data = pre;
      data[Number(i)].timeRange.endTime =
        `${dayjsLocal(value).format('HH:mm')}`;
      return [...data];
    });
  };

  ///////////// DayOff Popup //////////////
  const schedulingSettingData = cloneDeep(
    interviewerDetails.scheduling_settings,
  ) as schedulingSettingType;

  function initialLoad() {
    if (schedulingSettingData) {
      const workingHoursCopy = cloneDeep(schedulingSettingData.workingHours);
      // eslint-disable-next-line no-console
      //   console.log('local timeZones', dayjsLocal.tz.guess());

      setSelectedTimeZone({ ...schedulingSettingData.timeZone });
      setIsTimeZone(schedulingSettingData.isAutomaticTimezone);

      setDailyLimit({
        type: schedulingSettingData.interviewLoad.dailyLimit.type,
        value: schedulingSettingData.interviewLoad.dailyLimit.value,
        max:
          schedulingSettingData.interviewLoad.dailyLimit.type === 'Hours'
            ? LoadMax.dailyHours
            : LoadMax.dailyInterviews,
      });

      setWeeklyLimit({
        type: schedulingSettingData.interviewLoad.weeklyLimit.type,
        value: schedulingSettingData.interviewLoad.weeklyLimit.value,
        max:
          schedulingSettingData.interviewLoad.dailyLimit.type === 'Hours'
            ? LoadMax.weeklyHours
            : LoadMax.weeklyInterviews,
      });

      setWorkingHours(workingHoursCopy);
    }
  }

  const updateHandle = async () => {
    try {
      setIsSaving(true);
      schedulingSettingObj = {
        ...schedulingSettingData,
        interviewLoad: {
          dailyLimit: {
            type: dailyLmit.type,
            value: dailyLmit.value,
          },
          weeklyLimit: {
            type: weeklyLmit.type,
            value: weeklyLmit.value,
          },
        },
        timeZone: selectedTimeZone,
        workingHours: workingHours,

        isAutomaticTimezone: isTimeZone,
      } as schedulingSettingType;
      await updateSettings(schedulingSettingObj);

      interviewerDetailsRefetch();
    } catch (e) {
      //   console.log(e);
    } finally {
      setIsSaving(false);
      setEditDrawer(false);
    }
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <div
      className='flex h-full flex-col justify-between overflow-hidden'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className='bg-white'>
        <div className='flex flex-row items-center justify-between p-2'>
          <p className='font-semibold'>Time Zone</p>
          <div className='h-[32px] w-[47px]'>
            {isHover && (
              <UIButton
                onClick={() => setEditDrawer(true)}
                size='sm'
                variant='secondary'
              >
                Edit
              </UIButton>
            )}
          </div>
        </div>
        <span className='text-sm text-gray-900'>{selectedTimeZone?.label}</span>
      </div>
      <div className='flex w-[600px] flex-col space-y-2'>
        <Card className='grid grid-cols-3 gap-3 border-none shadow-none'>
          <>
            <InterviewLoadCard
              textHeading='Today'
              textLabel={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.dailyLimit.type === 'Interviews'
                  ? 'Interview'
                  : 'Hour'
              }
              textInterviewCounts={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.dailyLimit.type === 'Interviews'
                  ? totalInterviewsToday +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.dailyLimit.value || 0
                  : totalHoursToday +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.dailyLimit.value || 0
              }
            />
            <InterviewLoadCard
              textHeading='This Week'
              textLabel={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.weeklyLimit.type === 'Interviews'
                  ? 'Interview'
                  : 'Hour'
              }
              textInterviewCounts={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.weeklyLimit.type === 'Interviews'
                  ? totalInterviewsThisWeek +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.weeklyLimit.value || 0
                  : totalHoursThisWeek +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.weeklyLimit.value || 0
              }
            />
          </>
        </Card>
      </div>

      <div className='space-y-4'>
        <ul>
          {schedulingSettingData.workingHours
            .filter((day) => day.isWorkDay)
            .map((day, i: number) => (
              <li key={i} className='py-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  {capitalize(day.day)}
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  {dayjsLocal()
                    .set(
                      'hour',
                      parseInt(day.timeRange.startTime.split(':')[0]),
                    )
                    .set(
                      'minute',
                      parseInt(day.timeRange.startTime.split(':')[1]),
                    )
                    .format('hh:mm A') +
                    ' to ' +
                    dayjsLocal()
                      .set(
                        'hour',
                        parseInt(day.timeRange.endTime.split(':')[0]),
                      )
                      .set(
                        'minute',
                        parseInt(day.timeRange.endTime.split(':')[1]),
                      )
                      .format('hh:mm A')}{' '}
                  {getShortTimeZone(schedulingSettingData.timeZone.tzCode)}
                </p>
              </li>
            ))}
        </ul>
      </div>
      <InterviewerLevelSettings
        initialData={interviewerDetails?.scheduling_settings}
        companyKeywords={recruiter.scheduling_settings.schedulingKeyWords}
        updateSettings={(x) => {
          return updateMember({
            data: {
              user_id: interviewerDetails.user_id,
              scheduling_settings: x,
            },
          });
        }}
        isAvailability={false}
      />

      <>
        <UIDrawer
          onClose={() => setEditDrawer(false)}
          open={editDrawer}
          title='Edit Availability'
          size='md'
          slotBottom={
            <>
              <UIButton
                variant='secondary'
                onClick={() => setEditDrawer(false)}
                size='md'
                fullWidth
              >
                Cancel
              </UIButton>
              <UIButton
                isLoading={isSaving}
                fullWidth
                disabled={isSaving}
                size='md'
                onClick={() => updateHandle()}
              >
                Update
              </UIButton>
            </>
          }
        >
          <div className='p-4'>
            <ScheduleSettings
              slotDayOff={<></>}
              slotTimeZoneInput={<>{/* // Autocomplete was here */}</>}
              isKeywordVisible={false}
              isCompanyLevelVisible={false}
              slotKeywordCard={<></>}
              slotDailyLimit={
                <>
                  <div className='flex flex-row items-center space-x-3'>
                    <MuiNumberfield
                      isMarginTop={false}
                      handleSelect={(value) => handleDailyValue(+value)}
                      value={dailyLmit.value}
                      max={dailyLmit.max}
                    />
                    <RadioGroup
                      defaultValue={dailyLmit.type}
                      onValueChange={(value) =>
                        handleType(value as 'Interviews' | 'Hours')
                      }
                      className='flex flex-row'
                    >
                      {['Interviews', 'Hours'].map((ele) => (
                        <div key={ele} className='flex items-center space-x-2'>
                          <RadioGroupItem value={ele} id={`radio-${ele}`} />
                          <Label htmlFor={`radio-${ele}`}>
                            {capitalize(ele.replaceAll('_', ' '))}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </>
              }
              slotWeeklyLimit={
                <>
                  <div className='flex flex-row items-center space-x-3'>
                    {' '}
                    <MuiNumberfield
                      handleSelect={(value) => handleWeeklyValue(+value)}
                      isMarginTop={false}
                      value={weeklyLmit.value}
                      max={weeklyLmit.max}
                    />
                    <RadioGroup
                      defaultValue={weeklyLmit.type}
                      onValueChange={(value) =>
                        handleType(value as 'Interviews' | 'Hours')
                      }
                      className='flex flex-row'
                      name='row-radio-buttons-group'
                    >
                      {['Interviews', 'Hours'].map((ele, i) => {
                        return (
                          <div key={i} className='flex items-center space-x-2'>
                            <RadioGroupItem value={ele} id={`radio-${ele}`} />
                            <Label htmlFor={`radio-${ele}`}>
                              {capitalize(ele.replaceAll('_', ' '))}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                </>
              }
              slotWorkingHourDay={
                <>
                  {!!workingHours.length &&
                    workingHours.map((day, i) => {
                      return (
                        <>
                          <div className='flex flex-col space-y-4'>
                            <div className='flex items-center space-x-2'>
                              <Checkbox
                                id={`checkbox-${day.day}`}
                                checked={day.isWorkDay}
                                onCheckedChange={() => {
                                  setWorkingHours((pre) => {
                                    const data = [...pre];
                                    data[i].isWorkDay = !data[i].isWorkDay;
                                    return data;
                                  });
                                }}
                              />
                              <Label
                                htmlFor={`checkbox-${day.day}`}
                                className='text-sm font-medium'
                              >
                                {capitalize(day.day)}
                              </Label>
                            </div>
                            <div className='flex space-x-4'>
                              <SelectTime
                                value={dayjsLocal()
                                  .set(
                                    'hour',
                                    parseInt(
                                      day.timeRange.startTime.split(':')[0],
                                    ),
                                  )
                                  .set(
                                    'minute',
                                    parseInt(
                                      day.timeRange.startTime.split(':')[1],
                                    ),
                                  )}
                                onSelect={selectStartTime}
                                i={i}
                              />
                              <SelectTime
                                value={dayjsLocal()
                                  .set(
                                    'hour',
                                    parseInt(
                                      day.timeRange.endTime.split(':')[0],
                                    ),
                                  )
                                  .set(
                                    'minute',
                                    parseInt(
                                      day.timeRange.endTime.split(':')[1],
                                    ),
                                  )}
                                onSelect={selectEndTime}
                                i={i}
                              />
                            </div>
                          </div>
                        </>
                      );
                    })}
                </>
              }
              isCompanyDaysOffVisible={false}
            />
          </div>
        </UIDrawer>
      </>
    </div>
  );
}

export default Availibility;
