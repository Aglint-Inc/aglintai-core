import { CircularProgress, Dialog, Popover, Stack } from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

import {
  AddJob,
  AddJobButton,
  CandidateDialog,
  CandidateEducation,
  CandidateEducationCard,
  CandidateExperienceCard,
} from '@/devlink';
import { AddJobList } from '@/devlink/AddJobList';
import { CandidateExperience } from '@/devlink/CandidateExperience';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { JobApplcationDB, PublicJobsType } from '@/src/types/data.types';
import { getformatedDate, getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import {
  CandidateSearchRes,
  useCandidateSearchCtx,
} from '../context/CandidateSearchProvider';
import AUIButton from '../../Common/AUIButton';
import MuiAvatar from '../../Common/MuiAvatar';
import ResumePreviewer from '../../JobApplicationsDashboard/ApplicationCard/ApplicationDetails/ResumePreviewer';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../../JobsDashboard/JobPostCreateUpdate/utils';

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
  const { updateState, candidateSearchState } = useCandidateSearchCtx();
  const { recruiter } = useAuthDetails();
  const [resume, setResume] = useState(false);
  const [anchorlEl, setAnchorEl] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedJobIds, setSelectedJobIds] = useState([]);

  useEffect(() => {
    if (!candidate) return;
    (async () => {
      resetDropDown(candidate);
    })();
  }, [candidate]);
  if (!candidate) return <></>;
  let location = candidate.json_resume.basics.location;

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

  const addToJobList = async () => {
    try {
      setIsAdding(true);
      const [job_app] = supabaseWrap(
        await supabase
          .from('job_applications')
          .select()
          .eq('candidate_id', candidate.candidate_id),
      ) as JobApplcationDB[];

      updateState({
        path: 'candidates',
        value: candidateSearchState.candidates.map((cand) => {
          if (cand.candidate_id === candidate.candidate_id) {
            cand.applied_job_posts = [
              ...cand.applied_job_posts,
              ...selectedJobIds
                .filter((s) => s.isSelected)
                .map((sj) => ({
                  job_id: sj.id,
                  job_title: sj.title,
                })),
            ];
          }
          return cand;
        }),
      });

      const newJobApps: Partial<JobApplcationDB>[] = selectedJobIds
        .filter((s) => s.isSelected)
        .map((j) => ({
          candidate_id: candidate.candidate_id,
          resume: job_app.resume,
          resume_text: job_app.resume_text,
          resume_embedding: job_app.resume_embedding,
          education_embedding: job_app.education_embedding,
          experience_embedding: job_app.experience_embedding,
          is_embedding: job_app.is_embedding,
          job_id: j.id,
          json_resume: job_app.json_resume,
          skills_embedding: job_app.skills_embedding,
        }));

      supabaseWrap(await supabase.from('job_applications').insert(newJobApps));
      toast.success('Added to job sucessfully');
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setAnchorEl(null);
      setIsAdding(false);
    }
  };

  const resetDropDown = async (candidate) => {
    const jobs = supabaseWrap(
      await supabase
        .from('public_jobs')
        .select()
        .eq('recruiter_id', recruiter.id)
        .eq('status', 'published'),
    ) as PublicJobsType[];
    setSelectedJobIds(getSelectedJobs(jobs, candidate));
  };

  return (
    <>
      <CandidateDialog
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
            {selectedJobIds.length > 0 && (
              <AddJobButton
                onClickAddJob={{
                  onClick: (e) => {
                    setAnchorEl(e.currentTarget);
                  },
                }}
              />
            )}
            <Popover
              open={Boolean(anchorlEl)}
              anchorEl={anchorlEl}
              sx={{ top: 35 }}
              onClose={() => {
                setAnchorEl(null);
                resetDropDown(candidate);
              }}
              keepMounted={false}
            >
              <Stack>
                <AddJob
                  slotAddJobList={
                    <>
                      {selectedJobIds?.map((r, index) => {
                        return (
                          <>
                            <AddJobList
                              key={r.id}
                              textJob={r.title}
                              isChecked={r.isSelected}
                              onClickCheck={{
                                onClick: () => {
                                  setSelectedJobIds((p) => {
                                    const curr = [...p];
                                    curr[Number(index)].isSelected =
                                      !curr[Number(index)].isSelected;
                                    return curr;
                                  });
                                },
                              }}
                            />
                          </>
                        );
                      })}
                    </>
                  }
                  slotAddButton={
                    <>
                      <AUIButton
                        variant='outlined'
                        size='small'
                        onClick={() => {
                          addToJobList();
                        }}
                        endIcon={
                          isAdding && (
                            <CircularProgress
                              color='inherit'
                              size={'15px'}
                              sx={{ color: palette.grey[400] }}
                            />
                          )
                        }
                      >
                        Add
                      </AUIButton>
                    </>
                  }
                  textJobSelected={
                    selectedJobIds.filter((s) => s.isSelected).length
                  }
                />
              </Stack>
            </Popover>
          </>
        }
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

const getSelectedJobs = (jobs: any, candidate: any) => {
  return jobs
    .filter((j) => j.status === 'published')
    .map((j) => ({
      title: j.job_title,
      id: j.id,
      isSelected:
        candidate.applied_job_posts.findIndex((ap) => ap.job_id === j.id) !==
        -1,
    }))
    .filter((j) => !j.isSelected);
};
