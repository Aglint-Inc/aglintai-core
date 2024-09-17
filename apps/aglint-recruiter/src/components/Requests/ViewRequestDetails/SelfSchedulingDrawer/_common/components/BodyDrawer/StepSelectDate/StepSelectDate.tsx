import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { DatePickerBody } from '@devlink3/DatePickerBody';
import { Stack } from '@mui/material';
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
              <CheckCircle className='w-3 h-3 mr-2' />
              {`${selectedSessions.length} Schedule selected`}
            </Label>
            <Label>
              <Clock className='w-3 h-3 mr-2' />
              {getBreakLabel(totalTime)}
            </Label>
          </>
        }
        slotScheduleSelectPill={
          <>
            {selectedSessions.map((session, i) => (
              <div
                key={i}
                className='flex items-center justify-between p-2 bg-gray-100 rounded-md'
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
                    <X className='w-4 h-4' />
                  </Button>
                )}
              </div>
            ))}
          </>
        }
        slotMuiDatePicker={
          <Stack
            sx={{
              border: '1px solid var(--neutral-6)',
              borderRadius: 'var(--radius-2)',
            }}
          >
            <DateRangePicker
              onChange={handleDateRangeChange}
              value={[dayjs(dateRange.start_date), dayjs(dateRange.end_date)]}
              disablePast
            />
          </Stack>
        }
      />
    </>
  );
}

export default SelectDateRange;
