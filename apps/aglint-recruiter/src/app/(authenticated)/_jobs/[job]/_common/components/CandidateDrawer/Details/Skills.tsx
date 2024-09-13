/* eslint-disable security/detect-object-injection */
import { Skeleton } from '@components/ui/skeleton';
import { CandidateDetail } from '@devlink/CandidateDetail';
import { Lightbulb, Medal } from 'lucide-react';

import { UIBadge } from '@/components/Common/UIBadge';
import { useApplication } from '@/context/ApplicationContext';

import { Loader } from '../Common/Loader';

const Skills = () => {
  return (
    <CandidateDetail
      slotIcon={<Lightbulb size={16} />}
      slotBody={
        <div className='flex flex-row flex-wrap w-full gap-1'>
          <Content />
        </div>
      }
      textTitle={'Skills'}
      slotBadge={<></>}
    />
  );
};

export { Skills };

const Content = () => {
  const {
    details: { data, status },
  } = useApplication();
  if (status === 'pending')
    return (
      <Loader count={10}>
        <div className='relative w-[60px] h-[22px]'>
          <Skeleton className='h-10 w-full' />
        </div>
      </Loader>
    );
  if (
    !(
      (data?.resume_json?.skills ?? []).length &&
      data?.score_json?.relevance?.skills
    )
  )
    return (
      <div className='flex flex-col items-center justify-center p-4'>
        <Medal className='text-gray-500 w-12 h-12 mb-2' />
        <p className='text-gray-600 text-sm'>No skills found</p>
      </div>
    );
  return <Skill />;
};

const Skill = () => {
  const {
    details: {
      data: {
        resume_json: { skills },
        score_json: {
          relevance: { skills: relevance },
        },
      },
    },
  } = useApplication();
  return (
    <>
      {skills.map((skill, i) => (
        <UIBadge
          key={i}
          textBadge={skill}
          color={relevance[skill] === 'high' ? 'purple' : 'neutral'}
        />
      ))}
    </>
  );
};
