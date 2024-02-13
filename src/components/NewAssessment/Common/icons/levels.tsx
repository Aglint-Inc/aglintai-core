import React from 'react';

import { type Assessment } from '@/src/queries/assessment/types';

import { Advanced, Basic, Intermediate } from '../svg/levels';

const LevelIcon: React.FC<{ level: Assessment['level'] }> = ({ level }) => {
  switch (level) {
    case 'basic':
      return <Basic />;
    case 'intermediate':
      return <Intermediate />;
    case 'advanced':
      return <Advanced />;
    default:
      return <Basic />;
  }
};

export default LevelIcon;
