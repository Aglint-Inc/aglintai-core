import { type FC } from 'react';

import { type Assessment } from '@/src/queries/assessment';

import { Advanced, Basic, Intermediate } from '../svg/levels';

const LevelIcon: FC<{ level: Assessment['level'] }> = ({ level }) => {
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
