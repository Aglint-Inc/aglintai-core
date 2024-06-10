import { useApplication } from '@/src/context/ApplicationContext';

import { AnalysisItem } from './common';

const Education = () => {
  const {
    details: { status },
  } = useApplication();
  if (status === 'pending') return <>Loading...</>;
  return <AnalysisItem type='education' />;
};

export { Education };
