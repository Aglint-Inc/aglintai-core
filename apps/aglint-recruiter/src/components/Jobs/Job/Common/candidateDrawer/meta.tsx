import { CandidateBasicInfo } from '@/devlink/CandidateBasicInfo';
import { useApplication } from '@/src/context/ApplicationContext';

const Meta = () => {
  const {
    meta: { data, status },
  } = useApplication();
  if(status === 'pending') return <></>;
  return (
    <CandidateBasicInfo
      textLocation={data.city ?? '---'}
      textMail={data.email ?? '---'}
      textPhone={data.phone ?? '---'}
      textRole={data.current_job_title ?? '---'}
    />
  );
};

export { Meta };
