import { useApplication } from '@/src/context/ApplicationContext';

import ResumeScore from '../../../resumeScore';

const Badge = () => {
  const {
    application: { data, status },
  } = useApplication();
  if (status === 'pending') return <>Loading score...</>;
  if (data?.processing_status !== 'success') return <></>;
  return (
    <ResumeScore
      resume_processing_state='processed'
      resume_score={data.overall_score}
    />
  );
};

export { Badge };
