/* eslint-disable security/detect-object-injection */
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import dayjs from 'dayjs';

function TimeSlotsColumn({
  closeBtn,
  date,
  timeRangeArea,
}: {
  closeBtn?: any;
  date: string;
  timeRangeArea?: React.ReactNode;
}) {
  return (
    <Section className='rounded-lg border-none bg-gray-100 p-4'>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>
            {date ? dayjs(date).format('dddd DD, MMMM') : ''}
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
