import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { DatePickerBody } from '@/devlink3/DatePickerBody';
import { ScheduleSelectPill } from '@/devlink3/ScheduleSelectPill';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import DateRange from '@/src/components/Tasks/Components/DateRange';

import IconSessionType from '../RightPanel/IconSessionType';
import { useSchedulingApplicationStore } from '../store';
import InfoStepSelectState from './InfoStepSelectState';
import { setDateRange, useSchedulingFlowStore } from './store';

function SelectDateRange() {
  const { dateRange, scheduleFlow } = useSchedulingFlowStore((state) => ({
    dateRange: state.dateRange,
    scheduleFlow: state.scheduleFlow,
  }));

  const { selectedSessionIds, initialSessions } = useSchedulingApplicationStore(
    (state) => ({
      selectedSessionIds: state.selectedSessionIds,
      initialSessions: state.initialSessions,
    }),
  );

  const selectedSessions = initialSessions.filter((session) =>
    selectedSessionIds.includes(session.interview_session.id),
  );

  const totalTime = selectedSessions
    .map((session) => session.interview_session.session_duration)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <DatePickerBody
        slotGlobalnfo={<InfoStepSelectState scheduleFlow={scheduleFlow} />}
        textCalenderHelper={
          scheduleFlow === 'self_scheduling'
            ? 'Choose the date range within which you want to self schedule.'
            : scheduleFlow === 'email_agent'
              ? 'Please provide a date range, and the agent will contact the candidate via email to arrange a suitable time within the specified period.'
              : scheduleFlow === 'phone_agent'
                ? 'Please provide a date range, and the agent will contact the candidate via phone to arrange a suitable time within the specified period.'
                : scheduleFlow === 'debrief'
                  ? `Choose date range within which you want to schedule a debrief session.`
                  : 'Choose the date range within which you want to request availability.'
        }
        slotTextWithIcon={
          <>
            <TextWithIcon
              iconSize={3}
              iconName={'check_circle'}
              textContent={`${selectedSessionIds.length} Schedule selected`}
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
