/* eslint-disable security/detect-object-injection */
import { Dialog, Slider, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { ImportCandidates } from '@/devlink';
import {
  ApplicantsListEmpty,
  CandidateFilter,
  JobDetails,
  JobDetailsFilterBlock,
  JobDetailsTabs,
  SelectActionBar,
  SortArrows,
} from '@/devlink2';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationsData,
  JobApplicationSections,
  Parameters,
} from '@/src/context/JobApplicationsContext/types';
import NotFoundPage from '@/src/pages/404';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';

import ApplicationCard from './ApplicationCard';
import ApplicationDetails from './ApplicationCard/ApplicationDetails';
import InfoDialog from './Common/InfoDialog';
import ResumeUpload from './FileUpload';
import { useKeyPress, usePolling } from './hooks';
import ImportCandidatesCSV from './ImportCandidatesCsv';
import ImportManualCandidates from './ImportManualCandidates';
// import JobApplicationStatus from './JobStatus';
import NoApplicants from './Lotties/NoApplicants';
import SearchField from './SearchField';
import { capitalize, FilterParameter } from './utils';
import Loader from '../Common/Loader';
import RefreshButton from '../Common/RefreshButton';

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
    applications,
    job,
    handleJobApplicationPaginatedPolling,
    applicationDepth,
    applicationDisable,
    updateTick,
    searchParameters,
  } = useJobApplications();
  const router = useRouter();
  const [section, setSection] = useState(JobApplicationSections.NEW);

  const sectionApplications = applications[section];

  const [checkList, setCheckList] = useState(new Set<string>());
  const [currentApplication, setCurrentApplication] = useState(-1);

  const [jobUpdate, setJobUpdate] = useState(false);

  const handleSetSection = (section) => {
    setSection(section);
    setCheckList(new Set<string>());
  };

  const handleSelectCurrentApplication = (i: number) => {
    setCurrentApplication(i);
  };

  const handleSelectNextApplication = () => {
    if (currentApplication < sectionApplications.length)
      setCurrentApplication((prev) => (prev + 1) % sectionApplications.length);
  };

  const handleSelectPrevApplication = () => {
    if (currentApplication > 0) setCurrentApplication((prev) => prev - 1);
    else if (currentApplication === 0)
      setCurrentApplication(sectionApplications.length - 1);
  };

  // eslint-disable-next-line no-unused-vars
  const handleSelectAll = () => {
    if (checkList.size === sectionApplications.length)
      setCheckList(new Set<string>());
    else
      setCheckList(
        new Set(
          sectionApplications.reduce((acc, curr) => {
            acc.push(curr.application_id);
            return acc;
          }, []),
        ),
      );
  };

  const [refresh, setRefresh] = useState(false);
  const refreshRef = useRef(true);

  const handleAutoRefresh = async () => {
    setRefresh(true);
    await handleJobApplicationPaginatedPolling(
      Object.values(JobApplicationSections),
    );
    setRefresh(false);
  };

  const handleManualRefresh = async () => {
    refreshRef.current = !refreshRef.current;
    await handleAutoRefresh();
  };

  usePolling(async () => await handleAutoRefresh(), 600000, [
    ...Object.values(applicationDepth),
    section,
    refreshRef.current,
    updateTick,
    searchParameters.search,
    searchParameters.sort.ascending,
    searchParameters.sort.parameter,
  ]);

  return (
    <JobDetails
      onclickHeaderJobs={{
        href: `${process.env.NEXT_PUBLIC_HOST_NAME}/${pageRoutes.JOBS}?status=active`,
      }}
      textJobStatus={null}
      textRole={capitalize(job.job_title)}
      textApplicantsNumber={``}
      onClickEditJobs={{
        onClick: () => {
          router.push(`/jobs/edit?job_id=${job.id}`);
        },
      }}
      jobLink={{
        href: `${process.env.NEXT_PUBLIC_HOST_NAME}/job-post/${job.id}`,
        target: '_blank',
      }}
      slotJobStatus={
        <>
          <RefreshButton
            isDisabled={refresh || applicationDisable}
            text={'Refresh'}
            onClick={async () => await handleManualRefresh()}
          />
          {/* <JobApplicationStatus /> */}
        </>
      }
      slotBottomBar={
        <Stack style={{ backgroundColor: 'white' }}>
          <Stack
            style={{
              opacity: jobUpdate ? 0.5 : 1,
              pointerEvents: jobUpdate ? 'none' : 'auto',
            }}
          >
            {checkList.size > 0 && (
              <ActionBar
                section={section}
                checkList={checkList}
                setCheckList={setCheckList}
                setJobUpdate={setJobUpdate}
              />
            )}
          </Stack>
        </Stack>
      }
      slotSidebar={
        <ApplicationDetails
          open={currentApplication !== -1}
          onClose={() => handleSelectCurrentApplication(-1)}
          handleSelectNextApplication={() => handleSelectNextApplication()}
          handleSelectPrevApplication={() => handleSelectPrevApplication()}
          applicationDetails={
            sectionApplications[
              currentApplication === -1 ? 0 : currentApplication
            ]
          }
        />
      }
      slotTabs={
        <NewJobDetailsTabs
          section={section}
          handleSetSection={handleSetSection}
        />
      }
      slotFilterBlock={<NewJobFilterBlock />}
      slotCandidatesList={
        <ApplicantsList
          applications={sectionApplications}
          checkList={checkList}
          setCheckList={setCheckList}
          jobUpdate={jobUpdate}
          section={section}
          handleSelectCurrentApplication={handleSelectCurrentApplication}
          currentApplication={currentApplication}
          refresh={refresh}
        />
      }
      // onclickSelectAll={{ onClick: () => handleSelectAll() }}
      isListTopBarVisible={sectionApplications.length !== 0}
      isInterviewVisible={section !== JobApplicationSections.NEW}
      isAllChecked={checkList.size === sectionApplications.length}
      slotInterviewSort={<ApplicationSort parameter='interview_score' />}
      slotNameSort={<ApplicationSort parameter='first_name' />}
      slotResumeSort={<ApplicationSort parameter='resume_score' />}
      slotEmailSort={<ApplicationSort parameter='email' />}
      slotDateSort={<ApplicationSort parameter='created_at' />}
    />
  );
};

