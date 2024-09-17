import type { holidayType, schedulingSettingType } from '@aglint/shared-types';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Skeleton } from '@components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { cloneDeep } from 'lodash';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import dayjs from '@/utils/dayjs';
import toast from '@/utils/toast';

import { useCompanyDetailComp } from '../hook';

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
      <div className='mb-8 flex flex-col gap-4'>
        <div className='flex items-start justify-between'>
          <div>
            <h2 className='mb-2 text-xl font-bold'>Standard Days Off</h2>
            <p className='text-gray-600'>
              List company holidays to exclude them from scheduling.
            </p>
          </div>
          <Button variant='outline' onClick={() => setDaysOffOpen(true)}>
            Add Day Off
          </Button>
        </div>
        <div className='overflow-x-auto rounded-lg border bg-white'>
          <Table>
            <TableHeader className='bg-gray-100'>
              <TableRow>
                <TableHead>Day Off</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Locations</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {daysOff.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Skeleton className='h-6 w-full' />
                  </TableCell>
                </TableRow>
              ) : (
                daysOff.sort(compareDates).map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.event_name}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {item?.locations ? (
                        item.locations.map((location, index) => (
                          <Badge
                            key={index}
                            variant='secondary'
                            className='mr-1'
                          >
                            {location}
                          </Badge>
                        ))
                      ) : (
                        <p>All locations</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='ghost'
                        size='sm'
                        style={{ minWidth: '100px' }}
                        onClick={() => handleDeleteDayOff(item.date)}
                      >
                        {isRemoving === item.date ? 'Deleting...' : 'Delete'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={addDayOffOpen} onOpenChange={setDaysOffOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Holiday</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='event'>
                Day off <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='event'
                placeholder='Enter the name of the holiday'
                ref={eventRef}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='date'>
                Date <span className='text-red-500'>*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-start text-left font-normal'
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {selectedDate || <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={selectedDate ? new Date(selectedDate) : undefined}
                    onSelect={(date) => date && getDate(date)}
                    disabled={(date) =>
                      daysOff.some(
                        (day) =>
                          new Date(day.date).toDateString() ===
                          date.toDateString(),
                      )
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className='space-y-2'>
              <Label>Location</Label>
              <RadioGroup
                value={specificLocationOn}
                onValueChange={(value) =>
                  setSpecificLocationOn(value as specificLocationType)
                }
                className='flex space-x-4'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='all_locations' id='all_locations' />
                  <Label htmlFor='all_locations'>All locations</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='specific_locations'
                    id='specific_locations'
                  />
                  <Label htmlFor='specific_locations'>Specific locations</Label>
                </div>
              </RadioGroup>
            </div>
            {recruiter && specificLocationOn === 'specific_locations' && (
              <div>
                <Label>Pick locations</Label>
                <UISelectDropDown
                  menuOptions={
                    recruiter
                      ? recruiter?.office_locations.map((item) => {
                          return {
                            name: `${item.city}, ${item.region}, ${item.country}`,
                            value: `${item.city}, ${item.region}, ${item.country}`,
                          };
                        })
                      : []
                  }
                  value={selectedLocations[0]}
                  onValueChange={(value) => setSelectedLocations([value])}
                  placeholder='Select a Location'
                  label='Locations'
                />
              </div>
            )}
          </div>
          <div className='mt-4 flex justify-end space-x-2'>
            <UIButton
              variant='outline'
              onClick={() => {
                setDaysOffOpen(false);
              }}
            >
              Cancel
            </UIButton>
            <UIButton
              onClick={() => {
                if (!eventRef.current.value) {
                  toast.message('Please enter event name.');
                  return;
                }
                if (!selectedDate) {
                  toast.message('Please select a date.');
                  return;
                }
                if (
                  specificLocationOn === 'specific_locations' &&
                  selectedLocations.length === 0
                ) {
                  toast.message('Please select a locations.');
                  return;
                }

                const newDayoff = {
                  date: selectedDate,
                  event_name: eventRef.current.value,
                  locations:
                    specificLocationOn === 'specific_locations'
                      ? selectedLocations
                      : recruiter?.office_locations.map(
                          (item) =>
                            `${item.city}, ${item.region}, ${item.country}`,
                        ),
                } as holidayType;

                handleAddDayOff(newDayoff);

                setSelectedDate(null);
              }}
              isLoading={isSaving === 'saving'}
            >
              {isSaving === 'saving' ? 'Adding...' : 'Add'}
            </UIButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Holidays;
