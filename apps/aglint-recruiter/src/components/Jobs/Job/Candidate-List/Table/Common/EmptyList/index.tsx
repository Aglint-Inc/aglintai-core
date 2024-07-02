import { Stack } from '@mui/material';
import { memo } from 'react';

import { ApplicantsListEmpty } from '@/devlink2/ApplicantsListEmpty';
import NoApplicants from '@/public/lottie/NoApplicants';

export const EmptyList = memo(() => {
  return (
    <Stack height={'50vh'} justifyContent={'center'}>
      <Stack>
        <ApplicantsListEmpty
          textEmpty={'No candidates found'}
          slotLottie={<NoApplicants />}
        />
      </Stack>
    </Stack>
  );
});
EmptyList.displayName = 'EmptyList';
