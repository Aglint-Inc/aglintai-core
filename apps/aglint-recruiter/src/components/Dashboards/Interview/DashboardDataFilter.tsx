import { Button } from '@components/shadcn/ui/button';
import { Calendar } from '@components/shadcn/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/shadcn/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/shadcn/ui/select';
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
import { Briefcase, Building2, CalendarIcon, MapPin, X } from 'lucide-react';
import React, { useState } from 'react';

export default function Component() {
  const [job, setJob] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(
    null,
  );
  // const [startDate, setStartDate] = useState<Date | undefined>();
  // const [endDate, setEndDate] = useState<Date | undefined>();
  const [dateOption, setDateOption] = useState<string>('');

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

  const handleDateOptionChange = (value: string) => {
    setDateOption(value);
    const today = new Date();
    let from: Date, to: Date;
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
      case 'custom':
        // Don't set dates for custom, let the user pick
        return;
      default:
        return;
    }
    setDateRange({ from: startOfDay(from), to: endOfDay(to) });
  };

  const clearFilter = (filter: string) => {
    switch (filter) {
      case 'job':
        setJob('');
        break;
      case 'department':
        setDepartment('');
        break;
      case 'location':
        setLocation('');
        break;
      case 'dateRange':
        setDateRange(null);
        // setStartDate(undefined);
        // setEndDate(undefined);
        setDateOption('');
        break;
      default:
        setJob('');
        setDepartment('');
        setLocation('');
        setDateRange(null);
        // setStartDate(undefined);
        // setEndDate(undefined);
        setDateOption('');
    }
  };

  const handleFilter = () => {
    // console.log('Filtering with:', {
    //   job,
    //   department,
    //   location,
    //   dateRange,
    //   startDate,
    //   endDate,
    // });
  };

  const renderSelect = (
    value: string,
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string) => void,
    placeholder: string,
    options: { value: string; label: string }[],
    icon: React.ReactNode,
  ) => (
    <div className='relative flex items-center space-x-2'>
      <div className='flex-grow'>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className='min-w-[120px] w-auto h-9'>
            <div className='flex items-center space-x-2'>
              {icon}
              <SelectValue placeholder={placeholder} className='ml-2' />
            </div>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {value && (
        <Button
          variant='ghost'
          size='icon'
          className='flex-shrink-0 h-9 w-9'
          onClick={() => clearFilter(placeholder.toLowerCase())}
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </div>
  );

  return (
    <div className=''>
      <div className='flex items-center space-x-2 justify-between'>
        <div className='flex items-center space-x-2'>
          {renderSelect(
            job,
            setJob,
            'Job',
            [
              { value: 'engineer', label: 'Software Engineer' },
              { value: 'designer', label: 'UX Designer' },
              { value: 'manager', label: 'Product Manager' },
            ],
            <Briefcase className='h-4 w-4' />,
          )}

          {renderSelect(
            department,
            setDepartment,
            'Department',
            [
              { value: 'engineering', label: 'Engineering' },
              { value: 'design', label: 'Design' },
              { value: 'product', label: 'Product' },
            ],
            <Building2 className='h-4 w-4' />,
          )}

          {renderSelect(
            location,
            setLocation,
            'Location',
            [
              { value: 'newyork', label: 'New York' },
              { value: 'sanfrancisco', label: 'San Francisco' },
              { value: 'london', label: 'London' },
            ],
            <MapPin className='h-4 w-4' />,
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='min-w-[120px] h-9'>
                <CalendarIcon className='mr-2 h-4 w-4' />
                {dateRange
                  ? `${format(dateRange.from, 'PP')} - ${format(dateRange.to, 'PP')}`
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
                    selected={dateRange}
                    // onSelect={setDateRange}
                    initialFocus
                  />
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='ghost'
            size='sm'
            className='min-w-[120px] h-9'
            onClick={() => clearFilter('all')}
          >
            Clear All
          </Button>
          <Button
            onClick={handleFilter}
            size='sm'
            className='min-w-[120px] h-9'
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
