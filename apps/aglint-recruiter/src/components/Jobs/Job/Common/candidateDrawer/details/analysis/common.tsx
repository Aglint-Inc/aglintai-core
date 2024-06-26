/* eslint-disable security/detect-object-injection */
import { JdAnalysisItem } from '@/devlink/JdAnalysisItem';
import { useApplication } from '@/src/context/ApplicationContext';
import { ApplicationDetails } from '@/src/context/ApplicationContext/type';
import { capitalizeAll } from '@/src/utils/text/textUtils';

const AnalysisItem = ({
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

export { AnalysisItem };

const getScoreTier = (score: number): 'High' | 'Medium' | 'Low' => {
  return score > 66 ? 'High' : score > 33 ? 'Medium' : 'Low';
};

const getSafeReasoningType = (
  type: keyof ApplicationDetails<'details'>['score_json']['scores'],
): keyof ApplicationDetails<'details'>['score_json']['reasoning'] => {
  switch (type) {
    case 'skills':
      return 'skills';
    case 'experience':
      return 'positions';
    case 'education':
      return 'schools';
  }
};
