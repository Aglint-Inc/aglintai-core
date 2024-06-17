/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';

import { CandidateDetail } from '@/devlink/CandidateDetail';
import { CandidateSkillPills } from '@/devlink/CandidateSkillPills';
import { Skeleton } from '@/devlink2/Skeleton';
import { GlobalIcon } from '@/devlink3/GlobalIcon';
import { useApplication } from '@/src/context/ApplicationContext';

import { Loader } from '../common';

const Skills = () => {
  return (
    <CandidateDetail
      slotIcon={<GlobalIcon size={5} iconName={'handyman'} />}
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
    return <>No skills found</>;
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
        <CandidateSkillPills
          key={i}
          textSkill={skill}
          propsBgColor={{
            style: {
              backgroundColor:
                relevance[skill] === 'high' && 'rgba(248, 249, 249, 1)',
            },
          }}
        />
      ))}
    </>
  );
};
