import { Stack } from '@mui/material';

import { useCandidateAssessment } from '@/src/context/CandidateAssessment';
import { InterviewContextProvider } from '@/src/context/InterviewContext';
import ScreenSizeProvider from '@/src/context/ResizeWindow/ResizeWindow';

import Loader from '../../Common/Loader';
import ClassicMode from './ClassicMode';
import VerbalMode from './VerbalMode';

function AssessmentDashboard() {
  const { fetching, selectedAssessment } = useCandidateAssessment();

  if (fetching) {
    return (
      <Stack width={'100%'} height={'100vh'}>
        <Loader />
      </Stack>
    );
  }
  return (
    <>
      {selectedAssessment?.mode == 'classic' && <ClassicMode />}
      {selectedAssessment?.mode === 'verbal' && (
        <ScreenSizeProvider>
          <InterviewContextProvider>
            <VerbalMode />
          </InterviewContextProvider>
        </ScreenSizeProvider>
      )}
    </>
  );
}

export default AssessmentDashboard;
