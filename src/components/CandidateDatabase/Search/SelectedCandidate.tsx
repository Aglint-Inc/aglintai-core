import React from 'react';

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
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';

const SelectedCandidate = ({
  candidate,
  onClickClose,
  onClickNext,
  onClickPrev,
}: {
  candidate: CandidateSearchRes;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickClose: () => void;
}) => {
  let location = '';
  if (typeof candidate.json_resume.basics.location === 'string') {
    location = candidate.json_resume.basics.location;
  }
  return (
    <CandidateDialog
      textJobRoleAtCompany={candidate.json_resume.basics.currentJobTitle}
      textMail={candidate.json_resume.basics.email}
      // isOverviewVisible={}
      textOverview={candidate.json_resume.overview}
      textLocation={location}
      isOverviewVisible
      slotAddtoJob={<></>}
      onClickClose={{
        onClick: onClickClose,
      }}
      //   onClickCopy={{}}
      //   onClickLinkedin={{}}
      onClickNext={{
        onClick: onClickNext,
      }}
      onClickPrev={{
        onClick: onClickPrev,
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
  );
};

export default SelectedCandidate;
