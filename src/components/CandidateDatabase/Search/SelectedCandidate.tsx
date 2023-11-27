import { Dialog, Stack } from '@mui/material';
import axios from 'axios';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

import {
  AddedJobList,
  CandidateDialog,
  CandidateEducation,
  CandidateEducationCard,
  CandidateExperienceCard,
} from '@/devlink';
import { CandidateExperience } from '@/devlink/CandidateExperience';
import { useJobs } from '@/src/context/JobsContext';
import { getformatedDate, getFullName } from '@/src/utils/jsonResume';

import AddToJobOptions from './CandAddToJobMenu';
import { newCandJob } from './Search';
import {
  CandidateSearchRes,
  useCandidateSearchCtx,
} from '../context/CandidateSearchProvider';
import MuiAvatar from '../../Common/MuiAvatar';
import ResumePreviewer from '../../JobApplicationsDashboard/ApplicationCard/ApplicationDetails/ResumePreviewer';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';

const SelectedCandidate = ({
  candidate,
  onClickClose,
  onClickNext,
  onClickPrev,
  toggleBookMark,
}: {
  candidate: CandidateSearchRes;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickClose: () => void;
  toggleBookMark: () => any;
}) => {
  // const { updateState, candidateSearchState } = useCandidateSearchCtx();
  const [resume, setResume] = useState(false);
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
  const handleOpenResume = async () => {
    if (isEmpty(candidate.resume_link)) return;
    if (candidate.resume_link.includes('.pdf')) {
      setResume(true);
    } else {
      const link = document.createElement('a');
      link.download = candidate.resume_link;
      link.href = candidate.resume_link;
      link.target = '_blank';
      link.click();
    }
  };
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
  let location = candidate.json_resume.basics.location;
  const linkedin = candidate.json_resume.basics.linkedIn;
  return (
    <>
      <CandidateDialog
        onClickDownloadResume={{
          onClick: () => {
            fetchFile(candidate);
          },
        }}
        onClickLinkedin={{
          onClick: () => {
            window.open(ensureHttps(linkedin), '_blank');
          },
        }}
        isLinkedinVisible={Boolean(linkedin)}
        isLocationVisible={Boolean(location)}
        textJobRoleAtCompany={candidate.json_resume.basics.currentJobTitle}
        textMail={candidate.json_resume.basics.email}
        textOverview={candidate.json_resume.overview}
        textLocation={location}
        isOverviewVisible={Boolean(candidate.json_resume.overview)}
        isStarActive={candidate.is_bookmarked}
        onClickStar={{
          onClick: () => {
            toggleBookMark();
          },
        }}
        slotAddJob={
          <>
            {eligibleJobs.length > 0 && (
              <AddToJobOptions
                handleClickSubmit={handleAddApplications}
                isAdding={false}
                selectedJobIds={eligibleJobs}
                isPopupCandidate={true}
              />
            )}
          </>
        }
        slotAddedJobList={
          <>
            {candidate.applied_job_posts.map((sjobs) => {
              return (
                <AddedJobList textJob={sjobs.job_title} key={sjobs.job_id} />
              );
            })}
          </>
        }
        textJobCount={candidate.applied_job_posts.length}
        textJobCountwithJob={
          candidate.applied_job_posts.length > 1
            ? `${candidate.applied_job_posts.length} jobs`
            : `${candidate.applied_job_posts.length} job`
        }
        isAddedToJobVisible={candidate.applied_job_posts.length > 0}
        onClickClose={{
          onClick: onClickClose,
        }}
        onClickNext={{
          onClick: onClickNext,
        }}
        onClickPrev={{
          onClick: onClickPrev,
        }}
        onClickViewResume={{
          onClick: () => {
            handleOpenResume();
          },
        }}
        slotAvatar={
          <>
            <MuiAvatar
              level={getFullName(candidate.first_name, candidate.last_name)}
              src={candidate.profile_image}
              variant={'rounded'}
              width={'100%'}
              height={'100%'}
              fontSize={'12px'}
            />
          </>
        }
        textName={getFullName(candidate.first_name, candidate.last_name)}
        slotDetails={
          <>
            <CandidateEducation
              slotEducationCard={
                <>
                  {candidate.json_resume.schools?.map((ed, index) => {
                    return (
                      <CandidateEducationCard
                        key={index}
                        slotEducationLogo={<></>}
                        textUniversityName={ed.institution}
                        textDate={getformatedDate(ed.start, ed.end)}
                      />
                    );
                  })}
                </>
              }
            />
            <CandidateExperience
              slotCandidateExperienceCard={
                <>
                  {candidate.json_resume?.positions?.map((exp, index) => {
                    return (
                      <CandidateExperienceCard
                        key={index}
                        textCompany={exp.org}
                        textRole={exp.title}
                        textDate={getformatedDate(exp.start, exp.end)}
                        slotLogo={
                          <CompanyLogo
                            companyName={
                              exp.org ? exp.org.trim().toLowerCase() : null
                            }
                          />
                        }
                      />
                    );
                  })}
                </>
              }
            />
          </>
        }
      />
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '0px !important',
            border: 'none !important',
          },
          '.MuiDialog-container': {
            height: 'auto',
          },
        }}
        fullWidth
        maxWidth={'lg'}
        open={resume}
        onClose={() => setResume(false)}
      >
        <Stack direction={'row'} justifyContent={'center'}>
          <ResumePreviewer url={candidate.resume_link} />
        </Stack>
      </Dialog>
    </>
  );
};

export default SelectedCandidate;

function ensureHttps(url) {
  // Check if the URL starts with "http://"
  if (url.startsWith('http://')) {
    // Replace "http://" with "https://"
    return url.replace('http://', 'https://');
  } else if (!url.startsWith('https://')) {
    // If the URL doesn't start with "http://" or "https://", add "https://"
    return 'https://' + url;
  }

  // If the URL already starts with "https://", no change is needed
  return url;
}
const fetchFile = async (applicationDetails: CandidateSearchRes) => {
  const { data } = await axios({
    url: applicationDetails?.resume_link ?? '#',
    method: 'GET',
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  const ext = applicationDetails.resume_link.slice(
    applicationDetails.resume_link.lastIndexOf('.'),
  );
  link.setAttribute(
    'download',
    `${applicationDetails.first_name}_${applicationDetails.last_name}_Resume${
      ext ?? ''
    }`,
  );
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  link.parentNode.removeChild(link);
};
