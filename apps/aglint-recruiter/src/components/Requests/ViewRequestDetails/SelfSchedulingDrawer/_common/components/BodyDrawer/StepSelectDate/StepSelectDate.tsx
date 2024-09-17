import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { DatePickerBody } from '@devlink3/DatePickerBody';
import dayjs from 'dayjs';
import { CheckCircle, Clock, X } from 'lucide-react';
import type { DateRange as DateRangeType } from 'react-day-picker';

import { DateRangePicker } from '@/components/Common/DateRange';
import IconSessionType from '@/components/Common/Icons/IconSessionType';
import { useMeetingList } from '@/components/Requests/_common/hooks';
import { getBreakLabel } from '@/utils/getBreakLabel';

import { setDateRange, useSelfSchedulingFlowStore } from '../../../store/store';
import ErrorsFindAvailibility from './ErrorsFindAvailibility';

function SelectDateRange() {
  const { dateRange, noOptions } = useSelfSchedulingFlowStore((state) => ({
    dateRange: state.dateRange,
    noOptions: state.noOptions,
  }));

  const { data: selectedSessions } = useMeetingList();

  const totalTime = selectedSessions
    .map((session) => session.interview_session.session_duration)
    .reduce((acc, curr) => acc + curr, 0);

  const handleDateRangeChange = (newDateRange: DateRangeType | undefined) => {
    setDateRange({
      start_date: newDateRange?.from?.toISOString() || null,
      end_date: newDateRange?.to?.toISOString() || null,
    });
  };

  return (
    <>
      <DatePickerBody
        slotGlobalnfo={<>{noOptions && <ErrorsFindAvailibility />}</>}
        textCalenderHelper={
          'Choose the date range within which you want to self schedule.'
        }
        slotTextWithIcon={
          <>
            <Label>
              <CheckCircle className='mr-2 h-3 w-3' />
              {`${selectedSessions.length} Schedule selected`}
            </Label>
            <Label>
              <Clock className='mr-2 h-3 w-3' />
              {getBreakLabel(totalTime)}
            </Label>
          </>
        }
        slotScheduleSelectPill={
          <>
            {selectedSessions.map((session, i) => (
              <div
                key={i}
                className='flex items-center justify-between rounded-md bg-gray-100 p-2'
              >
                <div className='flex items-center space-x-2'>
                  <IconSessionType
                    type={session.interview_session.session_type}
                    size={6}
                  />
                  <div>
                    <p className='text-sm font-medium'>
                      {session.interview_session.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {getBreakLabel(
                        session.interview_session.session_duration,
                      )}
                    </p>
                  </div>
                </div>
                {selectedSessions.length > 1 && (
                  <Button className='text-gray-400 hover:text-gray-600'>
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
            ))}
          </>
        }
        slotMuiDatePicker={
          <div className="w-full h-full bg-white">
            <DateRangePicker
              onChange={handleDateRangeChange}
              value={[dayjs(dateRange.start_date), dayjs(dateRange.end_date)]}
              disablePast
            />
          </div>
        }
      />
    </>
  );
}

export default SelectDateRange;
