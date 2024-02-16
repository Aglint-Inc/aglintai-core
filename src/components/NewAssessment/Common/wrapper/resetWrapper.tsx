import { type FC, type ReactNode, useEffect } from 'react';

import useAssessmentStore from '../../Stores';

const AssessmentResetWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const resetAll = useAssessmentStore((state) => state.resetAll);
  useEffect(() => {
    resetAll();
  }, []);
  return <>{children}</>;
};

export default AssessmentResetWrapper;
