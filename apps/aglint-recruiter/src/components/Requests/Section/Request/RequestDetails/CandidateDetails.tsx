import { TextWithIcon } from '@/devlink2';
import { Stack } from '@mui/material';
import React from 'react';

function CandidateDetails() {
  const candidateDetails = [
    {
      icon: 'id_card',
      text: 'John Maya',
      hide: false,
    },
    {
      icon: 'work',
      text: 'Software Developer',
      hide: false,
    },
    {
      icon: 'calendar_today',
      text: 'Aug 12 - 16',
      hide: true,
    },
  ];

  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      {candidateDetails
        .filter(({ hide }) => !hide)
        .map(({ icon, text }, i) => {
          return (
            <TextWithIcon
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
