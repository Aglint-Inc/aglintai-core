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
            handleInitializeForm({ type: 'new', recruiter, slideNo: 1 });
          },
        }}
      />
    </>
  );
};

export default FormOne;
