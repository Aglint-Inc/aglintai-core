import { Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { Analysis } from './Analysis';
import { Education } from './Education';
import { Experience } from './Experience';
import { Insights } from './Insights';
import { Skills } from './Skills';

const Details = (props: PropsWithChildren) => {
  const { isScoringEnabled } = useAuthDetails();
  if (!isScoringEnabled) return <></>;
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
