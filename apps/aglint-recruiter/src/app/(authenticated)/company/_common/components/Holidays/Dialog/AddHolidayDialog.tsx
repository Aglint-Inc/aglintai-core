import { type holidayType } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import { Calendar } from '@components/ui/calendar';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { CalendarIcon } from 'lucide-react';
import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import UITextField from '@/components/Common/UITextField';
import { type useAuthDetails } from '@/context/AuthContext/AuthContext';

type specificLocationType = 'all_locations' | 'specific_locations';

type Props = {
  addDayOffOpen: boolean;
  setDaysOffOpen: Dispatch<SetStateAction<boolean>>;
  eventRef: MutableRefObject<HTMLInputElement>;
  selectedDate: string;
  daysOff: holidayType[];
  setSpecificLocationOn: Dispatch<SetStateAction<specificLocationType>>;
  specificLocationOn: specificLocationType;
  recruiter: ReturnType<typeof useAuthDetails>['recruiter'];
  selectedLocations: any[];
  setSelectedLocations: Dispatch<SetStateAction<any[]>>;
  // eslint-disable-next-line no-unused-vars
  handleAddDayOff: (newDayoff: holidayType) => Promise<void>;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  isSaving: 'saving' | 'saved';
  // eslint-disable-next-line no-unused-vars
  getDate: (e: any) => void;
};
export const AddHolidayDialog = ({
  addDayOffOpen,
  setDaysOffOpen,
  eventRef,
  selectedDate,
  daysOff,
  setSpecificLocationOn,
  specificLocationOn,
  recruiter,
  selectedLocations,
  setSelectedLocations,
  handleAddDayOff,
  setSelectedDate,
  isSaving,
  getDate,
}: Props) => {
  return (
    <UIDialog
      title='Add Holiday'
      open={addDayOffOpen}
      onClose={() => setDaysOffOpen(false)}
      slotButtons={
        <>
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
                toast({ title: 'Please enter event name.' });
                return;
              }
              if (!selectedDate) {
                toast({ title: 'Please select a date.' });
                return;
              }
              if (
                specificLocationOn === 'specific_locations' &&
                selectedLocations.length === 0
              ) {
                toast({ title: 'Please select a locations.' });
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
        </>
      }
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='event'>
            Day off <span className='text-red-500'>*</span>
          </Label>
          <UITextField
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
              <UIButton
                variant='outline'
                className='w-full justify-start text-left font-normal'
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {selectedDate || <span>Pick a date</span>}
              </UIButton>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={selectedDate ? new Date(selectedDate) : undefined}
                onSelect={(date) => date && getDate(date)}
                disabled={(date) =>
                  daysOff.some(
                    (day) =>
                      new Date(day.date).toDateString() === date.toDateString(),
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
              setSpecificLocationOn(
                value as 'all_locations' | 'specific_locations',
              )
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
    </UIDialog>
  );
};
