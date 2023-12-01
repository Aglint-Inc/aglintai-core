import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import React from 'react';

import UITypography from '@/src/components/Common/UITypography';
import { palette } from '@/src/context/Theme/Theme';

import { JobFormState } from '../JobPostFormProvider';

const SyncStatus = ({ status }: { status: JobFormState['syncStatus'] }) => {
  if (status === 'saving') {
    return (
      <Stack direction={'row'} gap={0.5} alignItems={'center'}>
        <UITypography color={palette.grey[600]} type='small' fontBold='normal'>
          Saving
        </UITypography>
        <CircularProgress
          color='inherit'
          size={'15px'}
          sx={{ color: palette.grey[400] }}
        />
      </Stack>
    );
  }

  if (status === 'saved') {
    return (
      <Stack direction={'row'} gap={0.5} alignItems={'center'}>
        <UITypography color={palette.green[600]} type='small' fontBold='normal'>
          {' '}
          Saved{' '}
        </UITypography>
        <Image
          alt='save'
          width={'14'}
          height={'14'}
          src={'/images/svg/greenCheck.svg'}
        />
      </Stack>
    );
  }

  return <></>;
};

export default SyncStatus;
