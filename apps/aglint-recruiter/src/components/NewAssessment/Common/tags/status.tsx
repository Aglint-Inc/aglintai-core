import React from 'react';

import { TemplateStatus } from '@/devlink2/TemplateStatus';
import { type Assessment } from '@/src/queries/assessment/types';

const StatusTag: React.FC<{ jobs: Assessment['jobs'] }> = ({ jobs }) => {
  const len = jobs.length;
  return (
    <TemplateStatus isActive={len !== 0} textActiveCandidatesNumber={len} />
  );
};

export default StatusTag;
