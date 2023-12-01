import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import JobForm from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobForm/JobForm';
import JobPostFormProvider, {
  useJobForm,
} from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabaseClient';

function Hoc() {
  return (
    <JobPostFormProvider>
      <Edit />
    </JobPostFormProvider>
  );
}

function Edit() {
  const [isFormInit, setIsFormInit] = useState(true);
  const { recruiter } = useAuthDetails();
  const { handleInitializeForm } = useJobForm();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const appId = router.query.job_id;
        if (!appId) return;
        const [jobApp] = supabaseWrap(
          await supabase.from('public_jobs').select().eq('id', appId),
        );
        if (!jobApp) {
          router.replace('/jobs');
        }
        handleInitializeForm({
          job: jobApp,
          type: 'edit',
          recruiter,
          currSlide: 'details',
        });
        setIsFormInit(false);
      } catch (err) {
        //
      } finally {
        //
      }
    })();
  }, [router.isReady]);

  return <>{!isFormInit && <JobForm />}</>;
}

export default Hoc;
