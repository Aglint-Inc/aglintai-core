/* eslint-disable security/detect-object-injection */
import {
  CircularProgress,
  Dialog,
  /*Slider,*/ Stack,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FetchingAshbyLoader, ImportCandidates } from '@/devlink';
import {
  AllApplicantsTable,
  ApplicantsListEmpty,
  CandidatesListPagination,
  JobDetails,
  JobDetailsFilterBlock,
  JobDetailsTabs,
  SelectActionBar,
  SelectActionsDropdown,
  // SortArrows,
  TopApplicantsTable,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { CountJobs } from '@/src/context/JobsContext/types';
import NotFoundPage from '@/src/pages/404';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';

import ApplicationCard from './ApplicationCard';
import ApplicationDetails from './ApplicationCard/ApplicationDetails';
import FilterJobApplications from './Common/FilterJobApplications';
import SortJobApplications from './Common/SortJobApplications';
import ResumeUpload from './FileUpload';
import {
  getBoundingStatus,
  useKeyPress,
  useMouseClick,
  usePolling,
} from './hooks';
import ImportCandidatesCSV from './ImportCandidatesCsv';
import ImportManualCandidates from './ImportManualCandidates';
import NoApplicants from './Lotties/NoApplicants';
import { MoveCandidateDialog, sendEmails } from './MoveCandidateDialog';
import SearchField from './SearchField';
import { capitalize } from './utils';
import Loader from '../Common/Loader';
import RefreshButton from '../Common/RefreshButton';
import { POSTED_BY } from '../JobsDashboard/AddJobWithIntegrations/utils';

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
    atsSync,
    pageNumber,
    applicationDisable,
    setApplicationDisable,
    updateTick,
    searchParameters,
    setOpenImportCandidates,
    handleJobApplicationRefresh,
    section,
    setSection,
    longPolling,
  } = useJobApplications();
  const router = useRouter();
  const sectionApplications = applications[section];

  const [checkList, setCheckList] = useState(new Set<string>());
  const [currentApplication, setCurrentApplication] = useState(-1);

  const [jobUpdate, setJobUpdate] = useState(false);
  const [detailedView, setDetailedView] = useState(false);

  const [applicationLimit, setApplicationLimit] = useState(job.count);

  useEffect(() => {
    setApplicationLimit(job.count);
  }, [...Object.values(job.count)]);

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

  const refreshRef = useRef(true);

  const handleAutoRefresh = async () => {
    setApplicationDisable(true);
    await handleJobApplicationRefresh();
    setApplicationDisable(false);
  };

  const handleManualRefresh = async () => {
    refreshRef.current = !refreshRef.current;
    await handleAutoRefresh();
  };

  usePolling(async () => await handleAutoRefresh(), longPolling, [
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
        slotLoadingLottie={
          <CircularProgress
            style={{
              color: '#17494D',
              width: '12px',
              height: '12px',
            }}
          />
        }
        isFetchingPillVisible={atsSync}
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
            jobUpdate={jobUpdate}
            setJobUpdate={setJobUpdate}
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
            detailedView={detailedView}
            setDetailedView={setDetailedView}
            checkList={checkList}
            setCheckList={setCheckList}
            jobUpdate={jobUpdate}
            setJobUpdate={setJobUpdate}
            applicationLimit={applicationLimit}
            setApplicationLimit={setApplicationLimit}
          />
        }
        onclickHeaderJobs={{
          href: `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.JOBS}`,
        }}
        onclickAddCandidates={{ onClick: () => setOpenImportCandidates(true) }}
        slotTable={
          <ApplicationTable
            detailedView={detailedView}
            sectionApplications={sectionApplications}
            checkList={checkList}
            setCheckList={setCheckList}
            jobUpdate={jobUpdate}
            handleSelectCurrentApplication={handleSelectCurrentApplication}
            currentApplication={currentApplication}
          />
        }
        slotRefresh={
          <RefreshButton
            isDisabled={applicationDisable}
            text={'Refresh'}
            onClick={async () => await handleManualRefresh()}
          />
        }
        slotPagination={
          <ApplicationPagination
            size={sectionApplications.length}
            limits={applicationLimit}
          />
        }
      />
      <AddCandidates section={section} />
    </>
  );
};

