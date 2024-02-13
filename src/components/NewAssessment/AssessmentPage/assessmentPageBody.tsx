import { capitalize } from 'lodash';

import {
  AssessmentDetailBody,
  AssessmentError as AssessmentErrorDev,
  //   AssessmentQuestionDetail as AssessmentQuestionDetailDev,
  //   AssessmentQuestionDetailLoader,
  DragAndDrop,
  QuestionCard,
  QuestionCardLoader,
  QuestionsEmpty,
  RecommendedCardLoader,
  RecommendedQuestionCard,
} from '@/devlink2';
import {
  useAssessment,
  useRecommendedQuestion,
} from '@/src/queries/assessment/pages';

const AssessmentPageBody = () => {
  const { status, data } = useAssessment();
  if (status === 'error') return <AssessmentError />;
  const len = data?.length ?? '-';
  return (
    <AssessmentDetailBody
      isQuestionTopBar={status === 'success' && len !== 0}
      slotQuestionCards={<AssessmentQuestions />}
      slotQuestionDetail={<AssessmentQuestionDetail />}
      slotRecommendedQuestions={<AssessmentRecommendations />}
      textQuestionNumber={`${len} Question${len === 1 ? '' : 's'}`}
    />
  );
};

export default AssessmentPageBody;

const AssessmentError = () => {
  const { refetch } = useAssessment();
  return <AssessmentErrorDev onClickRetry={{ onClick: () => refetch() }} />;
};

const AssessmentQuestions = () => {
  const { status, data } = useAssessment();
  if (status === 'pending') return <AssessmentQuestionsLoading />;
  if (data.length === 0) return <QuestionsEmpty />;
  const cards = data.map(({ question, type }, i) => (
    <QuestionCard
      key={i}
      textQuestion={question.label}
      textQuestionType={capitalize(type)}
    />
  ));
  return <>{cards}</>;
};

const AssessmentQuestionsLoading = () => {
  const cards = [...Array(8)].map((a, i) => <QuestionCardLoader key={i} />);
  return <>{cards}</>;
};

const AssessmentRecommendations = () => {
  const { status, data } = useRecommendedQuestion();
  if (status === 'pending') return <AssessmentRecommendationLoading />;
  if (status === 'error') return <></>;
  const cards = data.map(({ question, type }, i) => (
    <RecommendedQuestionCard
      key={i}
      textQuestion={question.label}
      textQuestionType={capitalize(type)}
    />
  ));
  return <>{cards}</>;
};

const AssessmentRecommendationLoading = () => {
  const cards = [...Array(8)].map((a, i) => <RecommendedCardLoader key={i} />);
  return <>{cards}</>;
};

const AssessmentQuestionDetail = () => {
  //   const { status } = useAssessment();
  return <DragAndDrop />;
  //   if (status === 'pending') return <AssessmentQuestionDetailLoader />;
  //   return <AssessmentQuestionDetailDev />;
};
