import { PropsWithChildren } from 'react';

import { Badges } from './badges';
import { Overview } from './overview';

const Insights = (props: PropsWithChildren) => {
  return <>{props.children ?? <></>}</>;
};
Insights.Badges = Badges;
Insights.Overview = Overview;

export { Insights };
