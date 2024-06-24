import { Stack } from '@mui/material';
import { memo } from 'react';

import { ApplicantsListEmpty } from '@/devlink2/ApplicantsListEmpty';
import NoApplicants from '@/public/lottie/NoApplicants';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';

export const EmptyList = memo(() => {
  const section = useApplicationsStore(({ section }) => section);
  return (
    <Stack height={'50vh'} justifyContent={'center'}>
      <Stack>
        <ApplicantsListEmpty
          textEmpty={section}
          slotLottie={<NoApplicants />}
        />
      </Stack>
    </Stack>
  );
});
EmptyList.displayName = 'EmptyList';
