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
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { DayOffHelper } from '@devlink3/DayOffHelper';
import React, { useRef } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import dayjs from '@/utils/dayjs';
import toast from '@/utils/toast';

interface CompanyDayOffSectionProps {
  daysOff: any[];
  // eslint-disable-next-line no-unused-vars
  compareDates: (a: any, b: any) => number;
  // eslint-disable-next-line no-unused-vars
  removeDayOff: (date: string) => void;
  openCompany: () => void;
  // eslint-disable-next-line no-unused-vars
  openAddCompany: (event: React.MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  handleClose: () => void;
  specificLocationOn: string;
  // eslint-disable-next-line no-unused-vars
  setSpecificLocationOn: (value: string) => void;
  selectedDate: string;
  // eslint-disable-next-line no-unused-vars
  setSelectedDate: (date: string) => void;
  setDaysOff: React.Dispatch<React.SetStateAction<any[]>>;
  openDialog: boolean;
  closeDialog: () => void;
}

const CompanyDayOffSection: React.FC<CompanyDayOffSectionProps> = ({
  daysOff,
  compareDates,
  removeDayOff,
  openCompany,
  openAddCompany,
  open,
  handleClose,
  specificLocationOn,
  setSpecificLocationOn,
  selectedDate,
  setSelectedDate,
  setDaysOff,
  openDialog,
  closeDialog,
}) => {
  const eventRef = useRef<HTMLInputElement>(null);
  const { recruiter } = useAuthDetails();
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>(
    [],
  );

  const getDate = (e: any) => {
    setSelectedDate(dayjs(e).format('DD MMM YYYY'));
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <Button variant='outline' onClick={openCompany}>
          Learn How
        </Button>
        <Button variant='outline' size='sm' onClick={openAddCompany}>
          Add Day Off
        </Button>
      </div>

      <div className='space-y-2'>
        {daysOff.sort(compareDates).map((item, i) => (
          <div
            key={i}
            className='flex justify-between items-center p-2 bg-gray-100 rounded'
          >
            <div>
              <span className='font-bold'>{item.date}</span>
              <span className='ml-2'>{item.event_name}</span>
              <div className='flex gap-1 mt-1'>
                {item?.locations ? (
                  item.locations.map((location, index) => (
                    <span
                      key={index}
                      className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                    >
                      {location}
                    </span>
                  ))
                ) : (
                  <span className='text-sm'>All locations</span>
                )}
              </div>
            </div>
            <Button
              variant='destructive'
              onClick={() => removeDayOff(item.date)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Holiday</DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='event-name'>Day off *</Label>
              <Input
                id='event-name'
                placeholder='Enter the name of the holiday'
                ref={eventRef}
              />
            </div>

            <div>
              <Label>Date *</Label>
              <Calendar
                mode='single'
                selected={new Date(selectedDate)}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date.toISOString().split('T')[0]);
                    getDate(date);
                  }
                }}
                disabled={(date) =>
                  daysOff.some(
                    (dayOff) =>
                      dayOff.date === date.toISOString().split('T')[0],
                  )
                }
              />
            </div>

            <div>
              <Label>Location</Label>
              <RadioGroup
                defaultValue={specificLocationOn}
                onValueChange={setSpecificLocationOn}
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

            {specificLocationOn === 'specific_locations' && (
              <div>
                <Label>Pick locations</Label>
                <Select
                  onValueChange={(value) =>
                    setSelectedLocations((prev) => [...prev, value])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Locations' />
                  </SelectTrigger>
                  <SelectContent>
                    {recruiter?.office_locations.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={`${item.city}, ${item.region}, ${item.country}`}
                      >
                        {`${item.city}, ${item.region}, ${item.country}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className='flex justify-end space-x-2 mt-4'>
            <Button variant='outline' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!eventRef.current?.value) {
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
                setDaysOff((pre) => [
                  ...pre,
                  {
                    date: selectedDate,
                    event_name: eventRef.current?.value,
                    locations:
                      specificLocationOn === 'specific_locations'
                        ? selectedLocations
                        : recruiter?.office_locations.map(
                            (
                              item: ReturnType<
                                typeof useAuthDetails
                              >['recruiter']['office_locations'][number],
                            ) =>
                              `${item.city}, ${item.region}, ${item.country}`,
                          ),
                  },
                ]);
                handleClose();
                toast.success(
                  `Holiday added on ${dayjs(selectedDate).format(
                    'DD-MMM-YYYY',
                  )} ${eventRef.current?.value ? 'for' : ''} ${
                    eventRef.current?.value
                  }`,
                );
              }}
            >
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DayOffHelper />
          <Button onClick={closeDialog}>Got It</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyDayOffSection;
