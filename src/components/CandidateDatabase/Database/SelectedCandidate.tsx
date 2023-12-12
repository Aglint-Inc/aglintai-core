import { get } from 'lodash';
import React, { useEffect, useState } from 'react';

import { useJobs } from '@/src/context/JobsContext';

import { useCandFilter } from './CandDbProvider';
import CandidateDrawer from '../CandidateDetailsDrawer';
import { newCandJob } from '../Search/Search';

const SelectedCandidate = ({
  path,
  onClickClose,
  onClickNext,
  onClickPrev,
  onCLickEmailOutReach,
  isEmailOutreachVisible = true,
  showClose,
}) => {
  const { candState, handleAddCandidatesTojob } = useCandFilter();
  const candidate = get(candState.candidates, path);
  const [eligibleJobs, setElegebleJobs] = useState<newCandJob[]>([]);

  const { jobsData } = useJobs();
  useEffect(() => {
    const candidate = get(candState.candidates, path);
    if (!candidate) return;
    const candJobIds = candidate.applied_job_posts.map((c) => c.job_id);
    const eligiJobs: newCandJob[] = jobsData.jobs
      .filter((j) => j.status === 'published' && !candJobIds.includes(j.id))
      .map((j) => ({ id: j.id, title: j.job_title }));
    setElegebleJobs(eligiJobs);
  }, [candState, jobsData.jobs, path]);

  if (!candidate) return <></>;

  return (
    <>
      <CandidateDrawer
        showClose={showClose}
        showBookmark={false}
        candidate={{
          ...candidate,
          is_bookmarked: false,
        }}
        eligibleJobs={eligibleJobs}
        handleAddApplications={(jobdetails) => {
          handleAddCandidatesTojob(
            [candidate.application_id],
            jobdetails.map((j) => ({ job_id: j.id, job_title: j.title })),
          );
        }}
        onClickClose={() => {
          onClickClose();
        }}
        isEmailOutreachVisible={isEmailOutreachVisible}
        onClickNext={() => {
          onClickNext();
        }}
        onClickPrev={() => {
          onClickPrev();
        }}
        toggleBookMark={() => {
          //
        }}
        onClickEmailOutreach={() => {
          onCLickEmailOutReach();
        }}
      />
    </>
  );
};

export default SelectedCandidate;
