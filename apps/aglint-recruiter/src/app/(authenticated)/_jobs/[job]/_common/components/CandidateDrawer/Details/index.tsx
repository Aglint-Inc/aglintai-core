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
    <div className='flex flex-col gap-4 bg-white p-4 border rounded-lg'>
      {props.children ?? (
        <>
          <Insights />
          <Analysis />
          <Experience />
          <Education />
          <Skills />
        </>
      )}
    </div>
  );
};

export { Details };
