import type { holidayType, schedulingSettingType } from '@aglint/shared-types';
import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useRef, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import dayjs from '@/utils/dayjs';

import { useCompanyDetailComp } from '../../hooks/hook';
import { AddHolidayDialog } from './Dialog/AddHolidayDialog';
import { HolidaysUI } from './ui/HolidaysUI';

export const LoadMax = {
  dailyHours: 8,
  dailyInterviews: 10,
  weeklyHours: 40,
  weeklyInterviews: 50,
};

type specificLocationType = 'all_locations' | 'specific_locations';

function Holidays() {
  const { recruiter } = useAuthDetails();
  const { isSaving, updateSettings } = useCompanyDetailComp();
  const [isRemoving, setIsRemoving] = useState<string>(null);
  const eventRef = useRef<HTMLInputElement>(null);
  const [daysOff, setDaysOff] = useState<holidayType[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [specificLocationOn, setSpecificLocationOn] =
    useState<specificLocationType>('all_locations');

  function getDate(e: any) {
    setSelectedDate(dayjs(e).format('DD MMM YYYY'));
    // dateRef.current.value = String(new Date(e.$d));
  }

  function initialLoad() {
    if (recruiter.scheduling_settings) {
      const schedulingSettingData = cloneDeep(
        recruiter.scheduling_settings,
      ) as schedulingSettingType;
      setDaysOff([...schedulingSettingData.totalDaysOff] as holidayType[]);
    }
  }

  useEffect(() => {
    initialLoad();
  }, []);

  const compareDates = (a: holidayType, b: holidayType) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return Number(dateA) - Number(dateB);
  };

  ///////////// DayOff Popup //////////////
  const [addDayOffOpen, setDaysOffOpen] = useState(false);

  const handleAddDayOff = async (newDayoff: holidayType) => {
    await updateSettings({
      ...recruiter.scheduling_settings,
      totalDaysOff: [...daysOff, newDayoff],
    });
    setDaysOff([...daysOff, newDayoff]);
    setDaysOffOpen(false);
  };
  const handleDeleteDayOff = async (date: string) => {
    setIsRemoving(date);
    const afterDeleteDayOff = daysOff.filter((dayoff) => dayoff.date !== date);
    await updateSettings({
      ...recruiter.scheduling_settings,
      totalDaysOff: afterDeleteDayOff,
    });
    setDaysOff(afterDeleteDayOff);
    setDaysOffOpen(false);
    setIsRemoving(null);
  };

  return (
    <>
      <AddHolidayDialog
        addDayOffOpen={addDayOffOpen}
        setDaysOffOpen={setDaysOffOpen}
        eventRef={eventRef}
        selectedDate={selectedDate}
        daysOff={daysOff}
        setSpecificLocationOn={setSpecificLocationOn}
        specificLocationOn={specificLocationOn}
        recruiter={recruiter}
        getDate={getDate}
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
        handleAddDayOff={handleAddDayOff}
        setSelectedDate={setSelectedDate}
        isSaving={isSaving}
      />
      <HolidaysUI
        compareDates={compareDates}
        daysOff={daysOff}
        handleDeleteDayOff={handleDeleteDayOff}
        isRemoving={isRemoving}
        setDaysOffOpen={setDaysOffOpen}
      />
    </>
  );
}

export default Holidays;
