import { GlobalEmptyState } from '@devlink/GlobalEmptyState';

import { RequestProvider } from '@/context/RequestContext';
import {
  type Request as RequestType,
  type RequestResponse,
} from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { setCompletedMode } from '../../CompletedRequests/store';
import { Request } from './Request';
import { Button } from '@components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { Skeleton } from '@components/ui/skeleton';
type KanbanSectionName = `${string} - ${string}`;

interface SectionProps {
  requests: RequestType[];
  sectionName:
    | keyof RequestResponse
    | 'all_completed_requests'
    | KanbanSectionName;
  sectionIconName: string;
  color: string;
  isLoadingRequests: boolean;
  showEmptyMessage?: boolean;
  isKanban?: boolean;
  isHorizontal?: boolean; // New prop
}

function Section({
  requests,
  sectionName,
  color,
  isLoadingRequests,
  showEmptyMessage = false,
  isKanban = false,
  isHorizontal = false, // New prop with default value
}: SectionProps) {
  const containerClasses = isHorizontal
    ? 'flex-row flex-nowrap overflow-x-auto'
    : isKanban
      ? 'flex-row flex-wrap'
      : 'flex-col';

  return (
    <div className={`flex flex-col ${isHorizontal ? 'w-full' : ''}`}>
      {!isHorizontal && (
        <div className='flex flex-row items-center gap-4 w-full mb-4'>
          <div className='flex items-center'>
            <span className={`text-${color}-700 font-medium`}>
              {`${capitalizeFirstLetter(sectionName)} (${requests.length})`}
            </span>
          </div>
        </div>
      )}
      <div
        className={`flex ${containerClasses} gap-2`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isLoadingRequests ? (
          <RequestCardSkeletons />
        ) : (
          <>
            {requests.length === 0 ? (
              showEmptyMessage ? (
                <GlobalEmptyState
                  iconName={'task_alt'}
                  textDesc={'No results found'}
                />
              ) : (
                <p className='text-sm text-neutral-500'>
                  {`No ${capitalizeFirstLetter(sectionName).replace('Request', '')} Requests.`}
                </p>
              )
            ) : (
              requests.map((props, i) => (
                <RequestProvider key={props.id ?? i} request_id={props.id}>
                  <Request
                    {...{
                      ...props,
                      index: i,
                      isExpanded: isKanban || isHorizontal,
                    }}
                  />
                </RequestProvider>
              ))
            )}
          </>
        )}
      </div>
      {!isHorizontal &&
        sectionName === 'completed_request' &&
        requests.length > 0 && (
          <div className='flex flex-row justify-start w-full mt-4'>
            <Button
              variant='ghost'
              size='lg'
              className='text-accent'
              onClick={() => setCompletedMode(true)}
            >
              View all completed requests
              <ArrowRightIcon className='ml-2 h-4 w-4' />
            </Button>
          </div>
        )}
    </div>
  );
}

export default Section;

export function RequestCardSkeletons() {
  return (
    <>
      <Skeleton className='w-full h-40' />
      <Skeleton className='w-full h-40' />
      <Skeleton className='w-full h-40' />
      <Skeleton className='w-full h-40' />
    </>
  );
}
