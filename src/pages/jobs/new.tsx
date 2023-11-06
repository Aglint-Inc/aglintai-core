import { isEmpty } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';

import EmptyJobDashboard from '@/src/components/JobsDashboard/AddJobWithIntegrations/EmptyJobDashboard';
import JobForm from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobForm/JobForm';
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
  const { recruiter } = useAuthDetails();
  const { handleInitializeForm, jobForm } = useJobForm();

  const router = useRouter();
  useEffect(() => {
    if (router.isReady && !isEmpty(router.query)) {
      const { flow } = router.query;
      if (flow === 'manual') {
        handleInitializeForm({
          type: 'new',
          currSlide: 'details',
          recruiter,
        });
      }
    }
  }, [router.query]);

  return (
    <>
      {!jobForm.isFormOpen && (
        <EmptyJobDashboard
          heading={'Create Job'}
          handleClickAddJob={() => {
            router.push(`/jobs/new?flow=manual`);
          }}
          showMsg={false}
        />
      )}
      {jobForm.isFormOpen && <JobForm />}
    </>
  );
}

export default Hoc;
