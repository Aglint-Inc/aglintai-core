import { Avatar } from '@mui/material';

import { InterviewInterviewerScreen } from '@/devlink/InterviewInterviewerScreen';
import { useInterviewContext } from '@/src/context/InterviewContext';
import interviewerList from '@/src/utils/interviewer_list';
function InterviewerPanel() {
  const {
    totalNumberOfQuestions,
    questionIndex,
    character,
    interviewerIndex,
    showStartCard,
  } = useInterviewContext();

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
        isQuestionPillVisible={
          showStartCard && questionIndex <= totalNumberOfQuestions?.length - 2
        }
        textQuestion={`Question: ${questionIndex}/${
          totalNumberOfQuestions?.length - 2
        }`}
        textAi={character ? character : 'Loading...'}
      />
    </>
  );
}

export default InterviewerPanel;
