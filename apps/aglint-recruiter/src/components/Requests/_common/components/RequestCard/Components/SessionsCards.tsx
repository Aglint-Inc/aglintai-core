import { ButtonSoft } from '@devlink2/ButtonSoft';
import { Stack } from '@mui/material';

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
              <ButtonSoft
                key={id ?? i}
                size={1}
                color={`neutral`}
                textButton={capitalizeFirstLetter(name)}
                isRightIcon={true}
                iconName={'north_east'}
                onClickButton={{
                  onClick: () => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_HOST_NAME}/jobs/${job_id}/application/${application_id}?tab=interview`,
                      '_blank',
                    );
                  },
                }}
              />
            );
          })}
        </Stack>
      </Stack>
    </>
  );
}

export default SessionsCards;