const ApplicationSort = ({
  parameter,
}: {
  parameter: Parameters['sort']['parameter'];
}) => {
  const { searchParameters, handleJobApplicationFilter } = useJobApplications();
  const [loading, setLoading] = useState(false);
  const isCurrentParam = searchParameters.sort
    ? searchParameters.sort.parameter === parameter
    : false;
  const isAsc = searchParameters.sort ? searchParameters.sort.ascending : false;
  const handleToggleSort = async (up: boolean) => {
    setLoading(true);
    await handleJobApplicationFilter({
      ...searchParameters,
      sort: { parameter, ascending: up },
    });
    setLoading(false);
  };
  const style = { pointerEvents: loading ? 'none' : 'auto' };
  return (
    <SortArrows
      upArrow={isCurrentParam && isAsc}
      downArrow={isCurrentParam && !isAsc}
      onclickUp={{ onClick: async () => await handleToggleSort(true), style }}
      onclickDown={{
        onClick: async () => await handleToggleSort(false),
        style,
      }}
    />
  );
};

const NewJobFilterBlock = () => {
  const { setOpenImportCandidates, openImportCandidates } =
    useJobApplications();
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
      <JobDetailsFilterBlock
        onClickUpload={{ onClick: () => setOpenImportCandidates(true) }}
        slotSearch={<SearchField />}
        slotFilter={<ApplicationFilter />}
      />
    </>
  );
};

// eslint-disable-next-line no-unused-vars
const ApplicationFilter = () => {
  const { searchParameters, handleJobApplicationFilter, applicationDisable } =
    useJobApplications();
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [updateTick, setUpdateTick] = useState([false, false]);
  const filters = searchParameters.filter;
  const count = filters.reduce((acc, curr) => {
    if (!acc.has(curr.parameter)) acc.add(curr.parameter);
    return acc;
  }, new Set<Parameters['filter'][0]['parameter']>());
  return (
    <CandidateFilter
      onclickReset={{
        onClick: async () => {
          if (!applicationDisable)
            await handleJobApplicationFilter({
              ...searchParameters,
              filter: [],
            });
        },
      }}
      isResetVisible={count.size > 0}
      filterCount={count.size}
      isCountVisible={count.size > 0}
      slotResumeSlider={
        <ApplicationFilterSlider
          parameter='resume_score'
          updateTick={updateTick[0]}
        />
      }
      isResumeClear={count.has('resume_score')}
      isInterviewClear={count.has('interview_score')}
      slotInterviewSlider={
        <ApplicationFilterSlider
          parameter='interview_score'
          updateTick={updateTick[1]}
        />
      }
      onclickResumeClear={{
        onClick: () => setUpdateTick((prev) => [!prev[0], prev[1]]),
      }}
      onclickInterviewClear={{
        onClick: () => setUpdateTick((prev) => [prev[0], !prev[1]]),
      }}
      filterHeaderProps={{
        onMouseOver: () => setFilterVisibility(true),
        onMouseOut: () => setFilterVisibility(false),
      }}
      isFilterBodyVisible={filterVisibility}
      dropdownBodyProps={{
        onMouseOver: () => setFilterVisibility(true),
        onMouseOut: () => setFilterVisibility(false),
      }}
    />
  );
};

