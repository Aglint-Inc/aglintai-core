import { Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import { Analysis } from './Analysis';
import { Education } from './Education';
import { Experience } from './Experience';
import { Insights } from './Insights';
import { Skills } from './Skills';

const Details = (props: PropsWithChildren) => {
  const { isScoringEnabled } = useRolesAndPermissions();
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

export { Details };
