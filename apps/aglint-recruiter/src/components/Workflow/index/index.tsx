import { useEffect } from 'react';

import { useWorkflowStore } from '../store';
import Body from './body';
import Layout from './layout';

const Workflow = () => {
  const reset = useWorkflowStore((state) => state.resetAll);
  useEffect(() => {
    return () => reset();
  }, []);
  return (
    <Layout>
      <Body />
    </Layout>
  );
};

export default Workflow;
