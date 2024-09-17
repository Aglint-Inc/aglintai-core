import { Skeleton } from '@components/ui/skeleton';
import { HardDrive } from 'lucide-react';
import { memo, useState } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { capitalizeAll } from '@/utils/text/textUtils';

import {
  useMatricsInterviewers,
  type useMatricsInterviewersType,
} from '../Hook';
import { InterviewersCardList } from './_common/InterviewersCardList';
import { InterviewersDash } from './_common/InterviewersDash';

const LIMIT = 4;

export const Interviewers = memo(() => {
  const [interviewersType, setInterviewersType] = useState<
    'training' | 'qualified'
  >('qualified');
  return (
    <>
      <InterviewersDash
        isQualifiedActive={interviewersType === 'qualified'}
        isTraineeActive={interviewersType === 'training'}
        onClickQualified={() => setInterviewersType('qualified')}
        onClickTrainee={() => setInterviewersType('training')}
        slotInterviewersCardList={<Container type={interviewersType} />}
      />
    </>
  );
});
Interviewers.displayName = 'Interviewers';

const Container = memo(({ type }: { type: 'training' | 'qualified' }) => {
  const { data, status } = useMatricsInterviewers({ type });

  if (status === 'pending') return <Loader />;

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <GlobalEmpty
        iconSlot={<HardDrive className='text-gray-500' />}
        text={'No Data Available'}
      />
    );

  return <List data={data} />;
});
Container.displayName = 'Container';

const List = ({ data }: { data: useMatricsInterviewersType }) => {
  return (
    <>
      {(data ?? []).map(({ user_id, name, accepted, declined }) => (
        <div
          key={user_id}
          className="flex flex-col cursor-pointer hover:bg-neutral-200"
        >
          <InterviewersCardList
            textName={capitalizeAll(name)}
            textCompleted={accepted}
            textDeclined={declined}
            textUpcoming={'--'}
          />
        </div>
      ))}
    </>
  );
};

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
    (_, i) => <Skeleton key={i} className='h-full w-full' />,
  );
});
Loader.displayName = 'Loader';
