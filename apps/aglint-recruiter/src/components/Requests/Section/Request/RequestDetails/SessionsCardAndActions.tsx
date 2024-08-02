import { Stack } from '@mui/material';
import React from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';

function SessionsCardAndActions() {
  const sessionDetails = [
    {
      id: 'initial-interview',
      name: 'Initial interview',
    },
    {
      id: 'final-interview',
      name: 'Final interview',
    },
  ];
  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <Stack direction={'row'} spacing={1}>
        {sessionDetails.map(({ name, id }, i) => {
          return (
            <ButtonSoft
              key={id ?? i}
              size={1}
              color={`neutral`}
              textButton={name}
              isRightIcon={true}
              iconName={'north_east'}
            />
          );
        })}
      </Stack>
      <ButtonSoft size={1} color={`error`} textButton={'Cancel Request'} />
    </Stack>
  );
}

export default SessionsCardAndActions;
