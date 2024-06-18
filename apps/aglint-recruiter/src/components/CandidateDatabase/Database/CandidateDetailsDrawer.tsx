import { Collapse, Dialog, Stack } from '@mui/material';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import React, { useEffect, useRef, useState } from 'react';

import { AddedJobList } from '@/devlink/AddedJobList';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CandidateDialog } from '@/devlink/CandidateDialog';
import { CandidateEducation } from '@/devlink/CandidateEducation';
import { CandidateEducationCard } from '@/devlink/CandidateEducationCard';
import { CandidateExperience } from '@/devlink/CandidateExperience';
import { CandidateExperienceCard } from '@/devlink/CandidateExperienceCard';
import { EmailOutReach } from '@/devlink/EmailOutReach';
import { ScreeningLandingPop } from '@/devlink2/ScreeningLandingPop';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getformatedDate, getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { CandidateSearchRes } from '../../../context/CandidateSearchProvider/CandidateSearchProvider';
import MuiAvatar from '../../Common/MuiAvatar';
import MuiPopup from '../../Common/MuiPopup';
import UITextField from '../../Common/UITextField';
import ResumePreviewer from '../../JobApplicationsDashboard/ApplicationCard/ApplicationDetails/ResumePreviewer';
import CompanyLogo from '../../JobApplicationsDashboard/Common/CompanyLogo';
import AddToJobOptions from './CandAddToJobMenu';

