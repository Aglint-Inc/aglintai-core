/* eslint-disable security/detect-object-injection */
import { Badge } from '@components/ui/badge';

import { capitalizeAll } from '@/utils/text/textUtils';

import {
  type ApplicationDetails,
  useApplicationDetails,
} from '../../../../hooks/useApplicationDetails';
import { getSafeReasoningType } from '../Util/getSafeReasoningType';
import { getScoreTier } from '../Util/getScoreTier';

export const AnalysisItem = ({
  type,
}: {
  type: keyof ApplicationDetails['score_json']['scores'];
}) => {
  const { data, status } = useApplicationDetails();

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
    <div className='p-4'>
      <h3 className='mb-2 text-lg font-semibold'>
        {capitalizeAll(String(type))}
      </h3>
      <p className='text-sm text-gray-700'>{reasoning[reasoningType]}</p>
      <div className='mt-2'>
        <Badge
          variant={
            tier.toLowerCase() as
              | 'default'
              | 'destructive'
              | 'secondary'
              | 'outline'
          }
        >
          {`${tier} - ${scores[type]}`}
        </Badge>
      </div>
    </div>
  );
};
