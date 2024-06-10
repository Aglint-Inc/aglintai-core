import { CandidateOverview } from '@/devlink/CandidateOverview';
import { useApplication } from '@/src/context/ApplicationContext';

const Overview = () => {
  const {
    application: { data, status },
  } = useApplication();
  if (status === 'pending') return <>Overview Loading...</>;
  if (data?.candidate_files?.resume_json?.overview)
    return (
      <CandidateOverview
        textOverview={data.candidate_files.resume_json.overview}
      />
    );
  return <></>;
};

export { Overview };
