import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import PAGES from '@/src/utils/routing/pageRouting';

import { getCandidateDetails, getJobDetails } from './utils';

const InterviewDetailsContext = createContext();

const useInterviewDetailsContext = () => useContext(InterviewDetailsContext);
function InterviewDetailsContextProvider({ children }) {
  const router = useRouter();

  const [candidateDetails, setCandidateDetails] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const application_id = router.query.id;
    const job_id = router.query.job_id;
    if (application_id) {
      fetchingDetails(application_id);
    }
    if (job_id) {
      getJob(job_id);
    }
  }, [router]);

  async function getJob(job_id) {
    const job_Details = await getJobDetails(job_id);
    setJobDetails(job_Details || {});
    setInitialLoading(false);
  }

  function fetchingDetails(application_id) {
    getCandidateDetails(application_id).then(async (candidate_details) => {
      const job_Details = await getJobDetails(candidate_details?.job_id);
      if (!job_Details.assessment) {
        router.push('/404');
        return;
      }
      if (candidate_details?.length === 0 || job_Details?.length === 0) {
        router.push('/404');
        return null;
      }
      if (
        router.pathname.includes(PAGES['/assessment-new']()) &&
        candidate_details?.feedback !== null &&
        candidate_details?.feedback !== undefined
      ) {
        router.push(`/thanks-page?id=${application_id}`);
        return;
      }

      setCandidateDetails(candidate_details || {});
      setJobDetails(job_Details || {});
      setInitialLoading(false);
    });
  }

  return (
    <InterviewDetailsContext.Provider
      value={{
        candidateDetails,
        setCandidateDetails,
        jobDetails,
        setJobDetails,
        initialLoading,
      }}
    >
      {children}
    </InterviewDetailsContext.Provider>
  );
}

export { InterviewDetailsContextProvider, useInterviewDetailsContext };
