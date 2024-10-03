import { useApplicationMeta } from '../../hooks/useApplicationMeta';

export const Resume = () => {
  const { data } = useApplicationMeta();

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

const getExtension = (url: string) => {
  return url.slice(url.lastIndexOf('.'), url.length);
};
