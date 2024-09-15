/* eslint-disable security/detect-object-injection */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Brain } from 'lucide-react';

import { Badge } from './Badge';
import { Education } from './Education';
import { Experience } from './Experience';
import { Skills } from './Skills';

export const Analysis = () => {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='analysis'>
        <AccordionTrigger>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center space-x-2'>
              <Brain size={16} />
              <span className='font-medium'>Analysis</span>
            </div>
            {/* Added summary badge */}
            <Badge />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='space-y-4'>
            <Education />
            <Skills />
            <Experience />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
