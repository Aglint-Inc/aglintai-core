import { Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

import { Skeleton } from '@/devlink2/Skeleton';
import { useApplication } from '@/src/context/ApplicationContext';

import { ResumeEmbed } from '../../Candidate-List/Common/ResumePreviewer';
import { EmptyState } from './Common/EmptyState';

export const Resume = () => {
  const {
    meta: { status, data },
  } = useApplication();
  if (status === 'success' && typeof data?.file_url !== 'string')
    return <EmptyState tab='Resume' />;
  if (status === 'error') return <>Something went wrong</>;
  if (status === 'pending')
    return (
      <ResumeLayout>
        <Skeleton />
      </ResumeLayout>
    );
  return <Content key={data?.file_url} url={data?.file_url} />;
};

const Content = (props: { url: string }) => {
  return (
    <ResumeLayout>
      <Stack position={'absolute'} zIndex={1} width={'100%'} height={'100%'}>
        <ResumeEmbed url={`${props.url}#toolbar=0&navpanes=0&scrollbar=0`} />
      </Stack>
      <Stack position={'absolute'} zIndex={0} width={'100%'} height={'100%'}>
        <Skeleton />
      </Stack>
    </ResumeLayout>
  );
};

const ResumeLayout = (props: PropsWithChildren) => {
  return (
    <Stack
      position={'relative'}
      display={'flex'}
      width={'100%'}
      height={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {props.children}
    </Stack>
  );
};
