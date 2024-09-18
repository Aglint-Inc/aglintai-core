import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { useRouter } from 'next/navigation';
import React from 'react';

import ROUTES from '@/utils/routing/routes';

function CandidateDetails({
  candidateDetails,
  jobDetails,
  dateRange,
}: {
  candidateDetails?: {
    name: string;
    application_id: string;
  };
  jobDetails?: {
    id: string;
    job_title: string;
  };
  dateRange?: {
    start_date: string;
    end_date: string;
  };
}) {
  const { push } = useRouter();
  const items = [
    {
      icon: 'id_card',
      text: candidateDetails.name,
      hide: !jobDetails.job_title,
      route:
        ROUTES['/jobs/[job]/application/[application_id]']({
          job: jobDetails.id,
          application_id: candidateDetails.application_id,
        }) + '?tab=interview',
    },
    {
      icon: 'work',
      text: jobDetails.job_title,
      hide: !jobDetails.job_title,
      route:
        ROUTES['/jobs/[job]']({ job: jobDetails.id }) + '?section=interview',
    },
    {
      icon: 'calendar_today',
      text: `${dayjsLocal(dateRange.start_date).format('MMM DD')} - ${dayjsLocal(
        dateRange.end_date,
      ).format('MMM DD')}`,
      hide: !dateRange.start_date || !dateRange.end_date,
      type: 'text',
    },
  ];

  return (
    <div className='flex flex-row items-center space-x-1'>
      {items
        .filter(({ hide }) => !hide)
        .map(({ text, type, route }, i) => {
          if (type === 'text') {
            return (
              <Label
                key={i}
                className='flex items-center text-sm text-neutral-500'
              >
                {text}
              </Label>
            );
          } else
            return (
              <Button
                key={i}
                variant='ghost'
                size='sm'
                onClick={() => push(route)}
              >
                {text}
              </Button>
            );
        })}
    </div>
  );
}

export default CandidateDetails;
