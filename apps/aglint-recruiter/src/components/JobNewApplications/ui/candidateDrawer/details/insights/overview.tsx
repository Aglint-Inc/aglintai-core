import { CandidateOverview } from '@/devlink/CandidateOverview';
import { useApplication } from '@/src/context/ApplicationContext';

const Overview = () => {
  const {
    details: { data, status },
  } = useApplication();
  if (status === 'pending') return <>Overview Loading...</>;
  if (data?.resume_json?.overview)
    return <CandidateOverview textOverview={data.resume_json.overview} />;
  return <></>;
};

export { Overview };
