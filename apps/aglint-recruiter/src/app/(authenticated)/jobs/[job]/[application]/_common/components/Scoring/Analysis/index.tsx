/* eslint-disable security/detect-object-injection */
import { Brain } from 'lucide-react';

import ApplicationDetailAccordion from '../../ui/ApplicationDetailAccordian';
import { Badge } from './Badge';
import { Education } from './Education';
import { Experience } from './Experience';
import { Skills } from './Skills';

export const Analysis = () => {
  return (
    <>
      <ApplicationDetailAccordion
        title='Analysis'
        Icon={Brain}
        headerSlot={<Badge />}
        isOpen={true}
      >
        <div className='space-y-4'>
          <Education />
          <Skills />
          <Experience />
        </div>
      </ApplicationDetailAccordion>
    </>
  );
};
