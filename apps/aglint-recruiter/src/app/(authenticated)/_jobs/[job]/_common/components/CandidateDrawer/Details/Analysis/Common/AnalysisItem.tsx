/* eslint-disable security/detect-object-injection */
import { Badge } from '@components/ui/badge';

import { useApplication } from '@/context/ApplicationContext';
import type { ApplicationDetails } from '@/context/ApplicationContext/type';
import { capitalizeAll } from '@/utils/text/textUtils';

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
    <div className={`p-4 border rounded-md ${tier === 'High' ? 'bg-green-100' : tier === 'Medium' ? 'bg-yellow-100' : 'bg-red-100'}`}>
      <h3 className="text-lg font-semibold">{capitalizeAll(type)}</h3>
      <p className="mt-2">{reasoning[reasoningType]}</p>
      <Badge className={`inline-block mt-2 px-2 py-1 text-sm font-medium rounded ${tier === 'High' ? 'bg-green-200 text-green-800' : tier === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
        {`${tier} - ${scores[type]}`}
      </Badge>
    </div>
  );
};
