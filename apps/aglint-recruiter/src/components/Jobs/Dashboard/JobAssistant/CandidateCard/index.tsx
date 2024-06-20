import axios from 'axios';
import { useState } from 'react';

import { AssistantCandidateDetails } from '@/devlink/AssistantCandidateDetails';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';
import { useJobAssistantContext } from '@/src/context/JobAssistant';
import { getResumeMatched } from '@/src/context/JobAssistant/utils';
// import { supabase } from '@/src/utils/supabase/client';
// import { supabase } from '@/src/utils/supabaseClient';

function CandidateCard({
  application,
  setOpen,
}: {
  application: JobApplication;
  // eslint-disable-next-line no-unused-vars
  setOpen: (x: true | false) => void;
}) {
  const { city, state, country, experience_in_months, first_name, last_name } =
    application.candidates;
  // console.log(application);

  const { setApplicationDetails } = useJobAssistantContext();
  const overall_score = application?.overall_score;
  const resume_match = getResumeMatched(overall_score) as any;
  const [clickEvent, setClickEvent] = useState(false);
  const handleClick = async () => {
    setClickEvent(true);
    const { data: candidate_files } = await axios.post(
      '/api/supabase/getCandidate-files',
      {
        id: application.candidates.id,
      },
    );
    // const { data: assessment_results } = await supabase
    //   .from('assessment_results')
    //   .select()
    //   .eq('application_id', application.id);

    setApplicationDetails({
      ...application,
      candidate_files: candidate_files[0],
      // assessment_results: assessment_results[0],
      emailValidity: {
        isFetching: false,
        isValidEmail: false,
      },
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
        // slotCheckBox={
        //   <Stack
        //     sx={{
        //       // border: '1px solid',
        //       borderRadius: '3px',
        //     }}
        //     direction={'row'}
        //     width={14}
        //     height={14}
        //   >
        //     <ScrCheckmarkIcon />
        //   </Stack>
        // }
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
            level={`${first_name} ${last_name || ''}`}
          />
        }
        colorPropsMatch={{
          style: {
            color: resume_match?.bgColor,
          },
        }}
        textMatchCount={`${resume_match?.text}-${overall_score}%`}
        textName={`${first_name} ${last_name || ''}`}
        textLocation={`${city || ''},${state || ''},${country || ''}`}
        textExperience={
          (experience_in_months ? (experience_in_months / 12).toFixed(1) : 0) +
          (Number((experience_in_months / 12).toFixed(1)) > 1
            ? ' years'
            : ' year')
        }
        isTopMatchVisible={overall_score > 0}
        isLocationVisible={!!city || !!state || !!country}
        // isExperienceVisible={experience_in_months}
        isRelevantSkillVisible={false}
      />
    </>
  );
}

export default CandidateCard;
