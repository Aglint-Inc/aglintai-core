import { Dialog, Stack } from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

import {
  CandidateDialog,
  CandidateEducation,
  CandidateEducationCard,
  CandidateExperienceCard,
} from '@/devlink';
import { CandidateExperience } from '@/devlink/CandidateExperience';
import { getformatedDate, getFullName } from '@/src/utils/jsonResume';

import { CandidateSearchRes } from '../context/CandidateSearchProvider';
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
  const [resume, setResume] = useState(false);

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
        slotAddtoJob={<></>}
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
