import { NewJobStep1 } from '@/devlink';

import { useJobList } from '../JobPostFormProvider';

const FormOne = ({ nextSlide }) => {
  const { dispatch } = useJobList();
  const handleInitiliseForm = () => {
    dispatch({
      type: 'initForm',
      payload: {
        formType: 'new',
        payload: {
          applicantsCount: 0,
          company: 'Google',
          id: '',
          interviewingCount: 0,
          jobLocation: 'bangalore',
          jobTitle: 'Engineer',
          jobType: '',
          shortListedCount: 0,
          status: 'draft',
          workPlaceType: '',
          skills: [],
          jobDescription: '',
          interviewType: 'ai-powered',
        },
      },
    });
    nextSlide();
  };

  return (
    <>
      <NewJobStep1
        onClickCreateJobAglint={{
          onClick: handleInitiliseForm,
        }}
      />
    </>
  );
};

export default FormOne;
