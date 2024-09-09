import { Stack } from '@mui/material';
import { type PropsWithChildren } from 'react';

import { Badges } from './Badges';
import { Overview } from './Overview';

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
