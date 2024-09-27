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
          className='rounded-lg overflow-hidden'
        />
      </>
    );
};

const ResumeLayout = (props: PropsWithChildren) => {
  return (
    <div className='relative flex h-full  w-full  items-center justify-center'>
      {props.children}
    </div>
  );
};

const getExtension = (url: string) => {
  return url.slice(url.lastIndexOf('.'), url.length);
};

// src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
// src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
// src={`https://docs.google.com/gview?url=${url}&embedded=true`}
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// return <Pdf key={data?.file_url} url={data?.file_url} />;
// const Pdf = ({ url }: { url: string }) => {
//   return (
//     <ResumeLayout>
//       <Worker
//         workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
//       >
//         <Viewer
//           fileUrl={url}
//           renderLoader={() => (
//             <div className='absolute z-0 h-full w-full'>
//               <Skeleton />
//             </div>
//           )}
//         />
//       </Worker>
//     </ResumeLayout>
//   );
// };

//-------------------------------------------------------------

// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// import { Skeleton } from '@components/ui/skeleton';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { type PropsWithChildren } from 'react';

// import { useApplicationMeta } from '../../hooks/useApplicationMeta';

// export const Resume = () => {
//   const { data, status } = useApplicationMeta();

//   const file_url = data?.file_url;

//   if (status === 'pending')
//     return (
//       <ResumeLayout>
//         <Skeleton className='h-full w-full' />
//       </ResumeLayout>
//     );

//   if (status === 'success' && typeof file_url !== 'string') return 'Not Found';
//   if (status === 'error') return <>Something went wrong</>;

//   const url = file_url;
//   const exten = getExtension(url);

//   if (exten === '.docx' || exten === '.doc')
//     return (
//       <>
//         <embed
//           src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
//           title='resume'
//           width='1000px'
//           height='1000px'
//         />
//       </>
//     );

//   return <Pdf key={file_url} url={file_url} />;
// };

// const Pdf = ({ url }: { url: string }) => {
//   return (
//     <ResumeLayout>
//       <Worker
//         workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
//       >
//         <Viewer
//           fileUrl={url}
//           renderLoader={() => (
//             <div className='absolute z-0 h-full w-full'>
//               <Skeleton />
//             </div>
//           )}
//         />
//       </Worker>
//     </ResumeLayout>
//   );
// };

// const ResumeLayout = (props: PropsWithChildren) => {
//   return (
//     <div className='relative flex h-full w-full max-w-[1000px] items-center justify-center'>
//       {props.children}
//     </div>
//   );
// };

// const getExtension = (url: string) => {
//   return url.slice(url.lastIndexOf('.'), url.length);
// };
