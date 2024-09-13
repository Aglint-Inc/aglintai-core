/* eslint-disable security/detect-object-injection */
import { CandidateDetail } from '@devlink/CandidateDetail';
import { Brain, ChartBar } from 'lucide-react';
import { type PropsWithChildren, type ReactNode, useMemo } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { useApplication } from '@/context/ApplicationContext';

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
      !!(
        status === 'success' &&
        (!scores ||
          !reasoning ||
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
          }).length === 0)
      ),
    [status, scores, reasoning],
  );
  return (
    <CandidateDetail
      slotBadge={props.score ?? <Badge />}
      slotBody={
        isEmpty ? (
          <GlobalEmpty iconSlot={<ChartBar className='text-gray-500'/>} text={'No analysis found'}/>
        ) : (
          (props.children ?? (
            <>
              <Education />
              <Skills />
              <Experience />
            </>
          ))
        )
      }
      slotIcon={<Brain size={16} />}
      textTitle={'Analysis'}
    />
  );
};
