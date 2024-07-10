/* eslint-disable security/detect-object-injection */
import { type PropsWithChildren, type ReactNode, useMemo } from 'react';

import { CandidateDetail } from '@/devlink/CandidateDetail';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { useApplication } from '@/src/context/ApplicationContext';

import { getIconName } from '../../utils';
import { EmptyDetailState } from '../Common/EmptyDetailState';
import { Badge } from './Badge';
import { Education } from './Education';
import { Experience } from './Experience';
import { Skills } from './Skills';

export const Analysis = (props: PropsWithChildren<{ score?: ReactNode }>) => {
  const {
    details: { data, status },
  } = useApplication();
  const scores = data?.score_json?.scores;
  const reasoning = data?.score_json?.reasoning;
  const isEmpty = useMemo(
    () =>
      status !== 'pending' &&
      scores &&
      reasoning &&
      Object.keys(scores ?? {}).filter((key) => {
        const safeKey = key as keyof typeof scores;
        switch (safeKey) {
          case 'skills':
            return safeKey in reasoning && reasoning?.[safeKey];
          case 'experience':
            return 'positions' in reasoning && reasoning?.['positions'];
          case 'education':
            return 'schools' in reasoning && reasoning?.['schools'];
        }
      }).length === 0,
    [status, scores, reasoning],
  );
  return (
    <CandidateDetail
      slotBadge={props.score ?? <Badge />}
      slotBody={
        isEmpty ? (
          <EmptyDetailState section='Analysis' />
        ) : (
          props.children ?? (
            <>
              <Education />
              <Skills />
              <Experience />
            </>
          )
        )
      }
      slotIcon={<GlobalIcon size={5} iconName={getIconName('Analysis')} />}
      textTitle={'Analysis'}
    />
  );
};
Analysis.Badge = Badge;
Analysis.Education = Education;
Analysis.Skills = Skills;
Analysis.Experience = Experience;
