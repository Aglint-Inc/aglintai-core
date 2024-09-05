import { holidayType, schedulingSettingType } from '@aglint/shared-types';
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
import { CompanyDayOff } from '@devlink2/CompanyDayOff';
import { DayoffList } from '@devlink2/DayoffList';
import { TextWithBg } from '@devlink2/TextWithBg';
import { DayOffHelper } from '@devlink3/DayOffHelper';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import { Calendar as CalendarIcon, PlusIcon } from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import dayjs from '@/utils/dayjs';
import toast from '@/utils/toast';

export const LoadMax = {
  dailyHours: 8,
  dailyInterviews: 10,
  weeklyHours: 40,
  weeklyInterviews: 50,
};

type specificLocationType = 'all_locations' | 'specific_locations';

function Holidays() {
  const { recruiter } = useAuthDetails();
  const eventRef = useRef<HTMLInputElement>(null);
  const [daysOff, setDaysOff] = useState<holidayType[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [specificLocationOn, setSpecificLocationOn] =
    useState<specificLocationType>('all_locations');

  const [openDialog, setOpenDialog] = useState(false);
  const openCompany = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };

  function getDate(e: any) {
    setSelectedDate(dayjs(e).format('DD MMM YYYY'));
    // dateRef.current.value = String(new Date(e.$d));
  }

  function removeDayOff(value: string) {
    setDaysOff((pre) => {
      const filtered = pre.filter((item) => item.date !== value);
      return [...filtered];
    });
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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openAddCompany = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedDate('');
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <CompanyDayOff
        slotLearnButton={
          <Button variant='ghost' size='sm' onClick={openCompany}>
            Learn How
          </Button>
        }
        slotAddButton={
          <Button variant='default' size='sm' onClick={openAddCompany}>
            <PlusIcon className='mr-2 h-4 w-4' /> Add Day Off
          </Button>
        }
        slotDayoffList={
          <>
            {daysOff.sort(compareDates).map((item, i) => {
              return (
                <DayoffList
                  key={i}
                  slotTextWithBg={
                    item?.locations ? (
                      item.locations.map((location, index) => {
                        return <TextWithBg key={index} text={location} />;
                      })
                    ) : (
                      <Typography
                        px={'var(--space-2)'}
                        variant='caption'
                        fontSize={'14px'}
                      >
                        All locations
                      </Typography>
                    )
                  }
                  textDate={item.date}
                  textDayoff={item.event_name}
                  onClickDelete={{
                    onClick: () => removeDayOff(item.date),
                  }}
                />
              );
            })}
            <Dialog open={open}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Holiday</DialogTitle>
                </DialogHeader>
                <div className='space-y-4'>
                  <div>
                    <Label htmlFor='event'>
                      Day off<span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      id='event'
                      placeholder='Enter the name of the holiday'
                      ref={eventRef}
                    />
                  </div>
                  <div>
                    <Label htmlFor='date'>
                      Date<span className='text-red-500'>*</span>
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
                          selected={
                            selectedDate ? new Date(selectedDate) : undefined
                          }
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
                  <div>
                    <Label>Location</Label>
                    <RadioGroup
                      value={specificLocationOn}
                      onValueChange={(value) =>
                        setSpecificLocationOn(value as specificLocationType)
                      }
                      className='flex space-x-4'
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value='all_locations'
                          id='all_locations'
                        />
                        <Label htmlFor='all_locations'>All locations</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value='specific_locations'
                          id='specific_locations'
                        />
                        <Label htmlFor='specific_locations'>
                          Specific locations
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {specificLocationOn === 'specific_locations' && (
                    <div>
                      <Label>Pick locations</Label>
                      <Autocomplete
                        multiple
                        fullWidth
                        onChange={(_, value) => setSelectedLocations(value)}
                        options={recruiter?.office_locations.map(
                          (item) =>
                            `${item.city}, ${item.region}, ${item.country}`,
                        )}
                        renderInput={(params) => (
                          <TextField
                            placeholder='Select Locations'
                            {...params}
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
                <div className='mt-4 flex justify-end space-x-2'>
                  <Button variant='outline' onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
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
                      setDaysOff(
                        (pre) =>
                          [
                            ...pre,
                            {
                              date: selectedDate,
                              event_name: eventRef.current.value,
                              locations:
                                specificLocationOn === 'specific_locations'
                                  ? selectedLocations
                                  : recruiter?.office_locations.map(
                                      (item) =>
                                        `${item.city}, ${item.region}, ${item.country}`,
                                    ),
                            },
                          ] as holidayType[],
                      );
                      handleClose();
                      toast.success(
                        `Holiday added on ${dayjs(selectedDate).format(
                          'DD-MMM-YYYY',
                        )} ${
                          eventRef.current.value ? 'for' : ''
                        } ${eventRef.current.value}`,
                      );
                    }}
                  >
                    Add
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        }
      />
      <Dialog open={openDialog}>
        <DialogContent>
          <DayOffHelper
            onClickClose={{
              onClick: closeDialog,
            }}
            slotButton={<Button onClick={closeDialog}>Got It</Button>}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Holidays;
