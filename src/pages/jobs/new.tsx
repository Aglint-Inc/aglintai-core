import React, { useEffect, useState } from 'react';

import JobForm from '@/src/components/Job/JobForm';
import JobPostFormProvider, {
  useJobForm,
} from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

function Hoc() {
  return (
    <JobPostFormProvider>
      <New />
    </JobPostFormProvider>
  );
}

function New() {
  const [isFormInit, setIsFormInit] = useState(true);
  const { recruiter } = useAuthDetails();
  const { handleInitializeForm } = useJobForm();

  useEffect(() => {
    handleInitializeForm({
      type: 'new',
      recruiter,
      currSlide: 'details',
    });
    setIsFormInit(false);
  }, []);

  return <>{!isFormInit && <JobForm />}</>;
}

export default Hoc;
