import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { DatePickerBody } from '@/devlink3/DatePickerBody';
import { ScheduleSelectPill } from '@/devlink3/ScheduleSelectPill';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import IconSessionType from '@/src/components/Scheduling/CandidateDetails/RightPanel/IconSessionType';
import DateRange from '@/src/components/Tasks/Components/DateRange';

import { useMeetingList } from '../../../hooks';
import InfoStepSelectState from '../../InfoStepSelectState';
import { setDateRange, useSelfSchedulingFlowStore } from '../../store';
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

  return (
    <>
      <DatePickerBody
        slotGlobalnfo={
          <>
            <InfoStepSelectState />
            {noOptions && <ErrorsFindAvailibility />}
          </>
        }
        textCalenderHelper={
          'Choose the date range within which you want to self schedule.'
        }
        slotTextWithIcon={
          <>
            <TextWithIcon
              iconSize={3}
              iconName={'check_circle'}
              textContent={`${selectedSessions.length} Schedule selected`}
            />
            <TextWithIcon
              iconSize={3}
              iconName={'schedule'}
              textContent={getBreakLabel(totalTime)}
            />
          </>
        }
        slotScheduleSelectPill={
          <>
            {selectedSessions.map((session) => (
              <ScheduleSelectPill
                key={session.interview_session.id}
                slotIcons={
                  <IconSessionType
                    type={session.interview_session.session_type}
                    size={6}
                  />
                }
                textScheduleName={session.interview_session.name}
                textTime={getBreakLabel(
                  session.interview_session.session_duration,
                )}
                isCloseVisible={selectedSessions.length > 1}
              />
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
            <DateRange
              onChange={(val) => {
                setDateRange({
                  start_date: val[0]?.toISOString(),
                  end_date: val[1]?.toISOString(),
                });
              }}
              value={[dayjs(dateRange.start_date), dayjs(dateRange.end_date)]}
              calendars={2}
            />
          </Stack>
        }
      />
    </>
  );
}

export default SelectDateRange;