const ApplicationTable = ({
  detailedView,
  sectionApplications,
  checkList,
  setCheckList,
  jobUpdate,
  handleSelectCurrentApplication,
  currentApplication,
}: {
  detailedView: boolean;
  sectionApplications: JobApplication[];
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSelectCurrentApplication: (id: number) => void;
  currentApplication: number;
}) => {
  const { recruiter } = useAuthDetails();
  const { applicationDisable, section, job, atsSync } = useJobApplications();
  const handleSelectAllMin = () => {
    if (!applicationDisable) {
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
    }
  };
  const applicantsList = (
    <ApplicantsList
      detailedView={detailedView}
      applications={sectionApplications}
      checkList={checkList}
      setCheckList={setCheckList}
      jobUpdate={jobUpdate}
      handleSelectCurrentApplication={handleSelectCurrentApplication}
      currentApplication={currentApplication}
    />
  );
  const isAllChecked = checkList.size === sectionApplications.length;
  let emptyList = useMemo(() => <EmptyList section={section} />, [section]);
  if (job.posted_by == POSTED_BY.ASHBY) {
    if (
      (sectionApplications.length === 0 && !recruiter.ashby_sync_token) ||
      atsSync
    ) {
      emptyList = (
        <FetchingAshbyLoader
          slotLottie={
            <Stack height={'100px'} width={'100px'}>
              <NoApplicants />
            </Stack>
          }
        />
      );
    }
  }

  return sectionApplications.length === 0 ? (
    emptyList
  ) : !detailedView ? (
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
  limits,
}: {
  size: number;
  limits: CountJobs;
}) => {
  const {
    paginationLimit,
    pageNumber,
    handleJobApplicationPaginate,
    applicationDisable,
    section,
  } = useJobApplications();
  const totalCandidatesCount = limits[section];
  const totalPageCount = Math.ceil(totalCandidatesCount / paginationLimit);
  const handleNext = async () => {
    if (!applicationDisable && totalPageCount > 1) {
      const newPageNum = (pageNumber[section] + 1) % totalPageCount;
      await handleJobApplicationPaginate(
        newPageNum === 0 ? totalPageCount : newPageNum,
        section,
      );
    }
  };
  const handlePrevious = async () => {
    if (!applicationDisable && totalPageCount > 1) {
      const newPageNum = pageNumber[section] - 1;
      await handleJobApplicationPaginate(
        newPageNum === 0 ? totalPageCount : newPageNum,
        section,
      );
    }
  };
  return totalCandidatesCount !== 0 ? (
    <Stack style={{ backgroundColor: 'white' }}>
      <Stack
        style={{
          opacity: applicationDisable ? 0.5 : 1,
          pointerEvents: applicationDisable ? 'none' : 'auto',
        }}
      >
        <CandidatesListPagination
          onclickNext={{ onClick: async () => await handleNext() }}
          onclickPrevious={{ onClick: async () => await handlePrevious() }}
          // currentPageCount={pageNumber[section]}
          totalPageCount={totalPageCount}
          currentCandidatesCount={size}
          totalCandidatesCount={totalCandidatesCount}
          slotPageNumber={<PageCountSlot totalPageCount={totalPageCount} />}
        />
      </Stack>
    </Stack>
  ) : (
    <></>
  );
};

