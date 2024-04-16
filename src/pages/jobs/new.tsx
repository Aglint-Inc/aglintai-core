import { isEmpty } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

import Seo from '@/src/components/Common/Seo';
import EmptyJobDashboard from '@/src/components/JobsDashboard/AddJobWithIntegrations/EmptyJobDashboard';
import JobForm from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobForm/JobForm';
import JobPostFormProvider, {
  useJobForm,
} from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import IntegrationProvider from '@/src/context/IntegrationProvider/IntegrationProvider';
import { pageRoutes } from '@/src/utils/pageRouting';

function Hoc() {

  return (
    <>
      <Seo
        title={`Jobs`}
        description='AI Powered Talent Development Platform.'
      />
      <JobPostFormProvider>
        <IntegrationProvider>
          <New />
        </IntegrationProvider>
      </JobPostFormProvider>
    </>
  );
}

function New() {
  const { recruiter, recruiterUser } = useAuthDetails();
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
          recruiterUser,
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
            router.push(pageRoutes.CREATEJOB);
          }}
          showMsg={false}
        />
      )}
      {jobForm.isFormOpen && <JobForm />}
    </>
  );
}

export default Hoc;
