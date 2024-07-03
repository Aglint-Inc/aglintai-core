/* eslint-disable security/detect-object-injection */
import { JdAnalysisItem } from '@/devlink/JdAnalysisItem';
import { useApplication } from '@/src/context/ApplicationContext';
import type { ApplicationDetails } from '@/src/context/ApplicationContext/type';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { getSafeReasoningType } from '../Util/getSafeReasoningType';
import { getScoreTier } from '../Util/getScoreTier';

export const AnalysisItem = ({
  type,
}: {
  type: keyof ApplicationDetails<'details'>['score_json']['scores'];
}) => {
  const {
    details: { data, status },
  } = useApplication();
  if (status === 'pending') return <>Loading...</>;
  const scores = data?.score_json?.scores;
  const reasoning = data?.score_json?.reasoning;
  const reasoningType = getSafeReasoningType(type);
  if (
    !(
      scores &&
      reasoning &&
      typeof scores?.[type] === 'number' &&
      reasoning[reasoningType]
    )
  )
    return <></>;
  const tier = getScoreTier(scores[type]);
  return (
    <JdAnalysisItem
      textTitle={capitalizeAll(type)}
      textAnalysis={reasoning[reasoningType]}
      textBadge={`${tier} -  ${scores[type]}`}
      isHigh={tier === 'High'}
      isMedium={tier === 'Medium'}
      isPoor={tier === 'Low'}
    />
  );
};
