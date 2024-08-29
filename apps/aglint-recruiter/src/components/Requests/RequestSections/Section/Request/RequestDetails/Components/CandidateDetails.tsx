import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import React from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import ROUTES from '@/src/utils/routing/routes';

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
        .map(({ icon, text, type, route }, i) => {
          if (type === 'text') {
            return (
              <TextWithIcon
                key={i}
                textContent={text}
                iconSize={3}
                fontSize={1}
                color={'neutral'}
                iconName={icon}
              />
            );
          } else
            return (
              <>
                <ButtonSoft
                  key={i}
                  size={1}
                  color={'neutral'}
                  textButton={text}
                  isLeftIcon={true}
                  iconName={icon}
                  onClickButton={{
                    onClick: () => {
                      push(route);
                    },
                  }}
                />
              </>
            );
        })}
    </Stack>
  );
}

export default CandidateDetails;
