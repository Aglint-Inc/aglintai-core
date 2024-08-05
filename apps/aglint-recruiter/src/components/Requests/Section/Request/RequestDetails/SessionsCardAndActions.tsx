import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { GlobalBadge } from '@/devlink2/GlobalBadge';
import type { Request as RequestType } from '@/src/queries/requests/types';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

function SessionsCardAndActions({
  request,
  sessions,
}: {
  request: PropsWithChildren<RequestType>;
  sessions: {
    id: string;
    name: string;
  }[];
}) {
  return (
    <>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Stack direction={'row'} spacing={1}>
          {sessions.map(({ name, id }, i) => {
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
        <GlobalBadge
          color={'accent'}
          variant={'soft'}
          textBadge={capitalizeFirstLetter(request.type)}
        />
      </Stack>
    </>
  );
}

export default SessionsCardAndActions;