const ApplicationFilterSlider = ({
  parameter,
  updateTick,
}: {
  parameter: Parameters['filter'][0]['parameter'];
  updateTick: boolean;
}) => {
  const { handleJobApplicationFilter, searchParameters } = useJobApplications();
  const paramsObj = searchParameters.filter.reduce(
    (acc, curr) => {
      const filter = curr.parameter === parameter;
      return filter
        ? curr.condition === 'gte'
          ? {
              ...acc,
              count: { ...acc.count, min: curr.count },
            }
          : {
              ...acc,
              count: { ...acc.count, max: curr.count },
            }
        : {
            ...acc,
            newParams: [...acc.newParams, curr],
          };
    },
    {
      newParams: [] as FilterParameter[],
      count: { min: 0, max: 100 },
    },
  );
  const [value, setValue] = useState([
    paramsObj.count.min,
    paramsObj.count.max,
  ]);
  const initialRef = useRef(true);
  const min = 0;
  const max = 100;
  const step = 5;

  const handleUpdate = async (newValue: number[]) => {
    await handleJobApplicationFilter({
      ...searchParameters,
      filter: [
        ...newValue.reduce(
          (acc, curr, i) => {
            if (curr > 0 && curr < 100)
              acc.push({
                parameter,
                condition: i === 0 ? 'gte' : 'lte',
                count: curr,
              });
            return acc;
          },
          [...paramsObj.newParams] as FilterParameter[],
        ),
      ],
    });
  };

  useEffect(() => {
    if (value[0] !== 0 || value[1] !== 100) {
      setValue([0, 100]);
    }
  }, [updateTick]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < step) {
      if (activeThumb === min) {
        const clamped = Math.min(newValue[0], max - step);
        setValue([clamped, clamped + step]);
      } else {
        const clamped = Math.max(newValue[1], step);
        setValue([clamped - step, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
    } else {
      const timer = setTimeout(async () => {
        await handleUpdate(value);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [...value]);

  return (
    <Slider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={handleChange}
      valueLabelDisplay='auto'
      disableSwap
      sx={{ color: '#1F73B7' }}
    />
  );
};

const NewJobDetailsTabs = ({
  section,
  handleSetSection,
}: {
  section: JobApplicationSections;
  // eslint-disable-next-line no-unused-vars
  handleSetSection: (section: any) => void;
}) => {
  const { job } = useJobApplications();
  const count = job.count;
  return (
    <JobDetailsTabs
      isNewSelected={section === JobApplicationSections.NEW}
      countNew={count.new}
      onClickNew={{
        onClick: () => handleSetSection(JobApplicationSections.NEW),
      }}
      isInterviewSelected={section === JobApplicationSections.INTERVIEWING}
      countInterview={count.interviewing}
      onClickInterview={{
        onClick: () => handleSetSection(JobApplicationSections.INTERVIEWING),
      }}
      isDisqualifiedSelected={section === JobApplicationSections.DISQUALIFIED}
      countDisqualified={count.disqualified}
      onClickDisqualified={{
        onClick: () => handleSetSection(JobApplicationSections.DISQUALIFIED),
      }}
      isQualifiedSelected={section === JobApplicationSections.QUALIFIED}
      countQualified={count.qualified}
      onClickQualified={{
        onClick: () => handleSetSection(JobApplicationSections.QUALIFIED),
      }}
    />
  );
};

const ApplicantsList = ({
  applications,
  checkList,
  setCheckList,
  jobUpdate,
  section,
  handleSelectCurrentApplication,
  currentApplication,
  refresh,
}: {
  applications: JobApplication[];
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
  section: JobApplicationSections;
  // eslint-disable-next-line no-unused-vars
  handleSelectCurrentApplication: (id: number) => void;
  currentApplication: number;
  refresh: boolean;
}) => {
  const {
    handleJobApplicationPaginatedRead,
    applicationDepth,
    applicationDisable,
  } = useJobApplications();
  const { pressed } = useKeyPress('Shift');
  const [lastPressed, setLastPressed] = useState(null);
  const [paginationLoad, setPaginationLoad] = useState(false);

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

  const observer = useRef(undefined);
  const lastApplicationRef = async (node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && !paginationLoad && !refresh) {
        setPaginationLoad(true);
        await handleJobApplicationPaginatedRead([section]);
        setPaginationLoad(false);
      }
    });
    if (node) observer.current.observe(node);
  };

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
      {applications.map((application, i) => {
        const styles =
          (jobUpdate && checkList.has(application.application_id)) ||
          applicationDisable
            ? { opacity: 0.5, pointerEvent: 'none', transition: '0.5s' }
            : { opacity: 1, pointerEvent: 'auto', transition: '0.5s' };
        return (
          <Stack
            key={application.application_id}
            style={styles}
            ref={
              i === applicationDepth[section] - 1 ? lastApplicationRef : null
            }
            id={`job-application-stack-${i}`}
          >
            <ApplicationCard
              application={application}
              index={i}
              checkList={checkList}
              handleSelect={handleSelect}
              isInterview={section !== JobApplicationSections.NEW}
              handleOpenDetails={() => handleSelectCurrentApplication(i)}
              isSelected={currentApplication === i}
            />
          </Stack>
        );
      })}
      {paginationLoad && (
        <Stack>
          <Loader />
        </Stack>
      )}
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
    applications,
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
    const confirmation = await handleUpdateJobStatus(checkList, {
      source: section,
      destination,
    });
    if (confirmation) {
      setCheckList(new Set<string>());
    }
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
  const checkListCount = checkList.size;
  const DialogInfo = {
    interviewing: {
      heading: `Are you sure that you want to start the assessment process for ${checkListCount} candidate${
        checkListCount !== 1 ? 's' : ''
      }`,
      subHeading: 'Send assessment email',
      primaryAction: async (checkEmail: any) => {
        await handleUpdateJobs(JobApplicationSections.INTERVIEWING);
        if (checkEmail) {
          sendEmails(
            JobApplicationSections.INTERVIEWING,
            checkList,
            applications,
            job,
            handleJobApplicationUpdate,
          );
        }
      },
      primaryText: 'Qualify for Assessment',
      secondaryText: 'Cancel',
      variant: 'primary',
    },
    selected: {
      heading: `Are you sure that you want to qualify ${checkListCount} candidate${
        checkListCount !== 1 ? 's' : ''
      }`,
      subHeading: undefined,
      primaryAction: async (checkEmail: any) => {
        await handleUpdateJobs(JobApplicationSections.QUALIFIED);
        if (checkEmail) {
          sendEmails(
            JobApplicationSections.QUALIFIED,
            checkList,
            applications,
            job,
            handleJobApplicationUpdate,
          );
        }
      },
      primaryText: 'Qualify',
      secondaryText: 'Cancel',
      variant: 'ai',
    },
    rejected: {
      heading: `Are you sure that you want to disqualifiy ${checkListCount} candidate${
        checkListCount !== 1 ? 's' : ''
      }`,
      subHeading: 'Send rejection email',
      primaryAction: async (checkEmail: any) => {
        await handleUpdateJobs(JobApplicationSections.DISQUALIFIED);
        if (checkEmail) {
          sendEmails(
            JobApplicationSections.DISQUALIFIED,
            checkList,
            applications,
            job,
            handleJobApplicationUpdate,
          );
        }
      },
      primaryText: 'Disqualify',
      secondaryText: 'Cancel',
      variant: 'primary',
    },
    applied: {
      heading: `Are you sure that you want to move ${checkListCount} candidate${
        checkListCount !== 1 ? 's' : ''
      } to New`,
      subHeading: undefined,
      warningMessage:
        'Moving candidates to new will restart the entire process and reset candidate history.',
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
        textSelected={`${checkListCount} candidate${
          checkListCount !== 1 ? 's' : ''
        } selected`}
        isMoveNew={showNew}
      />
    </>
  );
};

export default JobApplicationsDashboard;

export function sendEmails(
  status: string,
  checkList: Set<string>,
  applications: JobApplicationsData,
  job,
  handleJobApplicationUpdate,
) {
  if (
    status === JobApplicationSections.INTERVIEWING ||
    status === JobApplicationSections.DISQUALIFIED
  ) {
    const _new = applications['new'];
    const interviewing = applications['interviewing'];
    const qualified = applications['qualified'];
    const disqualified = applications['disqualified'];

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
      emailHandler(candidate, job, handleJobApplicationUpdate, status);
    }
  }
}

export const emailHandler = async (
  candidate: {
    email: any;
    first_name: any;
    last_name: any;
    job_title: any;
    company: any;
    application_id: any;
    emails: any;
  },
  job: any,
  handleJobApplicationUpdate: any,
  status: JobApplicationSections,
) => {
  return await axios
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
              interview_link: `${process.env.NEXT_PUBLIC_HOST_NAME}/${pageRoutes.MOCKTEST}?id=${candidate.application_id}`,
              support_link: `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${candidate.application_id}`,
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
      if (status === JobApplicationSections.INTERVIEWING) {
        candidate.emails.interviewing = true;
        await handleJobApplicationUpdate(candidate.application_id, {
          emails: candidate.emails,
        });
        return true;
      }
      if (status === JobApplicationSections.DISQUALIFIED) {
        candidate.emails.rejected = true;
        await handleJobApplicationUpdate(candidate.application_id, {
          emails: candidate.emails,
        });
        return true;
      }
    })
    .catch(() => {
      return false;
    });
};

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
