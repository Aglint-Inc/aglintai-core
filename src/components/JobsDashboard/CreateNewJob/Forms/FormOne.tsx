import { NewJobStep1 } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';

const FormOne = ({ nextSlide }) => {
  const { dispatch } = useJobForm();
  const handleInitiliseForm = () => {
    dispatch({
      type: 'initForm',
      payload: {
        createAt: null,
        formType: 'new',
        jobPostId: undefined,
        updatedAt: null,
        formFields: {
          applicantsCount: 0,
          company: 'Google',
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
          interviewConfig: [],
        },
        slideNo: 0,
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
