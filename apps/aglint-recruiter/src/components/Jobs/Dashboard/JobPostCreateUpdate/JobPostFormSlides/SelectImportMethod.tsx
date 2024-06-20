import { NewJobSelect } from '@/devlink/NewJobSelect';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { useJobForm } from '../JobPostFormProvider';

const FormOne = () => {
  const { handleInitializeForm } = useJobForm();
  const { recruiter, recruiterUser } = useAuthDetails();

  return (
    <>
      <NewJobSelect
        onClickCreateJobAglint={{
          onClick: () => {
            handleInitializeForm({
              type: 'new',
              recruiter,
              recruiterUser,
              currSlide: 'details',
            });
          },
        }}
      />
    </>
  );
};

export default FormOne;
