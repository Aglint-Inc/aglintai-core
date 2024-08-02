import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import React from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';

function CandidateDetails({
  candidateName,
  jobTitle,
  dateRange,
}: {
  candidateName?: string;
  jobTitle?: string;
  dateRange?: {
    start_date: string;
    end_date: string;
  };
}) {
  const candidateDetails = [
    {
      icon: 'id_card',
      text: candidateName,
      hide: !jobTitle,
    },
    {
      icon: 'work',
      text: jobTitle,
      hide: !jobTitle,
    },
    {
      icon: 'calendar_today',
      text: `${dayjsLocal(dateRange.start_date).format('MMM DD')} - ${dayjsLocal(
        dateRange.end_date,
      ).format('MMM DD')}`,
      hide: !dateRange,
    },
  ];

  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      {candidateDetails
        .filter(({ hide }) => !hide)
        .map(({ icon, text }, i) => {
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
        })}
    </Stack>
  );
}

export default CandidateDetails;
