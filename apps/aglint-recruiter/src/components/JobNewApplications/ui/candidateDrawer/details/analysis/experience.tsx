import { useApplication } from '@/src/context/ApplicationContext';

import { AnalysisItem } from './common';

const Experience = () => {
  const {
    application: { status },
  } = useApplication();
  if (status === 'pending') return <>Loading...</>;
  return <AnalysisItem type='experience' />;
};

export { Experience };
