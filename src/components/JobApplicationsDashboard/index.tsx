/* eslint-disable security/detect-object-injection */
import { useJobApplications } from '@context/JobApplicationsContext';
import { Stack } from '@mui/material';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';

import {
  AddCandidateDropdown,
  ApplicantsListEmpty,
  JobScreening,
  SelectActionBar,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import {
  JobApplication,
  JobApplicationsData,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { useJobs } from '@/src/context/JobsContext';
import NotFoundPage from '@/src/pages/404';
import { ScrollList, YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';

import ApplicationCard from './ApplicationCard';
import InfoDialog from './Common/InfoDialog';
import ImportCandidates from './ImportCandidates';
import ImportManualCandidates from './ImportManualCandidates';
import JobApplicationStatus from './JobStatus';
import SearchField from './SearchField';
import { capitalize } from './utils';
import Loader from '../Common/Loader';
import MuiPopup from '../Common/MuiPopup';
import EditFlow from '../JobsDashboard/JobPostCreateUpdate/Editflow';
import { useJobForm } from '../JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';

const JobApplicationsDashboard = () => {
  const { initialLoad, job } = useJobApplications();
  return initialLoad ? (
    job !== null ? (
      <YTransformWrapper>
        <JobApplicationComponent />
      </YTransformWrapper>
    ) : (
      <YTransform uniqueKey={initialLoad}>
        <NotFoundPage />
      </YTransform>
    )
  ) : (
    <YTransformWrapper>
      <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
        <Loader />
      </Stack>
    </YTransformWrapper>
  );
};
const YTransformWrapper = ({ children }) => {
  const { initialLoad } = useJobApplications();
  return <YTransform uniqueKey={initialLoad}>{children}</YTransform>;
};

const JobApplicationComponent = () => {
  const { applicationsData, job } = useJobApplications();
  const { jobsData } = useJobs();
  const { applications } = applicationsData;

  const [section, setSection] = useState(JobApplicationSections.NEW);

  const sectionApplications = applications[section].list;

  const [checkList, setCheckList] = useState(new Set<string>());

  const [jobUpdate, setJobUpdate] = useState(false);

  const [filteredApplications, setFilteredApplications] =
    useState(sectionApplications);

  const handleSetSection = (section) => {
    setSection(section);
    setCheckList(new Set<string>());
  };

  const { recruiter } = useAuthDetails();
  const { handleInitializeForm } = useJobForm();
  return (
    <>
      <JobScreening
        slotJobStatus={<JobApplicationStatus />}
        textJobStatus={null}
        textRole={capitalize(job.job_title)}
        textApplicantsNumber={`(${applicationsData.count} applicants)`}
        isAll={section === JobApplicationSections.NEW}
        countAll={applications.new.count}
        onClickAllApplicant={{
          onClick: () => handleSetSection(JobApplicationSections.NEW),
          style: {
            color: section === JobApplicationSections.NEW ? 'white' : 'inherit',
          },
        }}
        isInterviewing={section === JobApplicationSections.INTERVIEWING}
        countInterviewing={applications.interviewing.count}
        onClickInterviewing={{
          onClick: () => handleSetSection(JobApplicationSections.INTERVIEWING),
          style: {
            color:
              section === JobApplicationSections.INTERVIEWING
                ? 'white'
                : 'inherit',
          },
        }}
        isRejected={section === JobApplicationSections.DISQUALIFIED}
        countRejected={applications.disqualified.count}
        onClickRejected={{
          onClick: () => handleSetSection(JobApplicationSections.DISQUALIFIED),
          style: {
            color:
              section === JobApplicationSections.DISQUALIFIED
                ? 'white'
                : 'inherit',
          },
        }}
        isSelected={section === JobApplicationSections.QUALIFIED}
        countSelected={applications.qualified.count}
        onClickSelected={{
          onClick: () => handleSetSection(JobApplicationSections.QUALIFIED),
          style: {
            color:
              section === JobApplicationSections.QUALIFIED
                ? 'white'
                : 'inherit',
          },
        }}
        slotSearch={
          <SearchField
            applications={sectionApplications}
            section={section}
            jobUpdate={jobUpdate}
            setFilteredApplications={setFilteredApplications}
          />
        }
        slotCandidateJobCard={
          <ApplicantsList
            applications={filteredApplications}
            checkList={checkList}
            setCheckList={setCheckList}
            jobUpdate={jobUpdate}
          />
        }
        slotAddCandidates={<AddCandidates />}
        slotSelectActionBar={
          <Stack style={{ backgroundColor: 'white' }}>
            <Stack
              style={{
                opacity: jobUpdate ? 0.5 : 1,
                pointerEvents: jobUpdate ? 'none' : 'auto',
              }}
            >
              <ActionBar
                section={section}
                checkList={checkList}
                setCheckList={setCheckList}
                setJobUpdate={setJobUpdate}
              />
            </Stack>
          </Stack>
        }
        bottomBarVisibility={checkList.size !== 0}
        linkActiveJobs={{
          href: '/jobs',
        }}
        jobLink={{
          href: `https://dev.aglinthq.com/job-post/${job.id}`,
          target: '_blank',
        }}
        onClickEditJob={{
          onClick: () => {
            handleInitializeForm({
              type: 'edit',
              job: jobsData.jobs.find((j) => j.id === job.id) as any,
              recruiter,
              slideNo: 1,
            });
          },
        }}
        onClickWorkflow={{
          onClick: () => {
            handleInitializeForm({
              type: 'edit',
              job: jobsData.jobs.find((j) => j.id === job.id) as any,
              recruiter,
              slideNo: 5,
            });
          },
        }}
      />
      <EditFlow />
    </>
  );
};

const ApplicantsList = ({
  applications,
  checkList,
  setCheckList,
  jobUpdate,
}: {
  applications: JobApplication[];
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
}) => {
  return applications.length === 0 ? (
    <ApplicantsListEmpty />
  ) : (
    <>
      {applications.map((application, i) => {
        const styles =
          jobUpdate && checkList.has(application.application_id)
            ? { opacity: 0.5, pointerEvent: 'none' }
            : { opacity: 1, pointerEvent: 'auto' };
        return (
          <Stack key={application.application_id} style={styles}>
            <ScrollList uniqueKey={application.application_id}>
              <ApplicationCard
                application={application}
                index={i}
                checkList={checkList}
                setCheckList={setCheckList}
              />
            </ScrollList>
          </Stack>
        );
      })}
    </>
  );
};

const ActionBar = ({
  section,
  checkList,
  setCheckList,
  setJobUpdate,
}: {
  section: JobApplicationSections;
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  setJobUpdate: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    handleUpdateJobStatus,
    applicationsData,
    handleJobApplicationUpdate,
  } = useJobApplications();
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [checkEmail, setCheckEmail] = useState(true);
  const { recruiter } = useAuthDetails();
  const [dialogInfo, setDialogInfo] = useState({
    heading: ``,
    subHeading: '',
    primaryAction: () => null,
    primaryText: '',
    secondaryText: '',
    variant: '',
  });
  const handleUpdateJobs = async (destination: JobApplicationSections) => {
    setJobUpdate(true);
    await handleUpdateJobStatus(checkList, {
      source: section,
      destination,
    });
    setCheckList(new Set<string>());
    setJobUpdate(false);
  };

  const isChecked = checkList.size !== 0;
  const showNew = isChecked && section === JobApplicationSections.DISQUALIFIED;
  const showInterview = isChecked && section === JobApplicationSections.NEW;
  const showSelected =
    isChecked &&
    (section === JobApplicationSections.NEW ||
      section === JobApplicationSections.INTERVIEWING);
  const showReject =
    isChecked &&
    (section === JobApplicationSections.NEW ||
      section === JobApplicationSections.INTERVIEWING ||
      section === JobApplicationSections.QUALIFIED);
  const DialogInfo = {
    interviewing: {
      heading: `Are you sure that you want to move ${
        Array.from(checkList).length
      } candidates to interviewing`,
      subHeading: 'Send interview Emails to these candidates',
      primaryAction: async () => {
        await handleUpdateJobs(JobApplicationSections.INTERVIEWING);
        if (checkEmail) {
          sendEmails(
            JobApplicationSections.INTERVIEWING,
            checkList,
            applicationsData,
            recruiter,
            handleJobApplicationUpdate,
          );
        }
      },
      primaryText: 'Send',
      secondaryText: 'Cancel',
      variant: 'primary',
    },
    selected: {
      heading: `Are you sure that you want to move ${
        Array.from(checkList).length
      } candidates to Selected`,
      subHeading: undefined,
      primaryAction: async () => {
        await handleUpdateJobs(JobApplicationSections.QUALIFIED);
        if (checkEmail) {
          sendEmails(
            JobApplicationSections.QUALIFIED,
            checkList,
            applicationsData,
            recruiter,
            handleJobApplicationUpdate,
          );
        }
      },
      primaryText: 'Move to Selected',
      secondaryText: 'Cancel',
      variant: 'ai',
    },
    rejected: {
      heading: `Are you sure that you want to reject ${
        Array.from(checkList).length
      } candidates`,
      subHeading: 'Send rejection Emails to these candidates',
      primaryAction: async () => {
        await handleUpdateJobs(JobApplicationSections.DISQUALIFIED);
        if (checkEmail) {
          sendEmails(
            JobApplicationSections.DISQUALIFIED,
            checkList,
            applicationsData,
            recruiter,
            handleJobApplicationUpdate,
          );
        }
      },
      primaryText: 'Rejected',
      secondaryText: 'Cancel',
      variant: 'primary',
    },
    applied: {
      heading: `Are you sure that you want to move ${
        Array.from(checkList).length
      } candidates to New`,
      subHeading: undefined,
      warningMessage:
        'Moving back to applied will cancel the interviews the candidates have taken and will start the process again. ',
      primaryAction: async () => {
        await handleUpdateJobs(JobApplicationSections.NEW);
      },
      primaryText: 'Move to New',
      secondaryText: 'Cancel',
      variant: 'dark',
    },
  };
  return (
    <>
      <InfoDialog
        heading={dialogInfo.heading}
        subHeading={dialogInfo.subHeading}
        openInfoDialog={openInfoDialog}
        onClose={() => {
          setOpenInfoDialog(false);
        }}
        secondaryText={dialogInfo.secondaryText}
        primaryAction={dialogInfo.primaryAction}
        primaryText={dialogInfo.primaryText}
        variant={dialogInfo.variant}
        checkEmail={checkEmail}
        setCheckEmail={setCheckEmail}
        warningMessage={undefined}
      />
      <SelectActionBar
        isInterview={showInterview}
        onClickInterview={{
          onClick: async () => {
            setDialogInfo(DialogInfo.interviewing);
            setOpenInfoDialog(true);
          },
        }}
        isQualified={showSelected}
        onClickQualified={{
          onClick: async () => {
            setDialogInfo(DialogInfo.selected);
            setOpenInfoDialog(true);
          },
        }}
        isDisqualified={showReject}
        onClickDisqualified={{
          onClick: async () => {
            setDialogInfo(DialogInfo.rejected);
            setOpenInfoDialog(true);
          },
        }}
        onClickMoveNew={{
          onClick: async () => {
            setDialogInfo(DialogInfo.applied);
            setOpenInfoDialog(true);
          },
        }}
        onClickClear={{
          onClick: () => setCheckList(new Set<string>()),
        }}
        textSelected={`${checkList.size} candidates selected`}
        isMoveNew={showNew}
      />
    </>
  );
};

const AddCandidates = () => {
  const {
    openImportCandidates,
    setOpenImportCandidates,
    openManualImportCandidates,
    setOpenManualImportCandidates,
  } = useJobApplications();
  return (
    <>
      <MuiPopup
        props={{
          open: openImportCandidates,
        }}
      >
        <ImportCandidates />
      </MuiPopup>
      <MuiPopup
        props={{
          open: openManualImportCandidates,
        }}
      >
        <ImportManualCandidates />
      </MuiPopup>
      <AddCandidateDropdown
        onClickManual={{ onClick: () => setOpenManualImportCandidates(true) }}
        onClickImport={{ onClick: () => setOpenImportCandidates(true) }}
      />
    </>
  );
};

export default JobApplicationsDashboard;

export function sendEmails(
  status: string,
  checkList: Set<string>,
  applicationsData: JobApplicationsData,
  recruiter,
  handleJobApplicationUpdate,
) {
  function fillEmailTemplate(
    template: any,
    email: {
      first_name: any;
      last_name: any;
      job_title: any;
      company_name: any;
      interview_link: any;
    },
  ) {
    let filledTemplate = template;

    const placeholders = {
      '[firstName]': email.first_name,
      '[lastName]': email.last_name,
      '[jobTitle]': email.job_title,
      '[companyName]': email.company_name,
      '[interviewLink]': email.interview_link,
    };

    for (const [placeholder, value] of Object.entries(placeholders)) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp(placeholder.replace(/\[|\]/g, '\\$&'), 'g');
      filledTemplate = filledTemplate.replace(regex, value);
    }

    return filledTemplate;
  }

  const emailHandler = async (candidate: {
    email: any;
    first_name: any;
    last_name: any;
    job_title: any;
    company: any;
    application_id: any;
    emails: any;
  }) => {
    await axios
      .post('/api/sendgrid', {
        fromEmail: `messenger@aglinthq.com`,
        fromName: recruiter?.name,
        email: candidate?.email,
        subject:
          status === JobApplicationSections.INTERVIEWING
            ? fillEmailTemplate(recruiter?.email_template?.interview.subject, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: `https://dev.aglinthq.com/${pageRoutes.INTERVIEWLANDINGPAGE}?id=${candidate.application_id}`,
              })
            : status === JobApplicationSections.DISQUALIFIED
            ? fillEmailTemplate(recruiter?.email_template?.interview.subject, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: undefined,
              })
            : null,
        text:
          status === JobApplicationSections.INTERVIEWING
            ? fillEmailTemplate(recruiter?.email_template?.interview?.body, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: `https://dev.aglinthq.com/${pageRoutes.INTERVIEWLANDINGPAGE}?id=${candidate.application_id}`,
              })
            : status === JobApplicationSections.DISQUALIFIED
            ? fillEmailTemplate(recruiter?.email_template?.rejection?.body, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: undefined,
              })
            : null,
      })
      .then(async () => {
        // if (res.status === 200 && res.data.data === 'Email sent') {
        //   toast.success('Mail sent successfully');
        // }

        if (status === JobApplicationSections.INTERVIEWING) {
          candidate.emails.interviewing = true;
          await handleJobApplicationUpdate(candidate.application_id, {
            emails: candidate.emails,
          });
        }
        if (status === JobApplicationSections.DISQUALIFIED) {
          candidate.emails.rejected = true;
          await handleJobApplicationUpdate(candidate.application_id, {
            emails: candidate.emails,
          });
        }
      });
  };

  if (
    status === JobApplicationSections.INTERVIEWING ||
    status === JobApplicationSections.DISQUALIFIED
  ) {
    const _new = applicationsData.applications.new.list;
    const interviewing = applicationsData.applications.interviewing.list;
    const qualified = applicationsData.applications.qualified.list;
    const disqualified = applicationsData.applications.disqualified.list;

    const allCandidates = [
      ..._new,
      ...interviewing,
      ...qualified,
      ...disqualified,
    ];
    const allCandidatesIds = allCandidates.map((ele) => ele.application_id);
    const filteredCandidates = [];

    Array.from(checkList).forEach((id) => {
      if (allCandidatesIds.includes(id))
        filteredCandidates.push(
          allCandidates.filter(
            (candidate) => candidate.application_id === id,
          )[0],
        );
    });

    // console.log('filteredCandidates', filteredCandidates);

    for (const candidate of filteredCandidates) {
      emailHandler(candidate);
    }
  }
}
