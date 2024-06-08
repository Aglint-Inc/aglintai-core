import { useApplication } from '@/src/context/ApplicationContext';

import { AnalysisItem } from './common';

const Skills = () => {
  const {
    application: { status },
  } = useApplication();
  if (status === 'pending') return <>Loading...</>;
  return <AnalysisItem type='skills' />;
};

export { Skills };
