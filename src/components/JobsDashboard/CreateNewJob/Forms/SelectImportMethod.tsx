import { NewJobSelect } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { useJobForm } from '../JobPostFormProvider';

const FormOne = () => {
  const { handleInitializeForm } = useJobForm();
  const { recruiter } = useAuthDetails();

  return (
    <>
      <NewJobSelect
        onClickCreateJobAglint={{
          onClick: () => {
            handleInitializeForm({ type: 'new', recruiter });
          },
        }}
      />
    </>
  );
};

export default FormOne;
