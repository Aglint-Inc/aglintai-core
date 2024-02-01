import React, { useEffect, useState } from 'react';

import { useJobs } from '@/src/context/JobsContext';

import { newCandJob } from './Search';
import CandidateDrawer from '../Database/CandidateDetailsDrawer';
import {
  CandidateSearchRes,
  useCandidateSearchCtx,
} from '../../../context/CandidateSearchProvider/CandidateSearchProvider';

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
  const { jobsData } = useJobs();
  const [eligibleJobs, setElegebleJobs] = useState<newCandJob[]>([]);
  const { handleAddCandidatesTojob, candidateSearchState } =
    useCandidateSearchCtx();

  useEffect(() => {
    if (!jobsData.jobs || !candidate) return;
    const candJobIds = candidate.applied_job_posts.map((c) => c.job_id);
    const eligiJobs: newCandJob[] = jobsData.jobs
      .filter((j) => j.status === 'published' && !candJobIds.includes(j.id))
      .map((j) => ({ id: j.id, title: j.job_title }));
    setElegebleJobs(eligiJobs);
  }, [jobsData, candidate, candidateSearchState.candidates]);

  if (!candidate) return <></>;
  const handleAddApplications = async (checkedJobIds: newCandJob[]) => {
    try {
      handleAddCandidatesTojob(
        [candidate.application_id],
        checkedJobIds.map((cjob) => ({
          job_id: cjob.id,
          job_title: cjob.title,
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
