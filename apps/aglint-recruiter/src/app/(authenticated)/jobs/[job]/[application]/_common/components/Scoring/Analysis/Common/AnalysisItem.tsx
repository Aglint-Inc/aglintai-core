/* eslint-disable security/detect-object-injection */
import { Badge } from '@components/ui/badge';

import { Loader } from '@/components/Common/Loader';
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

  if (status === 'pending') return <Loader />;

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
    <div>
      <div className='mb-2 flex flex-row items-center gap-2'>
        <h3 className='text-sm font-medium'>{capitalizeAll(String(type))}</h3>
        <Badge
          className={`pointer-events-none rounded-sm border text-xs font-medium ${
            tier === 'High'
              ? 'bg-green-100 text-green-800'
              : tier === 'Medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {`${tier} - ${scores[type]}`}
        </Badge>
      </div>
      <p className='mb-1 text-sm text-gray-700'>{reasoning[reasoningType]}</p>
    </div>
  );
};
