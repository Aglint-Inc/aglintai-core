import { Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

import { Analysis } from './analysis';
import { Education } from './education';
import { Experience } from './experience';
import { Insights } from './insights';
import { Skills } from './skills';

const Details = (props: PropsWithChildren) => {
  return (
    <Stack sx={{ display: 'flex', gap: 4 }}>
      {props.children ?? (
        <>
          <Insights />
          <Analysis />
          <Experience />
          <Education />
          <Skills />
        </>
      )}
    </Stack>
  );
};
Details.Insights = Insights;
Details.Analysis = Analysis;
Details.Experience = Experience;
Details.Education = Education;
Details.Skills = Skills;

export { Details };
