/* eslint-disable security/detect-object-injection */
import {
  CircularProgress,
  Dialog,
  /*Slider,*/ Stack,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
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
import { JobApplicationEmails } from '@/src/pages/api/jobApplications/candidateEmail';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

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
import { MoveCandidateDialog } from './MoveCandidateDialog';
import SearchField from './SearchField';
import { capitalize } from './utils';
import Loader from '../Common/Loader';
import RefreshButton from '../Common/RefreshButton';
import { POSTED_BY } from '../JobsDashboard/AddJobWithIntegrations/utils';

const JobApplicationsDashboard = () => {
  const { initialLoad, job } = useJobApplications();
  return initialLoad ? (
    job !== undefined ? (
      <JobApplicationComponent />
    ) : (
      <NotFoundPage />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};
const JobApplicationComponent = () => {
  const {
    applications,
    job,
    atsSync,
    pageNumber,
    allApplicationDisable,
    setAllApplicationDisable,
    updateTick,
    searchParameters,
    setOpenImportCandidates,
    handleJobApplicationRefresh,
    section,
    longPolling,
  } = useJobApplications();
  const router = useRouter();
  const sectionApplications = applications[section];

  const [currentApplication, setCurrentApplication] = useState(-1);
  const [detailedView, setDetailedView] = useState(false);

  const [applicationLimit, setApplicationLimit] = useState(job.count);

  useEffect(() => {
    setApplicationLimit(job.count);
  }, [...Object.values(job.count)]);

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
    setAllApplicationDisable(true);
    await handleJobApplicationRefresh();
    setAllApplicationDisable(false);
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
        isWarningVisible={
          job.status == 'published' && (!job.jd_json || !job.description)
            ? true
            : false
        }
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
            posthog.capture('Edit Job Details clicked');
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
            application={
              sectionApplications[
                currentApplication === -1 ? 0 : currentApplication
              ]
            }
          />
        }
        slotTabs={<NewJobDetailsTabs />}
        slotFilters={
          <NewJobFilterBlock
            detailedView={detailedView}
            setDetailedView={setDetailedView}
            applicationLimit={applicationLimit}
            setApplicationLimit={setApplicationLimit}
          />
        }
        onclickHeaderJobs={{
          href: `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.JOBS}`,
        }}
        onclickAddCandidates={{
          onClick: () => {
            setOpenImportCandidates(true);
            posthog.capture('Import Candidates Clicked');
          },
        }}
        slotTable={
          <ApplicationTable
            detailedView={detailedView}
            sectionApplications={sectionApplications}
            handleSelectCurrentApplication={handleSelectCurrentApplication}
            currentApplication={currentApplication}
          />
        }
        slotRefresh={
          <RefreshButton
            isDisabled={allApplicationDisable}
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
      <AddCandidates />
    </>
  );
};

const ApplicationTable = ({
  detailedView,
  sectionApplications,
  handleSelectCurrentApplication,
  currentApplication,
}: {
  detailedView: boolean;
  sectionApplications: JobApplication[];
  // eslint-disable-next-line no-unused-vars
  handleSelectCurrentApplication: (id: number) => void;
  currentApplication: number;
}) => {
  const { recruiter } = useAuthDetails();
  const {
    allApplicationDisable,
    section,
    job,
    atsSync,
    showInterview,
    checkListManager,
    setCheckListManager,
  } = useJobApplications();

  const checkList = checkListManager.checkList;
  const checkListDisable = checkListManager.disable;

  const handleSelectAllMin = () => {
    if (!allApplicationDisable && !checkListDisable) {
      if (checkList.size === sectionApplications.length)
        setCheckListManager((prev) => ({ ...prev, checkList: new Set() }));
      else
        setCheckListManager((prev) => ({
          ...prev,
          checkList: new Set(
            sectionApplications.reduce((acc, curr) => {
              acc.push(curr.id);
              return acc;
            }, []),
          ),
        }));
    } else {
      toast.warning('Please wait till the ongoing process has finished');
    }
  };
  const applicantsList = (
    <ApplicantsList
      detailedView={detailedView}
      applications={sectionApplications}
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
      isInterviewVisible={showInterview}
      slotCandidatesList={applicantsList}
      isScreeningVisible={section !== JobApplicationSections.NEW}
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
    allApplicationDisable,
    section,
  } = useJobApplications();
  const totalCandidatesCount = limits[section];
  const totalPageCount = Math.ceil(totalCandidatesCount / paginationLimit);
  const handleNext = async () => {
    if (!allApplicationDisable && totalPageCount > 1) {
      const newPageNum = (pageNumber[section] + 1) % totalPageCount;
      await handleJobApplicationPaginate(
        newPageNum === 0 ? totalPageCount : newPageNum,
        section,
      );
    }
  };
  const handlePrevious = async () => {
    if (!allApplicationDisable && totalPageCount > 1) {
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
          opacity: allApplicationDisable ? 0.5 : 1,
          pointerEvents: allApplicationDisable ? 'none' : 'auto',
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
  applicationLimit,
  setApplicationLimit,
}: {
  detailedView: boolean;
  setDetailedView: Dispatch<SetStateAction<boolean>>;
  applicationLimit: CountJobs;
  setApplicationLimit: Dispatch<SetStateAction<CountJobs>>;
}) => {
  const {
    job,
    searchParameters,
    handleJobApplicationFilter,
    section,
    checkListManager,
  } = useJobApplications();

  const checkList = checkListManager.checkList;
  const checkListDisable = checkListManager.disable;
  const handleSearch = async (val: string, signal?: AbortSignal) => {
    try {
      const value = val ? val.trim().toLowerCase() : null;
      const { confirmation, filteredCount } = await handleJobApplicationFilter(
        {
          ...searchParameters,
          search: value,
        },
        signal,
      );
      if (confirmation) setApplicationLimit(filteredCount);
    } catch (e) {
      //do nothing
    }
  };
  return (
    <Stack style={{ display: job.count[section] === 0 ? 'none' : 'flex' }}>
      <>
        {checkList.size > 0 ? (
          <Stack style={{ backgroundColor: 'white' }}>
            <Stack
              style={{
                opacity: checkListDisable ? 0.5 : 1,
                pointerEvents: checkListDisable ? 'none' : 'auto',
              }}
            >
              {checkList.size > 0 && (
                <ActionBar applicationLimit={applicationLimit} />
              )}
            </Stack>
          </Stack>
        ) : (
          <></>
        )}
      </>
      <>
        {checkList.size === 0 ? (
          <JobDetailsFilterBlock
            onclickAllApplicants={{ onClick: () => setDetailedView(true) }}
            onclickTopApplicants={{
              onClick: () => {
                setDetailedView(false);
                posthog.capture('Expanded Analysis clicked');
              },
            }}
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
      </>
    </Stack>
  );
};

const AddCandidates = () => {
  const { setOpenImportCandidates, openImportCandidates } =
    useJobApplications();
  return (
    <Dialog
      open={openImportCandidates}
      onClose={() => setOpenImportCandidates(false)}
      maxWidth='md'
    >
      <ImportCandidates
        slotAddManually={<ImportManualCandidates />}
        isImportDescVisible={false}
        isListingCountVisible={true}
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
  );
};

const NewJobDetailsTabs = () => {
  const { job, section, setSection, setCheckListManager } =
    useJobApplications();
  const count = job.count;

  const handleSetSection = (section) => {
    setSection(section);
    setCheckListManager((prev) => ({ ...prev, checkList: new Set() }));
  };
  return (
    <JobDetailsTabs
      isNewSelected={section === JobApplicationSections.NEW}
      countNew={count.new}
      onClickNew={{
        onClick: () => handleSetSection(JobApplicationSections.NEW),
      }}
      isAssessmentSelected={section === JobApplicationSections.ASSESSMENT}
      countAssessment={count.assessment}
      isAssessmentVisible={job.assessment}
      onClickAssessment={{
        onClick: () => handleSetSection(JobApplicationSections.ASSESSMENT),
      }}
      isScreeningSelected={section === JobApplicationSections.SCREENING}
      countScreening={count.screening}
      onClickScreening={{
        onClick: () => handleSetSection(JobApplicationSections.SCREENING),
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
  handleSelectCurrentApplication,
  currentApplication,
}: {
  detailedView: boolean;
  applications: JobApplication[];
  // eslint-disable-next-line no-unused-vars
  handleSelectCurrentApplication: (id: number) => void;
  currentApplication: number;
}) => {
  const {
    allApplicationDisable,
    showInterview,
    checkListManager,
    setCheckListManager,
  } = useJobApplications();
  const { pressed } = useKeyPress('Shift');
  const [lastPressed, setLastPressed] = useState(null);

  const checkList = checkListManager.checkList;
  const checkListDisable = checkListManager.disable;

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
    setCheckListManager((prev) => {
      const newSet = new Set(prev.checkList);
      const id = applications[index].id;
      if (newSet.has(id)) {
        newSet.delete(id);
        setLastPressed(null);
      } else {
        newSet.add(id);
        setLastPressed(id);
      }
      return { ...prev, checkList: newSet };
    });
  };

  const handleSelect = (index: number) => {
    if (!checkListDisable) {
      if (!pressed) {
        handleSingleSelect(index);
      } else {
        if (lastPressed && !checkList.has(applications[index].id)) {
          const start = applications.findIndex(
            (application) => application.id === lastPressed,
          );
          setCheckListManager((prev) => {
            const newSet = applications.reduce((acc, curr, i) => {
              if ((i - start) * (i - index) <= 0) acc.push(curr.id);
              return acc;
            }, []);
            return {
              ...prev,
              checkList: new Set([...prev.checkList, ...newSet]),
            };
          });
          setLastPressed(null);
        } else {
          handleSingleSelect(index);
        }
      }
    } else {
      toast.warning('Please wait till the ongoing process has finished');
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
            (checkListDisable && checkList.has(application.id)) ||
            allApplicationDisable
              ? { opacity: 0.5, pointerEvent: 'none', transition: '0.5s' }
              : { opacity: 1, pointerEvent: 'auto', transition: '0.5s' };
          return (
            <Stack
              key={application.id}
              style={styles}
              id={`job-application-stack-${i}`}
              ref={currentApplication === i ? scrollToRef : null}
            >
              {/* <Stack ref={i === lastLoad - 1 ? lastApplicationRef : null}> */}
              <ApplicationCard
                detailedView={detailedView}
                application={application}
                index={i}
                handleSelect={handleSelect}
                isInterview={showInterview}
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
            section === JobApplicationSections.ASSESSMENT
              ? 'assessment'
              : section
          }
          slotLottie={<NoApplicants />}
        />
      </Stack>
    </Stack>
  );
};

const ActionBar = ({ applicationLimit }: { applicationLimit: CountJobs }) => {
  const {
    handleUpdateJobStatus,
    job,
    section,
    applications,
    paginationLimit,
    checkListManager,
    setCheckListManager,
  } = useJobApplications();

  const checkList = checkListManager.checkList;
  const checkListDisable = checkListManager.disable;

  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState<JobApplicationSections>(null);

  const [selectAll, setSelectAll] = useState(false);
  const [purpose, setPurpose] = useState<
    JobApplicationEmails['request']['purpose']
  >(getPurpose(destination));

  const handleUpdateJobs = async () => {
    if (!checkListDisable) {
      setOpen(false);
      setCheckListManager((prev) => ({ ...prev, disable: true }));
      await handleUpdateJobStatus(
        {
          source: section,
          destination,
        },
        purpose,
        checkList,
        selectAll,
      );
      setCheckListManager({ checkList: new Set(), disable: false });
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    if (!checkListDisable) {
      setCheckListManager((prev) => ({
        ...prev,
        checkList: new Set(applications[section].map((a) => a.id)),
      }));
      setSelectAll(true);
    } else {
      toast.warning('Please wait till the ongoing process has finished');
    }
  };

  useEffect(() => {
    if (checkList.size !== applications[section].length) setSelectAll(false);
  }, [checkList.size]);

  const isChecked = checkList.size !== 0;
  const showNew = isChecked && section === JobApplicationSections.DISQUALIFIED;
  const showScreening = isChecked && section === JobApplicationSections.NEW;
  const showInterview =
    isChecked &&
    (section === JobApplicationSections.NEW ||
      section === JobApplicationSections.SCREENING) &&
    job.assessment;
  const showQualified =
    isChecked &&
    (section === JobApplicationSections.NEW ||
      section === JobApplicationSections.SCREENING ||
      section === JobApplicationSections.ASSESSMENT);
  const showDisqualified =
    isChecked &&
    (section === JobApplicationSections.NEW ||
      section === JobApplicationSections.SCREENING ||
      section === JobApplicationSections.ASSESSMENT ||
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

  return (
    <>
      <MoveCandidateDialog
        open={open}
        onClose={() => handleClose()}
        destination={destination}
        onSubmit={async () => await handleUpdateJobs()}
        checked={purpose !== null}
        checkAction={async () =>
          setPurpose((prev) => (prev ? null : getPurpose(destination)))
        }
        count={checkList.size}
      />
      <SelectActionBar
        isSendScreeningVisible={section === JobApplicationSections.SCREENING}
        // onclickSendScreening={{
        //   onClick: handleSendBulkPhoneScreeningEmail,
        // }}
        onClickClear={{
          onClick: () =>
            setCheckListManager((prev) => ({
              ...prev,
              checkList: new Set<string>(),
            })),
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
          <>
            <SelectActionsDropdown
              isInterview={showInterview}
              onClickInterview={{
                onClick: () => handleOpen(JobApplicationSections.ASSESSMENT),
              }}
              isQualified={showQualified}
              onClickQualified={{
                onClick: () => handleOpen(JobApplicationSections.QUALIFIED),
              }}
              isDisqualified={showDisqualified}
              onClickDisqualified={{
                onClick: () => handleOpen(JobApplicationSections.DISQUALIFIED),
              }}
              onClickMoveNew={{
                onClick: () => handleOpen(JobApplicationSections.NEW),
              }}
              isMoveNew={showNew}
              onClickScreening={{
                onClick: () => handleOpen(JobApplicationSections.SCREENING),
              }}
              isScreening={showScreening}
            />
          </>
        }
      />
    </>
  );
};

const getPurpose = (
  destination: JobApplicationSections,
): JobApplicationEmails['request']['purpose'] => {
  switch (destination) {
    case JobApplicationSections.NEW:
      return null;
    case JobApplicationSections.ASSESSMENT:
      return 'interview';
    case JobApplicationSections.SCREENING:
      return 'phone_screen';
    case JobApplicationSections.QUALIFIED:
      return null;
    case JobApplicationSections.DISQUALIFIED:
      return 'rejection';
    default:
      return null;
  }
};

export default JobApplicationsDashboard;
