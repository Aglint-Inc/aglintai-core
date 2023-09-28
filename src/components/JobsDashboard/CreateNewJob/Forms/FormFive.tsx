import { NewJobStep5 } from '@/devlink';

import { useJobList } from '../JobPostFormProvider';

const FormFive = () => {
  const {
    jobs: {
      editingJob: {
        job: { interviewType },
      },
    },
    dispatch,
  } = useJobList();

  return (
    <NewJobStep5
      isAiPoweredScreeningChecked={interviewType === 'ai-powered'}
      onClickAiPoweredScreening={{
        onClick: () => {
          dispatch({
            type: 'setJobdetails',
            payload: {
              path: 'interviewType',
              value: 'ai-powered',
            },
          });
        },
      }}
      onClickStandardScreening={{
        onClick: () => {
          dispatch({
            type: 'setJobdetails',
            payload: {
              path: 'interviewType',
              value: 'questions-preset',
            },
          });
        },
      }}
      isStandardScreeningChecked={interviewType === 'questions-preset'}
      // slotSkillQuestion={<></>}
    />
  );
};

export default FormFive;
