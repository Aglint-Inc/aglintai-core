import { Badge } from '@components/ui/badge';

import { type InterviewerDetailType } from '../../../hooks/useInterviewer';

export const List = ({
  feedback,
}: {
  feedback: InterviewerDetailType['feedbacks'][number];
}) => {
  return (
    <div className='rounded-lg bg-gray-50 p-4'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='text-base font-medium'>from</h3>
          <p className='mt-1 text-sm text-gray-500'>date</p>
        </div>
        <Badge variant='secondary'>from</Badge>
      </div>
      <p className='mt-2 text-sm'>{feedback?.feedback?.objective}</p>
    </div>
  );
};