const CandidateDrawer = ({
  type,
  candidate,
  onClickClose,
  onClickNext,
  onClickPrev,
  toggleBookMark,
  eligibleJobs,
  handleAddApplications,
  showBookmark = true,
  showClose = true,
  onClickEmailOutreach = () => {},
}: {
  type: string;
  candidate: Omit<CandidateSearchRes, 'application_id' | 'similarity'>;
  onClickNext: () => void;
  onClickPrev: () => void;
  onClickClose: () => void;
  toggleBookMark: () => any;
  eligibleJobs: any;
  handleAddApplications: any;
  showBookmark?: boolean;
  showClose?: boolean;
  onClickEmailOutreach?: () => void;
  isEmailOutreachVisible?: boolean;
}) => {
  const [resume, setResume] = useState(false);
  const [isEducationShow, setIseducationShow] = useState(false);
  const [isExperienceShow, setIsExperienceShow] = useState(false);
  const [isPhonePopUp, setPhonePopUp] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [parametersInput, setParameter] = useState(undefined);
  const { recruiterUser } = useAuthDetails();
  const keyPressedRef = useRef({});
  let location = candidate.json_resume.basics.location;
  const linkedin = candidate.json_resume.basics.linkedIn;
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

  const makePhoneCll = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/create-screening-phone-call`,
      {
        from: '+12512066348',
        to: phoneInput,
        agent: 'd874c616f28ef76fe4eefe45af69cda7',
        candidate_id: candidate.candidate_id,
        begin_message: `Hi ${candidate.first_name}, this is ${recruiterUser.first_name} calling from Aglint, California. We have your resume and we wanted few details from you to be considerd for other position in our organisation. If u are free could you share few details with us??`,
        questions: parametersInput,
      },
    );
    toast.success('Call initiated successfully.');
  };
  const resumeNullCheck = (resume: any) => {
    const array = [];
    if (resume.basics.location === null) {
      array.push('Location');
    }
    if (resume.schools.length === 0) {
      array.push('education');
    }
    if (resume.postion?.length === 0) {
      array.push('postion');
    }
    if (resume.currentJobTitle === null) {
      array.push('currentTtitle');
    }
    if (resume.currentCompany === null) {
      array.push('currentCompany');
    }
    if (resume.totalExperienceInMonths === null) {
      array.push('totalExperienceInMonths');
    }
    if (resume.skills.length === 0) {
      array.push('skills');
    }
    if (resume.certificates?.length === 0) {
      array.push('certificates');
    }
    if (resume.projects.length === 0) {
      array.push('projects');
    }

    return array;
  };
  const isPhoneScreeningPhoneCallEnabled = useFeatureFlagEnabled(
    'isPhoneScreeningPhoneCallEnabled',
  );
  useEffect(() => {
    const checkKeyCombination = () => {
      const key1 = 'Shift';
      const key2 = 'ArrowRight';
      const key3 = 'ArrowLeft';
      if (
        keyPressedRef.current[String(key1)] &&
        keyPressedRef.current[String(key2)]
      ) {
        onClickNext();
      }

      if (
        keyPressedRef.current[String(key1)] &&
        keyPressedRef.current[String(key3)]
      ) {
        onClickPrev();
      }
    };

    const onkeyUp = (e) => {
      keyPressedRef.current[String(e.key)] = false;
      checkKeyCombination();
    };
    const onKeyDown = (e) => {
      keyPressedRef.current[String(e.key)] = true;
      checkKeyCombination();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onkeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onkeyUp);
    };
  }, [onClickNext, onClickPrev]);
  return (
    <>
      <CandidateDialog
        isPhoneScreeningVisible={
          !isPhoneScreeningPhoneCallEnabled
            ? false
            : type == 'Talent'
              ? true
              : resumeNullCheck(candidate.json_resume).length !== 0
                ? true
                : false
        }
        onClickPhoneScreening={{
          onClick: () => {
            setPhonePopUp(true);
          },
        }}
        isGitVisible={false}
        isFacebookVisible={false}
        isTwitterVisible={false}
        isPhoneVisible={Boolean(candidate.json_resume.basics.phone)}
        textPhone={candidate.json_resume.basics.phone}
        slotEmailOutReach={
          candidate.json_resume.basics.email && (
            <EmailOutReach
              onClickEmailOutreach={{
                onClick: onClickEmailOutreach,
              }}
            />
          )
        }
        isCloseButtonVisible={!showClose}
        onClickDownloadResume={{
          onClick: () => {
            fetchFile(candidate);
          },
        }}
        isBookmarkVisible={showBookmark}
        onClickLinkedin={{
          onClick: () => {
            window.open(ensureHttps(linkedin), '_blank');
          },
        }}
        isLinkedinVisible={Boolean(linkedin)}
        isLocationVisible={Boolean(location)}
        textJobRoleAtCompany={candidate.json_resume.basics.currentJobTitle}
        textOverview={candidate.json_resume.overview}
        textLocation={location}
        isOverviewVisible={Boolean(candidate.json_resume.overview)}
        isStarActive={candidate.is_bookmarked}
        onClickStar={{
          onClick: () => {
            toggleBookMark();
          },
        }}
        onClickPhone={{
          onClick: () => {
            navigator.clipboard.writeText(candidate.json_resume.basics.phone);
            toast.success('Phone number copied.');
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
              variant={'rounded-small'}
            />
          </>
        }
        textName={getFullName(candidate.first_name, candidate.last_name)}
        slotDetails={
          <>
            <CandidateExperience
              onClickIcons={{
                onClick: () => {
                  setIsExperienceShow((prev) => !prev);
                },
                style: {
                  transform: isExperienceShow
                    ? 'rotate(0deg)'
                    : 'rotate(180deg)',
                  'transition-duration': '500ms',
                },
              }}
              slotCandidateExperienceCard={
                <>
                  <Collapse in={isExperienceShow} translate='yes'>
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
                  </Collapse>
                </>
              }
            />
            <CandidateEducation
              onClickIcons={{
                onClick: () => {
                  setIseducationShow((prev) => !prev);
                },
                style: {
                  transform: isEducationShow
                    ? 'rotate(0deg)'
                    : 'rotate(180deg)',
                  'transition-duration': '500ms',
                },
              }}
              slotEducationCard={
                <>
                  <Collapse in={isEducationShow} translate='yes'>
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
                  </Collapse>
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
        <Stack direction={'row'} justifyContent={'center'} height={'90vh'}>
          <ResumePreviewer url={candidate.resume_link} />
        </Stack>
      </Dialog>
      <MuiPopup
        props={{
          open: isPhonePopUp,
          onClose: () => {
            ('');
          },
        }}
      >
        <ScreeningLandingPop
          textHeading={'Make Phone Call'}
          textLabel={''}
          isDropdownVisible={type == 'Talent'}
          slotDropdown={
            <UITextField
              placeholder='Enter Call Fields'
              value={parametersInput}
              onChange={(e) => setParameter(e.target.value)}
            />
          }
          slotScreeningNameInput={
            <UITextField
              placeholder='Enter Phone Number'
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
            />
          }
          slotButtonPrimaryRegular={
            <ButtonSolid
              size={2}
              isDisabled={phoneInput === ''}
              textButton='Submit'
              onClickButton={{
                onClick: () => {
                  makePhoneCll();
                  setPhonePopUp(false);
                },
              }}
            />
          }
          onClickClose={{
            onClick: () => {
              setPhonePopUp(false);
              setParameter('');
            },
          }}
        />
      </MuiPopup>
    </>
  );
};

export default CandidateDrawer;

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
const fetchFile = async (
  applicationDetails: Omit<CandidateSearchRes, 'application_id' | 'similarity'>,
) => {
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
