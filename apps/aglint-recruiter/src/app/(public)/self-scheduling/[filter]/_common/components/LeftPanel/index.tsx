import { SINGLE_DAY_TIME } from '@aglint/shared-utils/src/scheduling';
import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import React from 'react';

import { ConfirmedInvitePage } from '@/common/CandidateConfirm/_common/components';
import TimezonePicker from '@/common/TimezonePicker';

import { useInviteMeta } from '../../hooks/useInviteMeta';
import {
  setInitialDayDate,
  setRounds,
  setSelectedDate,
  setSelectedDay,
  setTimeZone,
  useCandidateInviteSelfScheduleStore,
} from '../../store';
import { type ScheduleCardProps } from '../../types/types';
import SlotsSelfSchedule from './Slots';

function LeftPanel() {
  const { timezone } = useCandidateInviteSelfScheduleStore();

  const { data: meta } = useInviteMeta();

  const waiting = !meta.isBooked;

  const { rounds } = (meta?.meetings || []).reduce(
    (acc, curr) => {
      const count = acc.rounds.length;
      if (
        count === 0 ||
        acc.rounds[count - 1].sessions[
          acc.rounds[count - 1].sessions.length - 1
        ].interview_session.break_duration >= SINGLE_DAY_TIME
      )
        acc.rounds.push({
          title: `Day ${acc.rounds.length + 1}`,
          sessions: [curr],
        });
      else acc.rounds[count - 1].sessions.push(curr);
      return acc;
    },
    { rounds: [] as ScheduleCardProps['round'][] },
  );

  if (meta?.meetings.length === 0)
    return <div className='w-full'>Interview Schedule not found</div>;

  if (!waiting && meta)
    return (
      <ConfirmedInvitePage
        rounds={rounds}
        candidate={meta.candidate}
        filter_json={meta.filter_json}
        meetings={meta.meetings}
        recruiter={meta.recruiter}
        timezone={timezone}
        application_id={meta.application_id}
      />
    );

  return (
    <Section>
      <SectionHeader className='px-4 pt-4'>
        <SectionHeaderText>
          <SectionTitle>Book Now</SectionTitle>
          <SectionDescription>
            Available slots are organized by day. Each slot includes the total
            time required for your interview, including breaks.
          </SectionDescription>
        </SectionHeaderText>
        <SectionActions>
          <TimezonePicker
            onChange={(e) => {
              setSelectedDay(1);
              setSelectedDate(null);
              setInitialDayDate(null);
              setRounds(
                rounds.map((round) => ({ ...round, selectedSlot: null })),
              );
              setTimeZone(e);
            }}
            value={timezone.tzCode}
          />
        </SectionActions>
      </SectionHeader>
      <SlotsSelfSchedule />
    </Section>
  );
}

export default LeftPanel;
