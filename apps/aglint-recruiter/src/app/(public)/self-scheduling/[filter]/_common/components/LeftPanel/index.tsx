import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';

import TimezonePicker from '@/common/TimezonePicker';

import {
  setInitialDayDate,
  setRounds,
  setSelectedDate,
  setSelectedDay,
  setTimeZone,
  useCandidateInviteSelfScheduleStore,
} from '../../store';
import SlotsSelfSchedule from './Slots';

function LeftPanel() {
  const { timezone, rounds } = useCandidateInviteSelfScheduleStore();

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
