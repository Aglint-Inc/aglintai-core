import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import { cn } from '@lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { RequestProvider } from '@/context/RequestContext';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { RequestCard } from '../_common/components/RequestCard';
function ListSection({
  sectionName,
  requests,
  expandedSections,
  setExpandedSections,
}: {
  sectionName: string;
  requests: any[];
  expandedSections: string[];
  setExpandedSections: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const isExpanded = expandedSections.includes(sectionName);

  return (
    <Accordion
      type='single'
      collapsible
      className='w-full'
      value={requests.length > 0 ? (isExpanded ? sectionName : '') : undefined}
      onValueChange={(value) => {
        if (requests.length === 0) return;
        if (value === sectionName) {
          setExpandedSections([...expandedSections, sectionName]);
        } else {
          setExpandedSections(
            expandedSections.filter((s) => s !== sectionName),
          );
        }
      }}
    >
      <AccordionItem
        value={sectionName}
        className={cn(
          'border rounded-lg px-4 bg-white',
          isExpanded && 'bg-gray-100',
        )}
      >
        <AccordionTrigger
          className={cn(
            'text-md font-semibold hover:no-underline',
            requests.length === 0 && 'cursor-default',
          )}
          disabled={requests.length === 0}
        >
          <div className='flex items-center justify-between w-full mr-2'>
            <div className='flex items-center'>
              {capitalizeFirstLetter(sectionName)}
              <Badge variant='outline' className='ml-2'>
                {requests.length}
              </Badge>
            </div>
            {requests.length === 0 && (
              <Badge variant='outline' className='ml-2'>
                No {sectionName.replace('_', ' ')} found
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {requests.length > 0 ? (
            <div className='flex flex-col gap-4'>
              {requests.slice(0, 5).map((props, i) => (
                <RequestProvider key={props.id ?? i} request_id={props.id}>
                  <RequestCard {...{ ...props, isExpanded: false }} />
                </RequestProvider>
              ))}
              {requests.length > 5 && (
                <Collapsible>
                  <CollapsibleContent>
                    <div className='flex flex-col gap-4'>
                      {requests.slice(5).map((props, i) => (
                        <RequestProvider
                          key={props.id ?? i}
                          request_id={props.id}
                        >
                          <RequestCard {...{ ...props, isExpanded: false }} />
                        </RequestProvider>
                      ))}
                    </div>
                  </CollapsibleContent>
                  <CollapsibleTrigger asChild className='mt-4 w-full'>
                    <Button
                      variant='outline'
                      className='w-full'
                      onClick={() => {
                        if (isExpanded) {
                          setExpandedSections(
                            expandedSections.filter((s) => s !== sectionName),
                          );
                        }
                      }}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className='h-4 w-4 mr-2' />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className='h-4 w-4 mr-2' />
                          Show More ({requests.length - 5} more)
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              )}
            </div>
          ) : (
            <div className='text-center text-muted-foreground p-4 border rounded-md'>
              No requests in this section
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ListSection;
