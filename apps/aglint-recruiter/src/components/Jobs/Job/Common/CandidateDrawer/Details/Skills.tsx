/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';

import { CandidateDetail } from '@/devlink/CandidateDetail';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { Skeleton } from '@/devlink2/Skeleton';
import { GlobalIcon } from '@/devlink3/GlobalIcon';
import { useApplication } from '@/src/context/ApplicationContext';

import { Loader } from '../Common/Loader';
import { getIconName } from '../utils';
import { EmptyDetailState } from './Common/EmptyDetailState';

const Skills = () => {
  return (
    <CandidateDetail
      slotIcon={<GlobalIcon size={5} iconName={getIconName('Skills')} />}
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
          <Skeleton />
        </Stack>
      </Loader>
    );
  if (
    !(
      (data?.resume_json?.skills ?? []).length &&
      data?.score_json?.relevance?.skills
    )
  )
    return <EmptyDetailState section='Skills' />;
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
        <GlobalBadge
          key={i}
          textBadge={skill}
          color={relevance[skill] === 'high' ? 'purple' : 'neutral'}
        />
      ))}
    </>
  );
};
