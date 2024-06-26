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
  if (
    !(
      scores &&
      reasoning &&
      typeof scores?.[type] === 'number' &&
      reasoning[
        type === 'education'
          ? 'schools'
          : type === 'experience'
            ? 'positions'
            : 'skills'
      ]
    )
  )
    return <></>;
  const tier = getScoreTier(scores[type]);
  return (
    <JdAnalysisItem
      textTitle={capitalizeAll(type)}
      textAnalysis={reasoning[type]}
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
