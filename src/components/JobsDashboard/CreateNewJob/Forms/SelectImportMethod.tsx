import { NewJobSelect } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { useJobForm } from '../JobPostFormProvider';

const FormOne = ({ nextSlide }) => {
  const { dispatch } = useJobForm();
  const { recruiter } = useAuthDetails();
  const handleInitiliseForm = () => {
    recruiter &&
      dispatch({
        type: 'initForm',
        payload: {
          recruiterId: recruiter.id,
        },
      });
    nextSlide();
  };

  return (
    <>
      <NewJobSelect
        onClickCreateJobAglint={{
          onClick: handleInitiliseForm,
        }}
      />
    </>
  );
};

export default FormOne;
