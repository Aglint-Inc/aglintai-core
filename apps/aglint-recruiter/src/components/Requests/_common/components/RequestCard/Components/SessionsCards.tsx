import { Stack } from '@mui/material';
import { ArrowUpRight } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function SessionsCards({
  sessions,
  job_id,
  application_id,
}: {
  sessions: {
    id: string;
    name: string;
  }[];
  job_id: string;
  application_id: string;
}) {
  return (
    <>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Stack direction={'row'} spacing={1}>
          {sessions.map(({ name, id }, i) => {
            return (
              <UIButton
                key={id ?? i}
                variant='secondary'
                size='sm'
                rightIcon={<ArrowUpRight />}
                onClick={() => {
                  window.open(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/jobs/${job_id}/application/${application_id}?tab=interview`,
                    '_blank',
                  );
                }}
              >
                {capitalizeFirstLetter(name)}
              </UIButton>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
}

export default SessionsCards;
