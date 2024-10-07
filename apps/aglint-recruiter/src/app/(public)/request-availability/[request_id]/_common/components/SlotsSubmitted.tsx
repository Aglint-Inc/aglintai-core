import { dayjsLocal } from '@aglint/shared-utils';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { UIBadge } from '@components/ui-badge';
import { Clock } from 'lucide-react';

import { useRequestAvailabilityContext } from '../contexts/RequestAvailabilityContext';

function SlotsSubmitted() {
  const { daySlots } = useRequestAvailabilityContext();
  return (
    <>
      <div className='flex w-full flex-col space-y-16'>
        {daySlots.map((daySlot) => (
          <Section key={daySlot.round}>
            <SectionHeader>
              <SectionHeaderText>
                <SectionTitle>Day {daySlot.round}</SectionTitle>
                <SectionDescription></SectionDescription>
              </SectionHeaderText>
            </SectionHeader>
            <div className='flex flex-col gap-8'>
              {daySlot.dates.map((date) => (
                <div key={date.curr_day} className='flex flex-col gap-2'>
                  <p className='text-sm'>
                    {dayjsLocal(date.curr_day).format('MMMM D, YYYY')}
                  </p>
                  <div className='flex flex-row flex-wrap gap-2'>
                    {date.slots.map((slot, index) => (
                      <div key={index}>
                        <UIBadge
                          variant='neutral'
                          icon={Clock}
                          textBadge={`${dayjsLocal(slot.startTime).format('h:mm A')} -${dayjsLocal(slot.endTime).format('h:mm A')}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        ))}
      </div>
    </>
  );
}

export default SlotsSubmitted;
