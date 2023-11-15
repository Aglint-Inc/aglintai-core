/* eslint-disable security/detect-object-injection */
import { Dialog, Slider, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ImportCandidates } from '@/devlink';
import {
  AllApplicantsTable,
  ApplicantsListEmpty,
  CandidateFilter,
  CandidateSelectionPopup,
  CandidatesListPagination,
  JobDetails,
  JobDetailsFilterBlock,
  JobDetailsTabs,
  SelectActionBar,
  // SortArrows,
  TopApplicantsTable,
} from '@/devlink2';
import AUIButton from '@/src/components/Common/AUIButton';
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
    pageNumber,
    applicationDisable,
    updateTick,
    searchParameters,
    setOpenImportCandidates,
    handleJobApplicationRefresh,
  } = useJobApplications();
  const router = useRouter();
  const [section, setSection] = useState(JobApplicationSections.NEW);
  const sectionApplications = applications[section];

  const [checkList, setCheckList] = useState(new Set<string>());
  const [currentApplication, setCurrentApplication] = useState(-1);

  const [jobUpdate, setJobUpdate] = useState(false);
  const [detailedView, setDetailedView] = useState(true);

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

  const [refresh, setRefresh] = useState(false);
  const refreshRef = useRef(true);

  const handleAutoRefresh = async () => {
    setRefresh(true);
    await handleJobApplicationRefresh();
    setRefresh(false);
  };

  const handleManualRefresh = async () => {
    refreshRef.current = !refreshRef.current;
    await handleAutoRefresh();
  };

  usePolling(async () => await handleAutoRefresh(), 600000, [
    ...Object.values(pageNumber),
    section,
    refreshRef.current,
    updateTick,
    searchParameters.search,
    searchParameters.sort.ascending,
    searchParameters.sort.parameter,
  ]);

  return (
    <>
      <JobDetails
        textJobStatus={null}
        textRole={capitalize(job.job_title)}
        textApplicantsNumber={``}
        onClickEditJobs={{
          onClick: () => {
            router.push(`/jobs/edit?job_id=${job.id}`);
          },
        }}
        isPreviewVisible={true}
        jobLink={{
          href: `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${job.id}`,
          target: '_blank',
        }}
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
        slotFilters={
          <NewJobFilterBlock
            section={section}
            detailedView={detailedView}
            setDetailedView={setDetailedView}
            checkList={checkList}
            setCheckList={setCheckList}
            jobUpdate={jobUpdate}
            setJobUpdate={setJobUpdate}
          />
        }
        onclickHeaderJobs={{
          href: `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.JOBS}?status=active`,
        }}
        onclickAddCandidates={{ onClick: () => setOpenImportCandidates(true) }}
        slotTable={
          <ApplicationTable
            detailedView={detailedView}
            section={section}
            sectionApplications={sectionApplications}
            checkList={checkList}
            setCheckList={setCheckList}
            jobUpdate={jobUpdate}
            handleSelectCurrentApplication={handleSelectCurrentApplication}
            currentApplication={currentApplication}
            refresh={refresh}
          />
        }
        slotRefresh={
          <RefreshButton
            isDisabled={refresh || applicationDisable}
            text={'Refresh'}
            onClick={async () => await handleManualRefresh()}
          />
        }
        slotPagination={
          <ApplicationPagination
            size={sectionApplications.length}
            section={section}
          />
        }
      />
      <AddCandidates section={section} />
    </>
  );
};

