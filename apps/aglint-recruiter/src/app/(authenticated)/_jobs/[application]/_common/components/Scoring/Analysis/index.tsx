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
    <Accordion type='single' defaultValue='analysis' collapsible>
      <AccordionItem value='analysis'>
        <AccordionTrigger className='hover:no-underline'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Brain size={16} />
              <span className='font-medium'>Analysis</span>
            </div>
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
