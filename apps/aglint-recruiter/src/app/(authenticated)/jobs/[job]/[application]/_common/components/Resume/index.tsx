import { useApplicationMeta } from '../../hooks/useApplicationMeta';

export const Resume = () => {
  const { data } = useApplicationMeta();

  const url = data?.file_url;

  if (!url) return null;

  const exten = getExtension(url);

  if (exten === '.docx' || exten === '.doc' || exten === '.pdf')
    return (
      <>
      <div className='h-[calc(100vh-250px)] px-4 mt-2'>
        <embed
          src={`https://docs.google.com/gview?url=${url}&embedded=true`}
          title='resume'
          width='100%'
          height='100%'
          // height='calc(100vh - 300px)'
          className='overflow-hidden rounded-lg'
        />
        </div>
      </>
    );
};

const getExtension = (url: string) => {
  return url.slice(url.lastIndexOf('.'), url.length);
};
