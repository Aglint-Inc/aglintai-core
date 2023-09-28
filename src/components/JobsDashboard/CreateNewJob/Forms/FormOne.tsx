import { NewJobStep1 } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';

const FormOne = ({ nextSlide }) => {
  const { dispatch } = useJobForm();
  const handleInitiliseForm = () => {
    dispatch({
      type: 'initForm',
      payload: {
        recruiterId: '',
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
