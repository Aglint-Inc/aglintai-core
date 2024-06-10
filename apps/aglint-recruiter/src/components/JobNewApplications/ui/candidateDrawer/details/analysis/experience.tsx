import { useApplication } from '@/src/context/ApplicationContext';

import { AnalysisItem } from './common';

const Experience = () => {
  const {
    details: { status },
  } = useApplication();
  if (status === 'pending') return <>Loading...</>;
  return <AnalysisItem type='experience' />;
};

export { Experience };
