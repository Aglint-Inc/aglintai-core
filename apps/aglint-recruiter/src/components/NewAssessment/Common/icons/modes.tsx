import { type FC } from 'react';

import { type Assessment } from '@/src/queries/assessment/types';

import { Langugage, Software, Typing } from '../svg/types';

const ModeIcon: FC<{ type: Assessment['mode'] }> = ({ type }) => {
  switch (type) {
    case 'classic':
      return <Typing />;
    case 'verbal':
      return <Langugage />;
    case 'visual':
      return <Software />;
    default:
      return <Typing />;
  }
};

export default ModeIcon;
