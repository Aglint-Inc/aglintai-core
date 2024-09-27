import { type DatabaseTable } from '@aglint/shared-types';
import { RotateCcw, RotateCw } from 'lucide-react';
import React from 'react';

function InterviewerTrainingTypeIcon({
  type,
}: {
  type: DatabaseTable['interview_session_relation']['training_type'];
}) {
  return (
    <>
      {type == 'reverse_shadow' && <RotateCcw />}
      {type == 'shadow' && <RotateCw />}
    </>
  );
}

export default InterviewerTrainingTypeIcon;
