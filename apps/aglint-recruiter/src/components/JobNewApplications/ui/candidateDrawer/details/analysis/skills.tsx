import { useApplication } from '@/src/context/ApplicationContext';

import { AnalysisItem } from './common';

const Skills = () => {
  const {
    details: { status },
  } = useApplication();
  if (status === 'pending') return <>Loading...</>;
  return <AnalysisItem type='skills' />;
};

export { Skills };