const ApplicationTable = ({
  detailedView,
  section,
  sectionApplications,
  checkList,
  setCheckList,
  jobUpdate,
  handleSelectCurrentApplication,
  currentApplication,
  refresh,
}: {
  detailedView: boolean;
  section: JobApplicationSections;
  sectionApplications: JobApplication[];
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSelectCurrentApplication: (id: number) => void;
  currentApplication: number;
  refresh: boolean;
}) => {
  const handleSelectAllMin = () => {
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
  const applicantsList = (
    <ApplicantsList
      detailedView={detailedView}
      applications={sectionApplications}
      checkList={checkList}
      setCheckList={setCheckList}
      jobUpdate={jobUpdate}
      section={section}
      handleSelectCurrentApplication={handleSelectCurrentApplication}
      currentApplication={currentApplication}
      refresh={refresh}
    />
  );
  const isAllChecked = checkList.size === sectionApplications.length;
  const emptyList = useMemo(() => <EmptyList section={section} />, [section]);
  return sectionApplications.length === 0 ? (
    emptyList
  ) : detailedView ? (
    <AllApplicantsTable
      onclickSelectAll={{ onClick: () => handleSelectAllMin() }}
      isAllChecked={isAllChecked}
      isInterviewVisible={section !== JobApplicationSections.NEW}
      slotCandidatesList={applicantsList}
    />
  ) : (
    <TopApplicantsTable
      onclickSelectAll={{ onClick: () => handleSelectAllMin() }}
      isAllSelected={isAllChecked}
      slotList={applicantsList}
    />
  );
};

const ApplicationPagination = ({
  size,
  section,
}: {
  size: number;
  section: JobApplicationSections;
}) => {
  const {
    paginationLimit,
    pageNumber,
    handleJobApplicationPaginate,
    job,
    applicationDisable,
  } = useJobApplications();
  const totalCandidatesCount = job.count[section];
  const totalPageCount = Math.ceil(totalCandidatesCount / paginationLimit);
  const handleNext = async () => {
    if (!applicationDisable) {
      const newPageNum = (pageNumber[section] + 1) % totalPageCount;
      await handleJobApplicationPaginate(
        newPageNum === 0 ? totalPageCount : newPageNum,
        section,
      );
    }
  };
  const handlePrevious = async () => {
    if (!applicationDisable) {
      const newPageNum = pageNumber[section] - 1;
      await handleJobApplicationPaginate(
        newPageNum === 0 ? totalPageCount : newPageNum,
        section,
      );
    }
  };
  return totalCandidatesCount !== 0 ? (
    <CandidatesListPagination
      onclickNext={{ onClick: async () => await handleNext() }}
      onclickPrevious={{ onClick: async () => await handlePrevious() }}
      currentPageCount={pageNumber[section]}
      totalPageCount={totalPageCount}
      currentCandidatesCount={size}
      totalCandidatesCount={totalCandidatesCount}
    />
  ) : (
    <></>
  );
};

// const ApplicationSort = ({
//   parameter,
//   section,
// }: {
//   parameter: Parameters['sort']['parameter'];
//   section: JobApplicationSections;
// }) => {
//   const { searchParameters, handleJobApplicationFilter } = useJobApplications();
//   const [loading, setLoading] = useState(false);
//   const isCurrentParam = searchParameters.sort
//     ? searchParameters.sort.parameter === parameter ||
//       (section === JobApplicationSections.NEW &&
//         searchParameters.sort.parameter === 'interview_score' &&
//         parameter === 'resume_score')
//     : false;
//   const isAsc = searchParameters.sort ? searchParameters.sort.ascending : false;
//   const handleToggleSort = async (up: boolean) => {
//     if (
//       searchParameters.sort.parameter === parameter &&
//       searchParameters.sort.ascending === up
//     )
//       return;
//     setLoading(true);
//     await handleJobApplicationFilter({
//       ...searchParameters,
//       sort: { parameter, ascending: up },
//     });
//     setLoading(false);
//   };
//   const style = { pointerEvents: loading ? 'none' : 'auto' };
//   return (
//     <SortArrows
//       upArrow={isCurrentParam && isAsc}
//       downArrow={isCurrentParam && !isAsc}
//       onclickUp={{ onClick: async () => await handleToggleSort(true), style }}
//       onclickDown={{
//         onClick: async () => await handleToggleSort(false),
//         style,
//       }}
//     />
//   );
// };

const NewJobFilterBlock = ({
  section,
  detailedView,
  setDetailedView,
  checkList,
  setCheckList,
  jobUpdate,
  setJobUpdate,
}: {
  section: JobApplicationSections;
  detailedView: boolean;
  setDetailedView: Dispatch<SetStateAction<boolean>>;
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
  setJobUpdate: Dispatch<SetStateAction<boolean>>;
}) => {
  const { job } = useJobApplications();
  return (
    <Stack style={{ display: job.count[section] === 0 ? 'none' : 'flex' }}>
      <YTransform uniqueKey={checkList.size > 0}>
        {checkList.size > 0 ? (
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
        ) : (
          <></>
        )}
      </YTransform>
      <YTransform uniqueKey={checkList.size === 0}>
        {checkList.size === 0 ? (
          <JobDetailsFilterBlock
            onclickAllApplicants={{ onClick: () => setDetailedView(true) }}
            onclickTopApplicants={{ onClick: () => setDetailedView(false) }}
            isAllApplicants={detailedView}
            isTopApplicants={!detailedView}
            slotFilter={
              <>
                <ApplicationFilter />
                <SearchField />
              </>
            }
          />
        ) : (
          <></>
        )}
      </YTransform>
    </Stack>
  );
};

const AddCandidates = ({ section }: { section: JobApplicationSections }) => {
  const { setOpenImportCandidates, openImportCandidates } =
    useJobApplications();
  return section === JobApplicationSections.NEW ? (
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
  ) : (
    <></>
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
    if (!initialRef.current && (value[0] !== 0 || value[1] !== 100)) {
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
  detailedView,
  applications,
  checkList,
  setCheckList,
  jobUpdate,
  section,
  handleSelectCurrentApplication,
  currentApplication,
}: {
  detailedView: boolean;
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
  const { applicationDisable } = useJobApplications();
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

  const scrollToRef = useRef(undefined);
  useEffect(() => {
    if (currentApplication > -1)
      scrollToRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'center',
        inline: 'nearest',
      });
  }, [currentApplication]);

  return (
    <Stack>
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
            id={`job-application-stack-${i}`}
            ref={currentApplication === i ? scrollToRef : null}
          >
            <ApplicationCard
              section={section}
              detailedView={detailedView}
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
    </Stack>
  );
};

const EmptyList = ({ section }: { section: JobApplicationSections }) => {
  return (
    <Stack height={'50vh'} justifyContent={'center'}>
      <Stack>
        <ApplicantsListEmpty
          textEmpty={
            section === JobApplicationSections.INTERVIEWING
              ? 'assessment'
              : section
          }
          slotLottie={<NoApplicants />}
        />
      </Stack>
    </Stack>
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
    header: ``,
    description: ``,
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
      header: 'Move to Assessment',
      description: `Move ${checkListCount} candidate${
        checkListCount !== 1 ? 's' : ''
      } to Assessment Stage`,
      subHeading: `Proceed to send an assessment email to the candidate${
        checkListCount !== 1 ? 's' : ''
      }`,
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
      primaryText: 'Move to Assessment',
      secondaryText: 'Cancel',
      variant: 'primary',
    },
    selected: {
      header: 'Move to Qualified',
      description: `Move ${checkListCount} candidate${
        checkListCount !== 1 ? 's' : ''
      } to Qualified Stage`,
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
      primaryText: 'Move to Qualified',
      secondaryText: 'Cancel',
      variant: 'primary',
    },
    rejected: {
      header: 'Move to Disqualified',
      description: `Move ${checkListCount} candidate${
        checkListCount !== 1 ? 's' : ''
      } to Disqualified Stage`,
      subHeading: `Proceed to send a rejection email to the candidate${
        checkListCount !== 1 ? 's' : ''
      }`,
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
      primaryText: 'Move to Disqualified',
      secondaryText: 'Cancel',
      variant: 'primary',
    },
    applied: {
      header: 'Move to New',
      description: `Move ${checkListCount} candidate${
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
  const isCheckVisible =
    dialogInfo.header !== 'Move to Qualified' &&
    dialogInfo.header !== 'Move to New';
  return (
    <>
      <Dialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)}>
        <CandidateSelectionPopup
          isCheckVisible={isCheckVisible}
          textHeader={dialogInfo.header}
          textDescription={dialogInfo.description}
          isChecked={checkEmail}
          textCheck={dialogInfo.subHeading}
          onclickCheck={{ onClick: () => setCheckEmail((prev) => !prev) }}
          onclickClose={{ onClick: () => setOpenInfoDialog(false) }}
          slotButtons={
            <Stack
              spacing={'10px'}
              mt={'10px'}
              direction={'row'}
              alignItems={'center'}
            >
              <AUIButton
                onClick={() => setOpenInfoDialog(false)}
                variant='text'
              >
                {dialogInfo.secondaryText}
              </AUIButton>
              <AUIButton
                onClick={() => {
                  dialogInfo.primaryAction(checkEmail);
                  setOpenInfoDialog(false);
                }}
                variant={dialogInfo.variant as any}
              >
                {checkEmail && isCheckVisible
                  ? 'Send Email & Move'
                  : dialogInfo.primaryText}
              </AUIButton>
            </Stack>
          }
        />
      </Dialog>
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
