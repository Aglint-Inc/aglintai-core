import { useState } from 'react';

import { AssistantCandidateDetails } from '@/devlink/AssistantCandidateDetails';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useJobAssistantContext } from '@/src/context/JobAssistant';
import { getResumeMatched } from '@/src/context/JobAssistant/utils';
import { Application } from '@/src/types/applications.types';

function CandidateCard({
  application,
  setOpen,
}: {
  application: Application;
  // eslint-disable-next-line no-unused-vars
  setOpen: (x: true | false) => void;
}) {
  const { city, state, country, name } = application;
  const { setApplicationDetails } = useJobAssistantContext();
  const overall_score = application?.resume_score;
  const resume_match = getResumeMatched(overall_score) as any;
  const [clickEvent, setClickEvent] = useState(false);
  const handleClick = async () => {
    setClickEvent(true);
    setApplicationDetails({
      ...application,
    });
    setClickEvent(false);
    setOpen(true);
  };
  return (
    <>
      <AssistantCandidateDetails
        isOverviewTextVisible={true}
        isExperienceVisible={true}
        isOverviewVisible={false}
        onClickCard={{
          onClick: handleClick,
          style: {
            cursor: clickEvent ? 'wait' : 'pointer',
          },
        }}
        textOVerview={'sdsd'}
        slotProfile={
          <MuiAvatar
            variant='rounded-xs'
            src={'/recruiter.logo'}
            level={name}
          />
        }
        colorPropsMatch={{
          style: {
            color: resume_match?.bgColor,
          },
        }}
        textMatchCount={`${resume_match?.text}-${overall_score}%`}
        textName={name}
        textLocation={`${city || ''},${state || ''},${country || ''}`}
        //TODO: Implement experience in months
        // textExperience={
        //   (experience_in_months ? (experience_in_months / 12).toFixed(1) : 0) +
        //   (Number((experience_in_months / 12).toFixed(1)) > 1
        //     ? ' years'
        //     : ' year')
        // }
        isTopMatchVisible={overall_score > 0}
        isLocationVisible={!!city || !!state || !!country}
        // isExperienceVisible={experience_in_months}
        isRelevantSkillVisible={false}
      />
    </>
  );
}

export default CandidateCard;
