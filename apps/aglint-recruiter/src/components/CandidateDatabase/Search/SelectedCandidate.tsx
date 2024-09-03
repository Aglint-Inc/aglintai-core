import React, { useEffect, useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';

import {
  type CandidateSearchRes,
  useCandidateSearchCtx,
} from '../../../context/CandidateSearchProvider/CandidateSearchProvider';
import CandidateDrawer from '../Database/CandidateDetailsDrawer';
import { type newCandJob } from './Search';

const SelectedCandidate = ({
  candidate,
  onClickClose,
  onClickNext,
  onClickPrev,
  toggleBookMark,
  showEmailOutReach,
  onClickEmailOutReach,
}: {
  candidate: CandidateSearchRes;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickClose: () => void;
  toggleBookMark: () => any;
  onClickEmailOutReach: () => any;
  showEmailOutReach: boolean;
}) => {
  // const { updateState, candidateSearchState } = useCandidateSearchCtx();
  const { recruiter_id } = useAuthDetails();
  const { jobs } = useJobs();
  const [eligibleJobs, setElegebleJobs] = useState<newCandJob[]>([]);
  const { handleAddCandidatesTojob, candidateSearchState } =
    useCandidateSearchCtx();

  useEffect(() => {
    if (jobs.status === 'pending' || !candidate) return;
    const candJobIds = candidate.applied_job_posts.map((c) => c.job_id);
    const eligiJobs: newCandJob[] = jobs.data
      .filter((j) => j.status === 'published' && !candJobIds.includes(j.id))
      .map((j) => ({ id: j.id, title: j.job_title }));
    setElegebleJobs(eligiJobs);
  }, [jobs, candidate, candidateSearchState.candidates]);

  if (!candidate) return <></>;
  const handleAddApplications = async (checkedJobIds: newCandJob[]) => {
    try {
      handleAddCandidatesTojob(
        [candidate.application_id],
        checkedJobIds.map((cjob) => ({
          job_id: cjob.id,
          job_title: cjob.title,
          recruiter_id,
        })),
      );
    } catch (err) {
      //
    } finally {
      //
    }
  };
  return (
    <>
      <CandidateDrawer
        type='Talent'
        candidate={candidate}
        eligibleJobs={eligibleJobs}
        handleAddApplications={handleAddApplications}
        onClickClose={onClickClose}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        toggleBookMark={toggleBookMark}
        isEmailOutreachVisible={showEmailOutReach}
        onClickEmailOutreach={onClickEmailOutReach}
      />
    </>
  );
};

export default SelectedCandidate;
