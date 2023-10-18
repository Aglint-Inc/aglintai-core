/* eslint-disable security/detect-object-injection */
import { useJobApplications } from '@context/JobApplicationsContext';
import { Dialog, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { ImportCandidates } from '@/devlink';
import { ApplicantsListEmpty, JobScreening, SelectActionBar } from '@/devlink2';
import {
  JobApplication,
  JobApplicationsData,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import NotFoundPage from '@/src/pages/404';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';

import Loader from '../Common/Loader';
import ApplicationCard from './ApplicationCard';
import InfoDialog from './Common/InfoDialog';
import { useKeyPress } from './hooks';
import ImportCandidatesCSV from './ImportCandidatesCsv';
import ImportManualCandidates from './ImportManualCandidates';
import JobApplicationStatus from './JobStatus';
import NoApplicants from './Lotties/NoApplicants';
import SearchField from './SearchField';
import {
  capitalize,
  FilterParameter,
  getFilteredApplications,
  getSortedApplications,
  SortParameter,
} from './utils';
import ResumeUpload from './FileUpload';

const JobApplicationsDashboard = () => {
  const { initialLoad, job } = useJobApplications();
  return initialLoad ? (
    job !== undefined ? (
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
  const {
    applicationsData,
    job,
    setOpenImportCandidates,
    openImportCandidates,
  } = useJobApplications();
  const { applications } = applicationsData;
  const router = useRouter();
  const [section, setSection] = useState(JobApplicationSections.NEW);

  const [sort] = useState<SortParameter>({
    parameter: 'resume_score',
    condition: 'desc',
  });

  const [filters] = useState<FilterParameter[]>([
    { parameter: 'resume_score', condition: 'ge', count: 0 },
    { parameter: 'interview_score', condition: 'ge', count: 0 },
  ]);

  const sectionApplications = getFilteredApplications(
    getSortedApplications(applications[section].list, sort),
    filters,
  );

  const [checkList, setCheckList] = useState(new Set<string>());

  const [jobUpdate, setJobUpdate] = useState(false);

  const [searchedApplications, setSearchedApplications] =
    useState(sectionApplications);

  const handleSetSection = (section) => {
    setSection(section);
    setCheckList(new Set<string>());
  };

  const handleSelectAll = () => {
    if (checkList.size === searchedApplications.length)
      setCheckList(new Set<string>());
    else
      setCheckList(
        new Set(
          searchedApplications.reduce((acc, curr) => {
            acc.push(curr.application_id);
            return acc;
          }, []),
        ),
      );
  };
  return (
    <>
      <Dialog
        open={openImportCandidates}
        onClose={() => setOpenImportCandidates(false)}
        maxWidth='md'
      >
        <ImportCandidates
          slotAddManually={<ImportManualCandidates />}
          slotImportCsv={<ImportCandidatesCSV />}
          onClickClose={{
            onClick: () => {
              setOpenImportCandidates(false);
            },
          }}
          slotImportResume={
            <ResumeUpload setOpenSidePanel={setOpenImportCandidates} />
          }
        />
      </Dialog>
      <JobScreening
        onClickAddCandidates={{
          onClick: () => {
            setOpenImportCandidates(true);
          },
        }}
        isTopbarVisible={searchedApplications.length !== 0}
        interviewScore={section !== JobApplicationSections.NEW}
        selectAllCheckbox={{ onClick: () => handleSelectAll() }}
        isSelectAllChecked={checkList.size === searchedApplications.length}
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
            setSearchedApplications={setSearchedApplications}
          />
        }
        slotCandidateJobCard={
          <ApplicantsList
            applications={searchedApplications}
            checkList={checkList}
            setCheckList={setCheckList}
            jobUpdate={jobUpdate}
            section={section}
          />
        }
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
          href: `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${job.id}`,
          target: '_blank',
        }}
        onClickEditJob={{
          onClick: () => {
            router.push(`/jobs/edit?job_id=${job.id}`);
          },
        }}
      />
    </>
  );
};

const   ApplicantsList = ({
  applications,
  checkList,
  setCheckList,
  jobUpdate,
  section,
}: {
  applications: JobApplication[];
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
  section: string;
}) => {
  const { pressed } = useKeyPress('Shift');
  const [lastPressed, setLastPressed] = useState(null);
  useEffect(() => {
    if (checkList.size === 0 || checkList.size === applications.length)
      setLastPressed(null);
  }, [checkList.size]);
  const handleSingleSelect = (index: number) => {
    setCheckList((prev) => {
      const newSet = new Set(prev);
      const id = applications[index].application_id;
      if (newSet.has(id)) {
        newSet.delete(id);
        setLastPressed(null);
      } else {
        newSet.add(id);
        setLastPressed(id);
      }
      return newSet;
    });
  };
  const handleSelect = (index: number) => {
    if (!pressed) {
      handleSingleSelect(index);
    } else {
      if (lastPressed && !checkList.has(applications[index].application_id)) {
        const start = applications.findIndex(
          (application) => application.application_id === lastPressed,
        );
        setCheckList((prev) => {
          const newSet = applications.reduce((acc, curr, i) => {
            if ((i - start) * (i - index) <= 0) acc.push(curr.application_id);
            return acc;
          }, []);
          return new Set([...prev, ...newSet]);
        });
        setLastPressed(null);
      } else {
        handleSingleSelect(index);
      }
    }
  };
  const [lastLoad, setLastLoad] = useState(10);
  const observer = useRef(undefined);
  const lastApplicationRef = (node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setLastLoad((prev) => prev + 10);
    });
    if (node) observer.current.observe(node);
  };
  useEffect(() => {
    setLastLoad(10);
  }, [section]);

  return applications.length === 0 ? (
    <Stack height={'50vh'} justifyContent={'center'}>
      <Stack>
        <ApplicantsListEmpty
          textEmpty={section}
          slotLottie={<NoApplicants />}
        />
      </Stack>
    </Stack>
  ) : (
    <>
      {applications.slice(0, lastLoad).map((application, i) => {
        const styles =
          jobUpdate && checkList.has(application.application_id)
            ? { opacity: 0.5, pointerEvent: 'none' }
            : { opacity: 1, pointerEvent: 'auto' };
        return (
          <Stack
            key={application.application_id}
            style={styles}
            ref={i === lastLoad - 1 ? lastApplicationRef : null}
            id={'job-application-stack'}
          >
            <ApplicationCard
              application={application}
              index={i}
              checkList={checkList}
              handleSelect={handleSelect}
              isInterview={section !== JobApplicationSections.NEW}
            />
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
    job,
  } = useJobApplications();
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [checkEmail, setCheckEmail] = useState(true);
  const [dialogInfo, setDialogInfo] = useState({
    heading: ``,
    subHeading: '',
    primaryAction: (checkEmail: boolean) => {
      checkEmail;
    },
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
      primaryAction: async (checkEmail: any) => {
        await handleUpdateJobs(JobApplicationSections.INTERVIEWING);
        if (checkEmail) {
          sendEmails(
            JobApplicationSections.INTERVIEWING,
            checkList,
            applicationsData,
            job,
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
      primaryAction: async (checkEmail: any) => {
        await handleUpdateJobs(JobApplicationSections.QUALIFIED);
        if (checkEmail) {
          sendEmails(
            JobApplicationSections.QUALIFIED,
            checkList,
            applicationsData,
            job,
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
      primaryAction: async (checkEmail: any) => {
        await handleUpdateJobs(JobApplicationSections.DISQUALIFIED);
        if (checkEmail) {
          sendEmails(
            JobApplicationSections.DISQUALIFIED,
            checkList,
            applicationsData,
            job,
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

export default JobApplicationsDashboard;

export function sendEmails(
  status: string,
  checkList: Set<string>,
  applicationsData: JobApplicationsData,
  job,
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
      support_link: any;
    },
  ) {
    let filledTemplate = template;

    const placeholders = {
      '[firstName]': email.first_name,
      '[lastName]': email.last_name,
      '[jobTitle]': email.job_title,
      '[companyName]': email.company_name,
      '[interviewLink]': email.interview_link,
      '[supportLink]': email.support_link,
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
        fromName:
          status === JobApplicationSections.INTERVIEWING
            ? job.email_template?.interview.fromName
            : status === JobApplicationSections.DISQUALIFIED
            ? job.email_template?.rejection.fromName
            : null,
        email: candidate?.email,
        subject:
          status === JobApplicationSections.INTERVIEWING
            ? fillEmailTemplate(job.email_template?.interview.subject, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: undefined,
                support_link: undefined,
              })
            : status === JobApplicationSections.DISQUALIFIED
            ? fillEmailTemplate(job?.email_template?.rejection.subject, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: undefined,
                support_link: undefined,
              })
            : null,
        text:
          status === JobApplicationSections.INTERVIEWING
            ? fillEmailTemplate(job?.email_template?.interview?.body, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: `https://dev.aglinthq.com/${pageRoutes.INTERVIEWLANDINGPAGE}?id=${candidate.application_id}`,
                support_link: `https://recruiter.aglinthq.com/support?id=${candidate.application_id}`,
              })
            : status === JobApplicationSections.DISQUALIFIED
            ? fillEmailTemplate(job?.email_template?.rejection?.body, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: undefined,
                support_link: undefined,
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
