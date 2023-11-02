import { Avatar } from '@mui/material';

import { InterviewInterviewerScreen } from '@/devlink';
import { useInterviewContext } from '@/src/context/InterviewContext';
import interviewerList from '@/src/utils/interviewer_list';
function InterviewerPanel() {
  const { totalNumberOfQuestions, questionIndex, character, interviewerIndex } =
    useInterviewContext();

  return (
    <>
      <InterviewInterviewerScreen
        isPlayPauseVisible={false}
        slotAiVideo={
          <Avatar
            sx={{
              width: '100%',
              height: '100%',
              '& img': {
                objectFit: 'contain',
              },
            }}
            variant='rounded'
            src={interviewerList[Number(interviewerIndex)]?.image}
          />
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
