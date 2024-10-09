import {
  Section,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';

export function CandidateCalender({
  slotDayColumn,
  textMonth,
}: {
  slotDayColumn: React.ReactNode;
  textMonth: string;
}) {
  return (
    <Section>
      <SectionHeader className='sr-only'>
        <SectionHeaderText>
          <SectionTitle>
            <span className='font-medium'>{textMonth}</span>
          </SectionTitle>
        </SectionHeaderText>
      </SectionHeader>
      <div className='flex w-full flex-col gap-4'>{slotDayColumn}</div>
    </Section>
  );
}
