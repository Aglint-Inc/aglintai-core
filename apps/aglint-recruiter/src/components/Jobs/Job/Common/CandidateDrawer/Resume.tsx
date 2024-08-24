import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Stack } from '@mui/material';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { type PropsWithChildren } from 'react';

import { Skeleton } from '@/devlink2/Skeleton';
import { useApplication } from '@/src/context/ApplicationContext';

// import { ResumeEmbed } from '../../Candidate-List/Common/ResumePreviewer';
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

const Content = ({ url }: { url: string }) => {
  return (
    <ResumeLayout>
      <Stack
        position={'absolute'}
        zIndex={1}
        top={'10px'}
        left={'-30px'}
        width={'100%'}
        height={'1120px'}
      >
        {/* <ResumeEmbed url={`${props.url}#toolbar=0&navpanes=0&scrollbar=0`} /> */}
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={url} />
        </Worker>
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
