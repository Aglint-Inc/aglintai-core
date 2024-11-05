import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Collapsible, CollapsibleContent } from '@components/ui/collapsible';
import { cn } from '@lib/utils';
import { type REQUEST_SESSIONS_DEFAULT_DATA } from '@requests/constant';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { RequestCard } from '../RequestCard';

function ListSection({
  sectionName,
  requests,
  expandedSections,
  setExpandedSections,
  collapseScheduleRequestSections,
  hideSection,
}: {
  sectionName: (typeof REQUEST_SESSIONS_DEFAULT_DATA)[number]['sectionName'];
  requests: any[];
  expandedSections: string[];
  setExpandedSections: React.Dispatch<React.SetStateAction<string[]>>;
  collapseScheduleRequestSections: boolean;
  hideSection: boolean;
}) {
  const isExpanded =
    expandedSections.includes(sectionName) || collapseScheduleRequestSections;

  const [slice, setSlice] = useState(5);
  const slicedRequests = requests.slice(0, slice);
  const viewMore = () => {
    if (slicedRequests.length === requests.length) {
      if (isExpanded) {
        setExpandedSections(expandedSections.filter((s) => s !== sectionName));
      }
    } else setSlice((prev) => prev + 5);
  };
  if (hideSection) return null;
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
      data-testid={`${sectionName}-list-section`}
    >
      <AccordionItem
        value={sectionName}
        className={cn(
          'borde rounded-lg border-border bg-muted/30 px-4',
          isExpanded && 'bg-muted/30',
        )}
      >
        <AccordionTrigger
          className={cn(
            'text-md font-medium hover:no-underline',
            requests.length === 0 && 'cursor-default',
          )}
          disabled={requests.length === 0}
        >
          <div className='mr-2 flex w-full items-center justify-between'>
            <div className='flex items-center'>
              {capitalizeFirstLetter(sectionName)}
              <Badge className='ml-2 rounded-md bg-muted text-sm font-normal text-muted-foreground'>
                {requests.length}
              </Badge>
            </div>
            {requests.length === 0 && (
              <Badge className='ml-2 rounded-md bg-muted text-sm font-normal text-muted-foreground'>
                No {sectionName.replaceAll('_', ' ')} found
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {requests.length > 0 ? (
            <div className='flex flex-col gap-4'>
              {slicedRequests.map((props, i) => (
                <RequestCard
                  key={props.id ?? i}
                  {...{ ...props, isExpanded: false }}
                />
              ))}
              {requests.length > 5 && (
                <Collapsible>
                  <CollapsibleContent>
                    <div className='flex flex-col gap-4'>
                      {requests.slice(5).map((props, i) => (
                        <RequestCard
                          key={props.id ?? i}
                          {...{ ...props, isExpanded: false }}
                        />
                      ))}
                    </div>
                  </CollapsibleContent>

                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={viewMore}
                  >
                    {slicedRequests.length === requests.length ? (
                      <>
                        <ChevronUp className='mr-2 h-4 w-4' />
                        Collapse
                      </>
                    ) : (
                      <>
                        <ChevronDown className='mr-2 h-4 w-4' />
                        Show More ({requests.length -
                          slicedRequests.length}{' '}
                        more)
                      </>
                    )}
                  </Button>
                </Collapsible>
              )}
            </div>
          ) : (
            <div className='rounded-md border p-4 text-center text-muted-foreground'>
              No requests in this section
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default ListSection;
