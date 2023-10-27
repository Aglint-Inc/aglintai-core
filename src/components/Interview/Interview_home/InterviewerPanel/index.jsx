import { Avatar } from '@mui/material';

import { InterviewInterviewerScreen } from '@/devlink';
import { useInterviewContext } from '@/src/context/InterviewContext';
function InterviewerPanel() {
  const { totalNumberOfQuestions, questionIndex, character } =
    useInterviewContext();

  return (
    <>
      <InterviewInterviewerScreen
        slotAiVideo={
          <Avatar
            sx={{
              width: '100%',
              height: '100%',
            }}
            variant='rounded'
            src={`https://ftyioiysswsjxamofooi.supabase.co/storage/v1/object/public/interview_prep/temp-used/female_interviewer.svg`}
          ></Avatar>
        }
        textQuestion={`Question: ${questionIndex + 1}/${
          totalNumberOfQuestions?.length
        }`}
        textAi={character ? character : 'Loading...'}
      />
    </>
  );
}

export default InterviewerPanel;
