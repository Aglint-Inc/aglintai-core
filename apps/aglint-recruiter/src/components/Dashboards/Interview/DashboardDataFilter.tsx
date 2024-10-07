import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import {
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
} from 'date-fns';
import {
  BriefcaseBusiness,
  Building,
  CalendarIcon,
  MapPin,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { useAnalyticsContext } from 'src/app/(authenticated)/reports/_common/context/AnalyticsContext/AnalyticsContextProvider';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

export default function Component() {
  const {
    filtersOptions,
    filters: init_filters,
    handleSetFilter,
  } = useAnalyticsContext();

  const [filters, setFilter] = useState(init_filters);
  const [dateOption, setDateOption] = useState<string>('');

  const handleDateOptionChange = (value: string) => {
    setDateOption(value);
    const { from, to } = MapDateOption(value);
    handleFilterChange({
      dateRange: { from: startOfDay(from), to: endOfDay(to) },
    });
  };

  const handleFilterChange: typeof handleSetFilter = (data) => {
    setFilter((pre) => ({ ...pre, ...data }));
  };

  const clearFilter = (filter: keyof typeof filters) => {
    handleFilterChange({ [filter]: '' });
  };

  const clearAllFilter = () => {
    handleFilterChange({
      job: null,
      department: null,
      location: null,
      dateRange: null,
    });
  };

  const applyFilter = (filters: any) => {
    handleSetFilter(filters);
  };
  const clear_all =
    filters.job ||
    filters.department ||
    filters.location ||
    filters.dateRange ||
    false;
  const renderSelect = <
    X extends keyof typeof filtersOptions,
    T extends (typeof filtersOptions)[X][number],
  >(
    value: T['id'],
    // eslint-disable-next-line no-unused-vars
    onChange: (value: T['id']) => void,
    placeholder: keyof typeof filters,
    options: T[],
    icon: React.ReactNode,
  ) => {
    return (
      <div className='relative flex items-center space-x-2'>
        <div className='flex-grow'>
          {/* @ts-ignore */}
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className='h-9 w-auto min-w-[120px]'>
              <div className='flex items-center space-x-2'>
                {icon}
                <SelectValue
                  placeholder={capitalizeFirstLetter(placeholder)}
                  className='ml-2'
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                // @ts-ignore
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {value && (
          <Button
            variant='outline'
            // size='icon'
            className='h-9 w-9 flex-shrink-0'
            onClick={() => clearFilter(placeholder)}
          >
            <X
              style={{
                transform: 'scale(6.5)',
              }}
            />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className=''>
      <div className='flex items-center justify-between space-x-2'>
        <div className='flex items-center space-x-2'>
          {renderSelect(
            filters.job,
            (job) => handleFilterChange({ job: job }),
            'job',
            filtersOptions.job,
            <BriefcaseBusiness className='h-4 w-4' />,
          )}

          {renderSelect(
            filters.department,
            (department) => handleFilterChange({ department: department }),
            'department',
            filtersOptions.department,
            <Building className='h-4 w-4' />,
          )}

          {renderSelect(
            filters.location,
            (location) => handleFilterChange({ location: location }),
            'location',
            filtersOptions.location,
            <MapPin className='h-4 w-4' />,
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='h-9 min-w-[120px]'>
                <CalendarIcon className='mr-2 h-4 w-4' />
                {filters.dateRange
                  ? `${format(filters.dateRange.from, 'PP')} - ${format(filters.dateRange.to, 'PP')}`
                  : 'Date Range'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-4' align='start'>
              <div className='space-y-4'>
                <Select
                  value={dateOption}
                  onValueChange={handleDateOptionChange}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select date range' />
                  </SelectTrigger>
                  <SelectContent>
                    {dateOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {dateOption === 'custom' && (
                  <Calendar
                    mode='range'
                    selected={filters.dateRange!}
                    // onSelect={setDateRange}
                    // initialFocus
                  />
                )}
              </div>
            </PopoverContent>
          </Popover>
          {Boolean(filters.dateRange?.to) && (
            <Button
              variant='outline'
              // size='icon'
              className='h-9 w-9 flex-shrink-0'
              onClick={() => handleFilterChange({ dateRange: null })}
            >
              <X
                style={{
                  transform: 'scale(6.5)',
                }}
              />
            </Button>
          )}
        </div>
        <div className='flex items-center space-x-2'>
          {clear_all && (
            <Button
              variant='ghost'
              size='sm'
              className='h-9 min-w-[120px]'
              onClick={clearAllFilter}
            >
              Clear All
            </Button>
          )}
          <Button
            onClick={() => {
              applyFilter(filters);
            }}
            size='sm'
            className='h-9 min-w-[120px]'
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

const dateOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'thisQuarter', label: 'This Quarter' },
  { value: 'thisYear', label: 'This Year' },
  { value: 'yearToDate', label: 'Year to Date' },
  { value: 'custom', label: 'Custom Range' },
];

const MapDateOption = (value: string) => {
  const today = new Date();
  let from: Date = new Date();
  let to: Date = new Date();
  switch (value) {
    case 'today':
      from = to = today;
      break;
    case 'yesterday':
      from = to = subDays(today, 1);
      break;
    case 'thisWeek':
      from = startOfWeek(today);
      to = endOfWeek(today);
      break;
    case 'thisMonth':
      from = startOfMonth(today);
      to = endOfMonth(today);
      break;
    case 'thisQuarter':
      from = startOfQuarter(today);
      to = endOfQuarter(today);
      break;
    case 'thisYear':
      from = startOfYear(today);
      to = endOfYear(today);
      break;
    case 'yearToDate':
      from = startOfYear(today);
      to = today;
      break;
  }
  return { from, to };
};
