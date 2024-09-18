import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Skeleton } from '@components/ui/skeleton';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { type PropsWithChildren } from 'react';

import { useApplication } from '@/context/ApplicationContext';

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

  const url = data?.file_url;
  const exten = getExtension(url);

  if (exten === '.docx' || exten === '.doc')
    return (
      <>
        <embed
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
          title='resume'
          width='1000px'
          height='1000px'
        />
      </>
    );

  return <Pdf key={data?.file_url} url={data?.file_url} />;
};

const Pdf = ({ url }: { url: string }) => {
  return (
    <ResumeLayout>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={url}
          renderLoader={() => (
            <div className='absolute z-0 h-full w-full'>
              <Skeleton />
            </div>
          )}
        />
      </Worker>
    </ResumeLayout>
  );
};

const ResumeLayout = (props: PropsWithChildren) => {
  return (
    <div className='relative flex h-full max-h-[1000px] w-full max-w-[1000px] items-center justify-center'>
      {props.children}
    </div>
  );
};

const getExtension = (url: string) => {
  return url.slice(url.lastIndexOf('.'), url.length);
};
