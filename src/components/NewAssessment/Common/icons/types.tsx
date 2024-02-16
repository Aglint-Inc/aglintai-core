import { type FC } from 'react';

import { type Assessment } from '@/src/queries/assessment';

import {
  Cognitive,
  Culture,
  Langugage,
  Programming,
  Role,
  Situational,
  Software,
  Typing,
} from '../svg/types';

const TypeIcon: FC<{ type: Assessment['type'] }> = ({ type }) => {
  switch (type) {
    case 'cognitive':
      return <Cognitive />;
    case 'language':
      return <Langugage />;
    case 'culture':
      return <Culture />;
    case 'programming':
      return <Programming />;
    case 'role':
      return <Role />;
    case 'situational':
      return <Situational />;
    case 'software':
      return <Software />;
    case 'typing':
      return <Typing />;
    default:
      return <Programming />;
  }
};

export default TypeIcon;
