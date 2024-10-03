import { Skeleton } from '@components/ui/skeleton';
import { type PropsWithChildren } from 'react';

import { useApplicationMeta } from '../../hooks/useApplicationMeta';

export const Resume = () => {
  const { data, status } = useApplicationMeta();
  const file_url = data?.file_url;

  if (status === 'pending')
    return (
      <ResumeLayout>
        <Skeleton className='h-full w-full' />
      </ResumeLayout>
    );

  if (status === 'success' && typeof file_url !== 'string') return 'Not Found';
  if (status === 'error') return <>Something went wrong</>;

  const url = data?.file_url ?? '';
  const exten = getExtension(url);

  if (exten === '.docx' || exten === '.doc' || exten === '.pdf')
    return (
      <>
        <embed
          src={`https://docs.google.com/gview?url=${url}&embedded=true`}
          title='resume'
          width='100%'
          height='1250px'
          className='overflow-hidden rounded-lg'
        />
      </>
    );
};

const ResumeLayout = (props: PropsWithChildren) => {
  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      {props.children}
    </div>
  );
};

const getExtension = (url: string) => {
  return url.slice(url.lastIndexOf('.'), url.length);
};
