import React from 'react';

import { TemplateStatus } from '@/devlink2';

type Status = 'draft' | 'active';

const StatusTag: React.FC<{ status: Status }> = ({ status }) => {
  return <TemplateStatus isActive={status === 'active'} />;
};

export default StatusTag;
