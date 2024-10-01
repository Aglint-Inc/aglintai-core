import { type DatabaseTable } from '@aglint/shared-types';
import React from 'react';

import ReverseShadowIcon from '@/authenticated/components/ReverseShadowIcon';
import ShadowIcon from '@/authenticated/components/ShadowIcon';

function InterviewerTrainingTypeIcon({
  type,
}: {
  type: DatabaseTable['interview_session_relation']['training_type'];
}) {
  return (
    <>
      {type == 'reverse_shadow' && <ReverseShadowIcon/>}
      {type == 'shadow' && <ShadowIcon />}
    </>
  );
}

export default InterviewerTrainingTypeIcon;
