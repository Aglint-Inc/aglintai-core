import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Skeleton } from '@components/ui/skeleton';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { type PropsWithChildren } from 'react';

import { useApplication } from '@/context/ApplicationContext';

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
      <div className="absolute z-10 top-[10px] -left-[30px] w-full h-[1120px]">
        {/* <ResumeEmbed url={`${props.url}#toolbar=0&navpanes=0&scrollbar=0`} /> */}
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <Viewer
            fileUrl={url}
            renderLoader={() => (
              <div className="absolute z-0 w-full h-full">
                <Skeleton />
              </div>
            )}
          />
        </Worker>
      </div>
    </ResumeLayout>
  );
};

const ResumeLayout = (props: PropsWithChildren) => {
  return (
    <div className="relative flex w-full h-full items-center justify-center">
      {props.children}
    </div>
  );
};
