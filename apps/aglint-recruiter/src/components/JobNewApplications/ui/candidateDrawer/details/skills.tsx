/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';

import { CandidateDetail } from '@/devlink/CandidateDetail';
import { CandidateSkillPills } from '@/devlink/CandidateSkillPills';
import { useApplication } from '@/src/context/ApplicationContext';

const Skills = () => {
  const {
    application: { data, status },
  } = useApplication();
  if (status === 'pending') return <>Loading skills ...</>;
  if (
    !(
      (data?.resume?.resume_json?.skills ?? []).length &&
      data?.score_json?.relevance?.skills
    )
  )
    return <></>;
  return (
    <CandidateDetail
      slotBody={<Skill />}
      textTitle={'Skills'}
      slotBadge={<></>}
    />
  );
};

export { Skills };

const Skill = () => {
  const {
    application: {
      data: {
        resume: {
          resume_json: { skills },
        },
        score_json: {
          relevance: { skills: relevance },
        },
      },
    },
  } = useApplication();
  return (
    <Stack direction={'row'} width={'100%'} flexWrap={'wrap'} gap={1}>
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
    </Stack>
  );
};