const PageCountSlot = ({ totalPageCount }: { totalPageCount: number }) => {
  const { section, handleJobApplicationPaginate, pageNumber } =
    useJobApplications();
  const [value, setValue] = useState(pageNumber[section]);
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
    } else {
      if (value && value !== pageNumber[section]) {
        const timer = setTimeout(async () => {
          document.getElementById('PAGEFORM').blur();
          await handleJobApplicationPaginate(value, section);
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [value]);

  useEffect(() => {
    setValue(pageNumber[section]);
  }, [pageNumber[section]]);

  const clickData = useMouseClick();
  useEffect(() => {
    if (clickData.click && clickData.x !== -1 && clickData.y !== -1) {
      if (!getBoundingStatus('PAGEBODY', clickData.x, clickData.y))
        setValue(pageNumber[section]);
    }
  }, [clickData.click]);

  const handleChange = (val: any) => {
    if (val === null || val === '') {
      setValue(null);
    } else if (val < 1) {
      setValue(1);
    } else if (val > totalPageCount) {
      setValue(totalPageCount);
    } else {
      setValue(val);
    }
  };
  return (
    <Stack id={'PAGEBODY'}>
      <TextField
        id='PAGEFORM'
        variant='outlined'
        type='number'
        value={value}
        sx={{
          height: '100%',
          display: 'flex',
          '& .MuiOutlinedInput-root': {
            padding: 0,
            height: '100%',
            border: 'none',
            '& > fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-input': {
            width: '38px',
            textAlign: 'center',
            height: '12px !important',
            overflow: 'visible',
            fontSize: '14px',
            transform: 'translateY(-2px)',
          },
        }}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Stack>
  );
};

const NewJobFilterBlock = ({
  detailedView,
  setDetailedView,
  checkList,
  setCheckList,
  jobUpdate,
  setJobUpdate,
  applicationLimit,
  setApplicationLimit,
}: {
  detailedView: boolean;
  setDetailedView: Dispatch<SetStateAction<boolean>>;
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
  setJobUpdate: Dispatch<SetStateAction<boolean>>;
  applicationLimit: CountJobs;
  setApplicationLimit: Dispatch<SetStateAction<CountJobs>>;
}) => {
  const { job, searchParameters, handleJobApplicationFilter, section } =
    useJobApplications();
  const handleSearch = async (val: string) => {
    const value = val ? val.trim().toLowerCase() : null;
    const { confirmation, count } = await handleJobApplicationFilter({
      ...searchParameters,
      search: value,
    });
    if (confirmation) setApplicationLimit(count);
  };
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
                  checkList={checkList}
                  setCheckList={setCheckList}
                  jobUpdate={jobUpdate}
                  setJobUpdate={setJobUpdate}
                  applicationLimit={applicationLimit}
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
              <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
                <SortJobApplications
                  setApplicationLimit={setApplicationLimit}
                />
                <FilterJobApplications
                  setApplicationLimit={setApplicationLimit}
                />
                <SearchField
                  val={searchParameters.search}
                  handleSearch={handleSearch}
                />
              </Stack>
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
  handleSelectCurrentApplication,
  currentApplication,
}: {
  detailedView: boolean;
  applications: JobApplication[];
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSelectCurrentApplication: (id: number) => void;
  currentApplication: number;
}) => {
  const { applicationDisable, section } = useJobApplications();
  const { pressed } = useKeyPress('Shift');
  const [lastPressed, setLastPressed] = useState(null);

  // const infiniteScrollTriggerCount = 15;
  // const [lastLoad, setLastLoad] = useState(infiniteScrollTriggerCount);
  // const observer = useRef(undefined);
  // const lastApplicationRef = (node: any) => {
  //   if (observer.current) observer.current.disconnect();
  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting)
  //       setLastLoad((prev) => prev + infiniteScrollTriggerCount);
  //   });
  //   if (node) observer.current.observe(node);
  // };
  // useEffect(() => {
  //   setLastLoad(infiniteScrollTriggerCount);
  // }, [section]);

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
      {applications /*.slice(0, lastLoad)*/
        .map((application, i) => {
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
              {/* <Stack ref={i === lastLoad - 1 ? lastApplicationRef : null}> */}
              <ApplicationCard
                detailedView={detailedView}
                application={application}
                index={i}
                checkList={checkList}
                handleSelect={handleSelect}
                isInterview={section !== JobApplicationSections.NEW}
                handleOpenDetails={() => handleSelectCurrentApplication(i)}
                isSelected={currentApplication === i}
              />
              {/* </Stack> */}
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
  checkList,
  setCheckList,
  jobUpdate,
  setJobUpdate,
  applicationLimit,
}: {
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
  setJobUpdate: Dispatch<SetStateAction<boolean>>;
  applicationLimit: CountJobs;
}) => {
  const {
    handleUpdateJobStatus,
    applications,
    handleJobApplicationUpdate,
    job,
    paginationLimit,
    section,
  } = useJobApplications();
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState<JobApplicationSections>(null);

  const [selectAll, setSelectAll] = useState(false);

  const handleUpdateJobs = async () => {
    if (!jobUpdate) {
      setJobUpdate(true);
      const confirmation = await handleUpdateJobStatus(
        {
          source: section,
          destination,
        },
        checkList,
        selectAll,
      );
      if (confirmation) {
        setCheckList(new Set<string>());
        setSelectAll(false);
      }
      setJobUpdate(false);
    }
  };

  const handleSelectAll = () => {
    setCheckList(new Set(applications[section].map((a) => a.application_id)));
    setSelectAll(true);
  };

  useEffect(() => {
    if (checkList.size !== applications[section].length) setSelectAll(false);
  }, [checkList.size]);

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
  const checkListCount = selectAll ? applicationLimit[section] : checkList.size;

  const handleOpen = (destination: JobApplicationSections) => {
    setOpen(true);
    setDestination(destination);
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setDestination(null), 100);
  };

  const handleEmail = async () => {
    await sendEmails(
      destination,
      checkList,
      applications,
      job,
      handleJobApplicationUpdate,
    );
  };

  return (
    <>
      <MoveCandidateDialog
        open={open}
        onClose={() => handleClose()}
        destination={destination}
        onSubmit={async () => await handleUpdateJobs()}
        checkAction={async () => await handleEmail()}
        count={checkList.size}
      />
      <SelectActionBar
        onClickClear={{
          onClick: () => setCheckList(new Set<string>()),
        }}
        textSelected={`${checkListCount} candidate${
          checkListCount !== 1 ? 's' : ''
        } selected`}
        selectAllText={`Select all ${applicationLimit[section]} candidates`}
        isSelectAllVisible={
          !selectAll && applicationLimit[section] > paginationLimit
        }
        onclickSelectAll={{ onClick: () => handleSelectAll() }}
        slotDropdown={
          <SelectActionsDropdown
            isInterview={showInterview}
            onClickInterview={{
              onClick: () => handleOpen(JobApplicationSections.INTERVIEWING),
            }}
            isQualified={showSelected}
            onClickQualified={{
              onClick: () => handleOpen(JobApplicationSections.QUALIFIED),
            }}
            isDisqualified={showReject}
            onClickDisqualified={{
              onClick: () => handleOpen(JobApplicationSections.DISQUALIFIED),
            }}
            onClickMoveNew={{
              onClick: () => handleOpen(JobApplicationSections.NEW),
            }}
            isMoveNew={showNew}
          />
        }
      />
    </>
  );
};

export default JobApplicationsDashboard;
