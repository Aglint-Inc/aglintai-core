import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

interface ApplicationDetailAccordionProps {
  title: string;
  Icon?: LucideIcon;
  children: ReactNode;
  headerSlot?: ReactNode;
  isOpen?: boolean; // Prop to control whether the accordion is open by default
}

export const ApplicationDetailAccordion: React.FC<
  ApplicationDetailAccordionProps
> = ({ title, Icon, children, headerSlot, isOpen = false }) => {
  return (
    <Accordion
      type='single'
      defaultValue={isOpen ? 'details' : undefined}
      collapsible
      className='overflow-hidden rounded-md border border-solid border-border'
    >
      <AccordionItem value='details'>
        <AccordionTrigger className='bg-muted/10 p-3 duration-300 hover:bg-muted hover:no-underline'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center space-x-2'>
              {Icon && <Icon size={16} />}
              <span className='font-medium'>{title}</span>
            </div>
            {headerSlot && <div className='ml-auto mr-2'>{headerSlot}</div>}
          </div>
        </AccordionTrigger>
        <AccordionContent className='pb-0'>
          <div className='space-y-4 p-3'>{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ApplicationDetailAccordion;
