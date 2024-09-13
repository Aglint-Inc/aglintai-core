/* eslint-disable security/detect-object-injection */
import { Skeleton } from '@components/ui/skeleton';
import { CandidateDetail } from '@devlink/CandidateDetail';
import { Stack } from '@mui/material';
import { Lightbulb, Medal } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { UIBadge } from '@/components/Common/UIBadge';
import { useApplication } from '@/context/ApplicationContext';

import { Loader } from '../Common/Loader';

const Skills = () => {
  return (
    <CandidateDetail
      slotIcon={<Lightbulb size={16} />}
      slotBody={
        <Stack direction={'row'} width={'100%'} flexWrap={'wrap'} gap={1}>
          <Content />
        </Stack>
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
        <Stack style={{ position: 'relative', width: '60px', height: '22px' }}>
          <Skeleton className='h-10 w-full' />
        </Stack>
      </Loader>
    );
  if (
    !(
      (data?.resume_json?.skills ?? []).length &&
      data?.score_json?.relevance?.skills
    )
  )
    return <GlobalEmpty iconSlot={<Medal className='text-gray-500'/>} text={'No skills found'}/>;
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
