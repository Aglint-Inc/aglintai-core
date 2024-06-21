import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

import { Badges } from './badges';
import { Overview } from './overview';

const Insights = (props: PropsWithChildren) => {
  return (
    <Stack gap={1}>
      {props.children ?? (
        <>
          <Badges />
          <Overview />
        </>
      )}
    </Stack>
  );
};
Insights.Badges = Badges;
Insights.Overview = Overview;

export { Insights };
