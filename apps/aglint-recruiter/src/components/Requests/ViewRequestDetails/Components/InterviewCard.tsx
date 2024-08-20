import axios from 'axios';
import { useEffect } from 'react';

import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { InterviewerListRd } from '@/devlink2/InterviewerListRd';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import ScheduleIndividualCard from '@/src/components/Jobs/Job/ApplicationDetail/SlotBody/InterviewTabContent/StageSessions/StageIndividual/ScheduleIndividual';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import IconSessionType from '@/src/components/Scheduling/CandidateDetails/RightPanel/IconSessionType';
import IconScheduleType from '@/src/components/Scheduling/Candidates/ListCard/Icon/IconScheduleType';
import { ApiInterviewStages } from '@/src/pages/api/scheduling/application/fetchInterviewStagesBySessionId';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { getMeetingsList } from '../hooks';

function InterviewCard({
  session,
}: {
  session: ApiInterviewStages['response']['stage']['sessions'][number];
}) {
  return (
    <div>
      <ScheduleIndividualCard
        session={session}

        // session={session}
        // key={session.interview_session.id}
        // selectedSessionIds={}
        // onClickCheckBox={() => {}}
        // isCheckboxVisible={false}
        // candidate={{
        //   name: '',
        //   current_job_title: '',
        // }}
        // isEditIconVisible={true}
        // isViewDetailVisible={true}
      />
    </div>
  );
}

export default InterviewCard;
