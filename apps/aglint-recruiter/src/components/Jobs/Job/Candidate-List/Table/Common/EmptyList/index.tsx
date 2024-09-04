import { ApplicantsListEmpty } from '@devlink2/ApplicantsListEmpty';
import { Stack } from '@mui/material';
import NoApplicants from '@public/lottie/NoApplicants';
import { memo } from 'react';

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
