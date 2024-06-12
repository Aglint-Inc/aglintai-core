import type { PropsWithChildren, ReactNode } from 'react';

import { CandidateDetail } from '@/devlink/CandidateDetail';

import { Badge } from './badge';
import { Education } from './education';
import { Experience } from './experience';
import { Skills } from './skills';

const Analysis = (props: PropsWithChildren<{ score?: ReactNode }>) => {
  return (
    <CandidateDetail
      slotBadge={props.score ?? <Badge />}
      slotBody={
        props.children ?? (
          <>
            <Education />
            <Skills />
            <Experience />
          </>
        )
      }
      slotIcon={<></>}
      textTitle={'Analysis'}
    />
  );
};
Analysis.Badge = Badge;
Analysis.Education = Education;
Analysis.Skills = Skills;
Analysis.Experience = Experience;

export { Analysis };
