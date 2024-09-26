import { dayjsLocal } from '@aglint/shared-utils';
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
import { type Dispatch, type SetStateAction, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import UITextField from '@/components/Common/UITextField';
import { api } from '@/trpc/client';

type SpecificLocationType = 'all_locations' | 'specific_locations';

type Props = {
  addDayOffOpen: boolean;
  setDaysOffOpen: Dispatch<SetStateAction<boolean>>;
};
export const AddHolidayDialog = ({ addDayOffOpen, setDaysOffOpen }: Props) => {
  const { recruiter } = useTenant();
  const [selectedDate, setSelectedDate] = useState(
    dayjsLocal().format('DD MMM YYYY'),
  );
  const [name, setName] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [specificLocationOn, setSpecificLocationOn] =
    useState<SpecificLocationType>('all_locations');

  const { mutateAsync, isPending } = api.tenant.updateTenant.useMutation({
    onError: () =>
      toast({
        title: 'Unable to update holiday',
        variant: 'destructive',
      }),
  });

  const addHoliday = async () => {
    if (!name) {
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
    try {
      await mutateAsync({
        scheduling_settings: {
          ...recruiter.scheduling_settings,
          totalDaysOff: [
            ...recruiter.scheduling_settings.totalDaysOff,
            {
              date: selectedDate,
              event_name: name,
              locations:
                specificLocationOn === 'specific_locations'
                  ? selectedLocations
                  : recruiter?.office_locations.map(
                      (item) => `${item.city}, ${item.region}, ${item.country}`,
                    ),
            },
          ],
        },
      });
      setSelectedDate(null);
      setDaysOffOpen(false);
    } catch {
      //
    }
  };

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
              addHoliday();
            }}
            isLoading={isPending}
          >
            Add
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
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
                onSelect={(date) =>
                  date &&
                  setSelectedDate(dayjsLocal(date).format('DD MMM YYYY'))
                }
                disabled={(date) =>
                  recruiter.scheduling_settings.totalDaysOff.some(
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
              setSpecificLocationOn(value as SpecificLocationType)
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
              label='Pick Locations'
            />
          </div>
        )}
      </div>
    </UIDialog>
  );
};
