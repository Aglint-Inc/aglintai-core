import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { Stack } from '@mui/material';
import React from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';
import { Label } from '@components/ui/label';
import { Button } from '@components/ui/button';

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
  const { push } = useRouterPro();
  const items = [
    {
      icon: 'id_card',
      text: candidateDetails.name,
      hide: !jobDetails.job_title,
      route:
        ROUTES['/jobs/[id]/application/[application_id]']({
          id: jobDetails.id,
          application_id: candidateDetails.application_id,
        }) + '?tab=interview',
    },
    {
      icon: 'work',
      text: jobDetails.job_title,
      hide: !jobDetails.job_title,
      route: ROUTES['/jobs/[id]']({ id: jobDetails.id }) + '?section=interview',
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
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
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
              <>
                <Button
                  key={i}
                  variant='ghost'
                  size='sm'
                  onClick={() => push(route)}
                >
                  {text}
                </Button>
              </>
            );
        })}
    </Stack>
  );
}

export default CandidateDetails;
