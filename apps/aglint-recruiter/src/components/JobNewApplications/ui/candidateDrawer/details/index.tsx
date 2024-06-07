import type { PropsWithChildren } from 'react';

import { Insights } from './insights';

const Details = (props: PropsWithChildren) => {
  return <>{props.children}</>;
};
Details.Insights = Insights;

export { Details };
