import { nanoid } from 'nanoid';

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
          skills: ['HTML'],
          jobDescription: 's',
          interviewType: 'ai-powered',
          interviewConfig: {
            skill: {
              id: nanoid(),
              copy: 'Skill',
              questions: [],
              value: false,
            },
            cultural: {
              id: nanoid(),
              copy: 'Cultural',
              value: false,
              questions: [],
            },
            personality: {
              id: nanoid(),
              copy: 'Personality',
              questions: [],
              value: false,
            },
            softSkills: {
              id: nanoid(),
              copy: 'Soft Skills',
              questions: [],
              value: false,
            },
          },
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
