/* eslint-disable security/detect-object-injection */
import { dayjsLocal } from '@aglint/shared-utils';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';

function TimeSlotsColumn({
  closeBtn,
  date,
  timeRangeArea,
  timezone = dayjsLocal.tz.guess(),
}: {
  closeBtn?: any;
  date: string;
  timeRangeArea?: React.ReactNode;
  timezone?: string;
}) {
  return (
    <Section className='rounded-lg border-none bg-gray-100 p-4'>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>
            {date ? dayjsLocal(date).tz(timezone).format('dddd DD, MMMM') : ''}
          </SectionTitle>
        </SectionHeaderText>
        <SectionActions>{closeBtn}</SectionActions>
      </SectionHeader>
      <div className='flex w-full flex-row flex-wrap gap-2'>
        {timeRangeArea}
      </div>
    </Section>
  );
}

export default TimeSlotsColumn;
