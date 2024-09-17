import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { UIButton } from '../UIButton';

function CalendarHeader({
  handleMode,
  mode,
  calendarApi,
  currentDate,
  handleType,
  type,
}) {
  const dateFormat = {
    timeGridWeek: 'DD',
    timeGridDay: 'DD MMM YYYY',
    dayGridMonth: 'MMMM YYYY',
    listWeek: 'DD',
    listDay: 'DD MMM YYYY',
    listMonth: 'MMMM YYYY',
  };
  const checkDate = dayjsLocal();

  const isThisWeekrMonth =
    checkDate.isAfter(currentDate?.startStr) &&
    checkDate.isBefore(currentDate?.endStr);

  const currentViewType = calendarApi?.view?.type;

  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-3 items-center gap-2'>
        <div>
          <Tabs defaultValue={mode} onValueChange={handleMode}>
            <TabsList>
              <TabsTrigger value='calendar'>Calendar</TabsTrigger>
              <TabsTrigger value='list'>List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='flex justify-center'>
          <div className='flex min-w-[200px] flex-row items-center justify-between space-x-2'>
            <UIButton
              variant='outline'
              size='sm'
              icon={<ChevronLeft className='h-4 w-4' />}
              onClick={() => calendarApi.prev()}
            />

            <p className='font-medium'>
              {currentViewType === 'listWeek' ||
              currentViewType === 'timeGridWeek'
                ? `${dayjsLocal(currentDate?.startStr).format('MMM DD ')} - ${dayjsLocal(currentDate?.endStr).format('DD YYYY')}`
                : dayjsLocal(currentDate?.startStr).format(
                    // eslint-disable-next-line security/detect-object-injection
                    dateFormat[currentViewType],
                  )}
            </p>
            <UIButton
              variant='outline'
              size='sm'
              icon={<ChevronRight className='h-4 w-4' />}
              onClick={() => calendarApi.next()}
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <div className='flex min-w-[250px] flex-row items-center justify-end space-x-1'>
            {!dayjsLocal(currentDate?.startStr).isToday() &&
              !isThisWeekrMonth && (
                <UIButton onClick={() => calendarApi?.today()}>Today</UIButton>
              )}

            <Tabs defaultValue={type} value={type} onValueChange={handleType}>
              <TabsList>
                <TabsTrigger value='day'>Day</TabsTrigger>
                <TabsTrigger value='week'>Week</TabsTrigger>
                <TabsTrigger value='month'>Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarHeader;
