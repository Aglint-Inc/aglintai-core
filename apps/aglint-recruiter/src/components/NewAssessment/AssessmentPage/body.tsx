/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AssessmentDetailBody } from '@/devlink2/AssessmentDetailBody';
import { AssessmentError as AssessmentErrorDev } from '@/devlink2/AssessmentError';
import { DragAndDrop } from '@/devlink2/DragAndDrop';
import { useAssessmentQuestionCreate } from '@/src/queries/assessment/questions';

import { useRecommendationCardDrop } from '../hooks';
import useAssessmentStore from '../Stores';
import { getQuestionDefaults } from '../utils';
import { useAssessment } from './context';
import AssessmentQuestionEditor from './editor';
import AssessmentQuestions from './questions';
import AssessmentRecommendations from './recommendations';

const AssessmentPageBody = () => {
  const {
    questions: { status, data },
  } = useAssessment();
  const {
    mutation: { mutate },
  } = useAssessmentQuestionCreate();
  if (status === 'error') return <AssessmentError />;
  const len = data?.length ?? '-';
  const handleAddQuestion = () => {
    const defaults = getQuestionDefaults('qna');
    mutate({ ...(defaults as any), id: null });
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <AssessmentDetailBody
        isQuestionTopBar={status === 'success' && len !== 0}
        slotQuestionCards={<AssessmentQuestions />}
        slotQuestionDetail={<AssessmentQuestionDetail />}
        slotRecommendedQuestions={<AssessmentRecommendations />}
        textQuestionNumber={`${len} Question${len === 1 ? '' : 's'}`}
        onClickAddQuestion={{ onClick: () => handleAddQuestion() }}
      />
    </DndProvider>
  );
};

export default AssessmentPageBody;

const AssessmentError = () => {
  const {
    questions: { refetch },
  } = useAssessment();
  return <AssessmentErrorDev onClickRetry={{ onClick: () => refetch() }} />;
};

const AssessmentQuestionDetail = () => {
  const { canDrop, dropRef } = useRecommendationCardDrop();
  const {
    questions: { data },
  } = useAssessment();
  const currentQuestion = useAssessmentStore((state) => state.currentQuestion);
  if (!canDrop && data && currentQuestion !== -1) {
    return (
      <AssessmentQuestionEditor
        key={data[currentQuestion]?.id}
        question={data[currentQuestion]}
        len={data.length}
      />
    );
  }
  return (
    <Stack ref={dropRef as any} height={'100%'}>
      <DragAndDrop isDropping={canDrop} />
    </Stack>
  );
};
