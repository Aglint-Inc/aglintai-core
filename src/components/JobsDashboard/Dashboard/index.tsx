/* eslint-disable security/detect-object-injection */
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { CircularProgress, Dialog, Popover, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
// import posthog from 'posthog-js';
import { useCallback, useState } from 'react';

import {
  // AssistantApplicantCount,
  // AssistantDashboard,
  AssistStatus,
  CloseDeleteJob,
  CloseJobButton,
  CloseJobModal,
  // DashboardMenu,
} from '@/devlink';
import { Breadcrum, PageLayout } from '@/devlink2';
import {
  BannerLoading,
  DarkPill,
  DashboardAlert,
  EnableDisable,
  GraphBlock,
  JobDashboard as JobDashboardDev,
  JobDashboardTopRight,
  ModuleCard,
  NoData,
  PipeLine,
  ScheduleCardSmall,
} from '@/devlink3';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import { useJobDetails } from '@/src/context/JobDashboard';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import NotFoundPage from '@/src/pages/404';
import { Job } from '@/src/queries/job/types';
import { getFullName } from '@/src/utils/jsonResume';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import DashboardBarChart from './BarChart';
import DashboardDoughnutChart from './Doughnut';
import DashboardLineChart from './LineChart';
import TenureAndExpSummary from './TenureAndExpSummary';
import Loader from '../../Common/Loader';
import AssessmentIcon from '../../Common/ModuleIcons/assessmentIcon';
import ProfileScoreIcon from '../../Common/ModuleIcons/profileScoreIcon';
// import EmailTemplateIcon from '../../Common/ModuleIcons/emailTemplateIcon';
import SchedulingIcon from '../../Common/ModuleIcons/schedulingIcon';
import ScreeningIcon from '../../Common/ModuleIcons/screeningIcon';
import MuiAvatar from '../../Common/MuiAvatar';
import UITextField from '../../Common/UITextField';
import { AddCandidates } from '../../JobApplicationsDashboard';
import PublishButton from '../../publishButton';
import IconScheduleType from '../../Scheduling/AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../Scheduling/AllSchedules/utils';

const JobDashboard = () => {
  const { initialLoad, job } = useJobDetails();

  return initialLoad ? (
    job !== undefined ? (
      <Dashboard />
    ) : (
      <NotFoundPage />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

const getMatches = (
  counts: ReturnType<typeof useJobDetails>['matches']['data'],
) => {
  return Object.entries(counts.matches).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        count: getPlural(value, 'candidate'),
        percentage: `${value ? Math.trunc((value / counts.total) * 100) : 0}%`,
      };
      return acc;
    },
    {} as {
      // eslint-disable-next-line no-unused-vars
      [id in keyof typeof counts.matches]: {
        count: number;
        percentage: string;
      };
    },
  );
};

const Dashboard = () => {
  const {
    job,
    matches: { data: counts },
    schedules: { data: schedule },
    publishStatus: { settingsValidity, publishable, loading },
  } = useJobDetails();
  const { push } = useRouter();
  const { handleJobAsyncUpdate, handleJobDelete, handleJobPublish } = useJobs();
  const { handleJobApplicationRescore } = useJobApplications();

  const score_matches = getMatches(counts);

  const [openImportCandidates, setOpenImportCandidates] = useState(false);
  const [popover, setPopover] = useState(false);

  const handleCloseJob = useCallback(async () => {
    return await handleJobAsyncUpdate(job.id, { status: 'closed' });
  }, [job.id]);
  const handleDeleteJob = useCallback(() => {
    push(`${pageRoutes.JOBS}?status=${job?.status ?? 'all'}`);
    handleJobDelete(job.id);
  }, [job.id]);

  const handleSubmit = useCallback(async () => {
    switch (job.status) {
      case 'draft':
        handleDeleteJob();
        break;
      case 'published':
        {
          const { data } = await handleCloseJob();
          if (data) toast.success('Job closed successfully');
        }
        break;
      case 'closed':
        handleDeleteJob();
        break;
    }
  }, [job.status]);

  const handlePublish = async () => {
    if (publishable) {
      const response = await handleJobPublish(job);
      if (response) await handleJobApplicationRescore();
      return response;
    } else {
      if (loading)
        toast.warning(
          'Generating profile score criteria. Please wait to publish.',
        );
      else toast.error('Unable to publish. Please check job details.');
    }
  };

  return (
    <>
      <AddCandidates
        openImportCandidates={openImportCandidates}
        setOpenImportCandidates={setOpenImportCandidates}
      />
      <PageLayout
        slotBody={
          <JobDashboardDev
            isBanner={!publishable}
            isImport={job?.status !== 'closed'}
            onClickImport={{ onClick: () => setOpenImportCandidates(true) }}
            slotBanner={<Banners />}
            textTopMatchPercentage={score_matches.topMatch.percentage}
            textTopMatchCount={score_matches.topMatch.count}
            textGoodMatchPercentage={score_matches.goodMatch.percentage}
            textGoodMatchCount={score_matches.goodMatch.count}
            textAverageMatchPercentage={score_matches.averageMatch.percentage}
            textAveageMatchCount={score_matches.averageMatch.count}
            textBelowAveragePercentage={score_matches.poorMatch.percentage}
            textBelowAverageCount={score_matches.poorMatch.count}
            textNotAMatchPercentage={score_matches.noMatch.percentage}
            textNotAMatchCount={score_matches.noMatch.count}
            slotLocationGraphBlock={<Doughnut />}
            slotExperienceGraph={<LineGraph />}
            slotSkillGraphBlock={<Bars />}
            slotPipeline={<Pipeline />}
            slotModuleCard={<Modules />}
            slotCardWithNumber={<TenureAndExpSummary />}
            isViewScheduleVisible={schedule.length > 3}
            onClickViewSchedule={{
              onClick: () => push(`/scheduling?tab=mySchedules`),
            }}
            slotScheduleCardSmall={<Schedules />}
            textCandidateCount={counts.total}
            onClickAssistant={{
              onClick: () => push(`/jobs/${job.id}/agent`),
            }}
          />
        }
        slotTopbarLeft={<BreadCrumbs />}
        slotTopbarRight={
          <JobDashboardTopRight
            slotJobStatus={
              <AssistStatus
                isCloseVisible={job?.status === 'closed'}
                isDraftVisible={job?.status === 'draft'}
                isPublishedVisible={job?.status === 'published'}
              />
            }
            slotPublishButton={
              <PublishButton onClick={async () => await handlePublish()} />
            }
            isPublish={job.status !== 'closed'}
            isEditError={!settingsValidity}
            onClickEdit={{ onClick: () => push(`/jobs/${job.id}/edit`) }}
            slotCloseJobButton={
              <>
                <CloseJobButton
                  onClickClose={{
                    onClick: () => {
                      setPopover(true);
                    },
                  }}
                />
                <JobClose
                  popover={popover}
                  onClose={() => setPopover(false)}
                  onSubmit={() => handleSubmit()}
                />
              </>
            }
          />
        }
      />
    </>
  );
};

export default JobDashboard;

const BreadCrumbs = () => {
  const router = useRouter();
  const { job } = useJobDetails();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum textName={capitalize(job?.job_title ?? 'Job')} showArrow />
      <Preview />
    </>
  );
};

const Preview = () => {
  const { job } = useJobDetails();
  const handlePreview = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${job?.id}`,
      '_blank',
    );
  };
  if (job?.status === 'closed') return <></>;
  return (
    <Stack
      mx={1}
      gap={'2px'}
      direction={'row'}
      style={{ color: palette.blue['400'], cursor: 'pointer' }}
      onClick={() => handlePreview()}
    >
      <Stack>Preview</Stack>
      <OpenInNewIcon
        fontSize='small'
        style={{ aspectRatio: 1, width: '10px', transform: 'translateY(1px)' }}
      />
    </Stack>
  );
};

const Pipeline = () => {
  const { job } = useJobDetails();
  const { setSection } = useJobApplications();
  const { push } = useRouter();

  const newSections = Object.entries(job.count).reduce(
    (acc, [key, value]) => {
      acc[key] = { count: value, label: getPlural(value, 'candidate') };
      return acc;
    },
    // eslint-disable-next-line no-unused-vars
    {} as { [id in keyof Job['count']]: { count: number; label: string } },
  );
  const handlClick = (section: JobApplicationSections) => {
    setSection(section);
    push(`/jobs/${job.id}/candidate-list`);
  };
  return (
    <>
      <PipeLine
        isLeft={false}
        textCandidateCount={newSections.new.label}
        textName={capitalize(JobApplicationSections.NEW)}
        onClickPipeline={{
          onClick: () => handlClick(JobApplicationSections.NEW),
        }}
      />
      {job.phone_screen_enabled && (
        <PipeLine
          textCandidateCount={newSections.screening.label}
          textName={capitalize(JobApplicationSections.SCREENING)}
          onClickPipeline={{
            onClick: () => handlClick(JobApplicationSections.SCREENING),
          }}
        />
      )}
      {job.assessment && (
        <PipeLine
          textCandidateCount={newSections.assessment.label}
          textName={capitalize(JobApplicationSections.ASSESSMENT)}
          onClickPipeline={{
            onClick: () => handlClick(JobApplicationSections.ASSESSMENT),
          }}
        />
      )}
      <PipeLine
        textCandidateCount={newSections.interview.label}
        textName={capitalize(JobApplicationSections.INTERVIEW)}
        onClickPipeline={{
          onClick: () => handlClick(JobApplicationSections.INTERVIEW),
        }}
      />
      <PipeLine
        textCandidateCount={newSections.qualified.label}
        textName={capitalize(JobApplicationSections.QUALIFIED)}
        onClickPipeline={{
          onClick: () => handlClick(JobApplicationSections.QUALIFIED),
        }}
      />
      <PipeLine
        isRight={false}
        textCandidateCount={newSections.disqualified.label}
        textName={capitalize(JobApplicationSections.DISQUALIFIED)}
        onClickPipeline={{
          onClick: () => handlClick(JobApplicationSections.DISQUALIFIED),
        }}
      />
    </>
  );
};

const Schedules = () => {
  const {
    schedules: { data },
  } = useJobDetails();
  if (data.length === 0) return <NoData />;
  const cards = data
    .sort(
      (a, b) =>
        (dayjs(a.interview_meeting.start_time) as any) -
        (dayjs(b.interview_meeting.start_time) as any),
    )
    .slice(0, 3)
    .map((sch, i) => (
      <ScheduleCardSmall
        key={i}
        slotCandidatePic={
          <MuiAvatar
            key={sch.candidates.id}
            src={sch.candidates.avatar}
            level={getFullName(
              sch.candidates.first_name,
              sch.candidates.last_name,
            )}
            variant='circular'
            height='28px'
            width='28px'
            fontSize='12px'
          />
        }
        textDate={dayjs(sch.interview_meeting.end_time).format('DD')}
        textDay={dayjs(sch.interview_meeting.end_time).format('dddd')}
        textMonth={dayjs(sch.interview_meeting.end_time).format('MMM')}
        textPlatformName={getScheduleType(sch.schedule.schedule_type)}
        textScheduleName={sch.schedule.schedule_name}
        textTimeRange={`${dayjs(sch.interview_meeting.start_time).format(
          'hh:mm A',
        )} - ${dayjs(sch.interview_meeting.end_time).format('hh:mm A')} ( ${
          sch.interview_meeting.duration
        } Minutes )`}
        slotPlatformLogo={
          <IconScheduleType type={sch.schedule.schedule_type} />
        }
        textCandidateName={getFullName(
          sch.candidates.first_name,
          sch.candidates.last_name,
        )}
      />
    ));
  return <>{cards}</>;
};

const Banners = () => {
  const { publishStatus } = useJobDetails();
  if (!publishStatus.settingsValidity)
    return (
      <DashboardAlert
        textTitile={'Job details are incomplete'}
        textShortDescription={
          'To proceed, please ensure that all job details are provided correctly'
        }
      />
    );
  if (publishStatus.loading)
    return (
      <BannerLoading
        slotLoader={
          <CircularProgress
            color='inherit'
            size={'100%'}
            sx={{ color: palette.grey[400] }}
          />
        }
      />
    );
  if (!publishStatus.jdValidity)
    return (
      <DashboardAlert
        textTitile={'Profile score is empty'}
        textShortDescription={
          'To proceed , please ensure that profile score is provided'
        }
      />
    );
  return <></>;
};

const JobClose = ({
  popover,
  onClose,
  onSubmit,
}: {
  popover: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const {
    job: { job_title, location, status },
  } = useJobDetails();
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState('');
  const handleClose = () => {
    setModal(false);
    setTimeout(() => setValue(''), 400);
  };
  const openModal = () => {
    onClose();
    setModal(true);
  };
  const handleSubmit = () => {
    handleClose();
    onSubmit();
  };
  const isDelete = status !== 'published';
  return (
    <>
      <Popover
        open={popover}
        onClose={() => onClose()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            border: 'none !important',
            overflow: 'visible !important',
            top: '62px !important',
          },
        }}
      >
        <CloseDeleteJob
          onClickClose={{ onClick: () => openModal() }}
          isCloseJobVisible={!isDelete}
          isDeleteJobVisible={isDelete}
        />
      </Popover>
      <Dialog open={modal} onClose={() => handleClose()}>
        <CloseJobModal
          textPopupTitle={`${isDelete ? 'Delete' : 'Close'} Job Confirmation`}
          textWarning={
            isDelete
              ? 'By deleting this job, it will no longer be accessible, and the data related to this job will be permanently deleted.'
              : 'Closing this job will unpublish it, preventing candidates from applying or being imported. Additionally, the screening and assessment processes for this job will be stopped.'
          }
          textButton={isDelete ? 'Delete Job' : 'Close Job'}
          textJobTitle={job_title.trim()}
          onClickCancel={{ onClick: () => handleClose() }}
          onClickCloseJob={{ onClick: () => handleSubmit() }}
          textLocation={location}
          isDisabled={job_title.trim() !== value.trim()}
          slotInput={
            <UITextField
              placeholder={job_title.trim()}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          }
        />
      </Dialog>
    </>
  );
};

const Modules = () => {
  const isNewAssessmentEnabled = posthog.isFeatureEnabled(
    'isNewAssessmentEnabled',
  );
  const isSchedulingEnabled = posthog.isFeatureEnabled('isSchedulingEnabled');
  const isPhoneScreeningEnabled = posthog.isFeatureEnabled(
    'isPhoneScreeningEnabled',
  );

  return (
    <>
      {isSchedulingEnabled && <InterviewModule />}
      {isNewAssessmentEnabled && <AssessmentModule />}
      <ProfileScoreModule />
      {isPhoneScreeningEnabled && <ScreeningModule />}
    </>
  );
};

const AssessmentModule = () => {
  const { job } = useJobDetails();
  const { push } = useRouter();
  const handleClick = () => {
    push(`/jobs/${job.id}/assessment`);
  };
  return (
    <ModuleCard
      onClickCard={{ onClick: () => handleClick() }}
      textName={'Assessment'}
      slotIcon={<AssessmentIcon />}
      slotEnableDisable={<EnableDisable isEnabled={job.assessment} />}
    />
  );
};

export type DashboardGraphOptions<
  T extends keyof Pick<
    ReturnType<typeof useJobDetails>,
    'assessments' | 'locations' | 'matches' | 'skills' | 'tenureAndExperience'
  >,
> = {
  // eslint-disable-next-line no-unused-vars
  [id in keyof ReturnType<typeof useJobDetails>[T]['data']]: string;
};

const Doughnut = () => {
  const options: DashboardGraphOptions<'locations'> = {
    city: 'City',
    state: 'State',
    country: 'Country',
  };
  const [selection, setSelection] = useState<keyof typeof options>('city');
  const pills = Object.entries(options).map(([key, value]) => (
    <DarkPill
      key={key}
      isActive={selection === key}
      textPill={value}
      onClickPill={{
        onClick: () => setSelection(key as keyof typeof options),
      }}
    />
  ));
  return (
    <GraphBlock
      slotLocationGraph={<DashboardDoughnutChart option={selection} />}
      slotDarkPillLocation={pills}
    />
  );
};

const LineGraph = () => {
  const options: {
    // eslint-disable-next-line no-unused-vars
    [id in keyof Pick<
      DashboardGraphOptions<'tenureAndExperience'>,
      'experience' | 'tenure'
    >]: string;
  } = {
    experience: 'Experience',
    tenure: 'Tenure',
  };
  const [selection, setSelection] =
    useState<keyof typeof options>('experience');
  const pills = Object.entries(options).map(([key, value]) => (
    <DarkPill
      key={key}
      isActive={selection === key}
      textPill={value}
      onClickPill={{
        onClick: () => setSelection(key as keyof typeof options),
      }}
    />
  ));
  return (
    <GraphBlock
      slotLocationGraph={<DashboardLineChart option={selection} />}
      slotDarkPillLocation={pills}
    />
  );
};

const Bars = () => {
  const options: DashboardGraphOptions<'skills'> = {
    top_skills: 'Top skills',
    required_skills: 'Skills mentioned in JD',
  };
  const [selection, setSelection] =
    useState<keyof typeof options>('top_skills');
  const pills = Object.entries(options).map(([key, value]) => (
    <DarkPill
      key={key}
      isActive={selection === key}
      textPill={value}
      onClickPill={{
        onClick: () => setSelection(key as keyof typeof options),
      }}
    />
  ));
  return (
    <GraphBlock
      slotLocationGraph={<DashboardBarChart option={selection} />}
      slotDarkPillLocation={pills}
    />
  );
};

const getPlural = (count: number, label: string) => {
  return `${count} ${capitalize(label)}${count === 1 ? '' : 's'}`;
};

const ScreeningModule = () => {
  const { job } = useJobDetails();
  const { push } = useRouter();

  const handleClick = () => {
    push(`/jobs/${job.id}/screening`);
  };
  return (
    <ModuleCard
      onClickCard={{ onClick: () => handleClick() }}
      textName={'Screening'}
      slotIcon={<ScreeningIcon />}
      slotEnableDisable={<EnableDisable isEnabled={job.phone_screen_enabled} />}
    />
  );
};

const InterviewModule = () => {
  const { job } = useJobDetails();
  const { push } = useRouter();
  const handleClick = () => {
    push(`/jobs/${job.id}/interview-plan`);
  };
  return (
    <ModuleCard
      onClickCard={{ onClick: () => handleClick() }}
      textName={'Interview Plan'}
      slotIcon={<SchedulingIcon />}
      slotEnableDisable={<></>}
    />
  );
};

const ProfileScoreModule = () => {
  const { job, status } = useJobDetails();
  const { push } = useRouter();
  const handleClick = () => {
    push(`/jobs/${job.id}/profile-score`);
  };
  const isAlert = status.jd_json_error;
  const isWarning =
    !isAlert && (status.description_changed || status.description_error);
  return (
    <ModuleCard
      onClickCard={{ onClick: () => handleClick() }}
      isWarning={isWarning}
      isAlert={isAlert}
      textName={'Profile Score'}
      slotIcon={<ProfileScoreIcon />}
      slotEnableDisable={
        <>
          {status.loading && (
            <CircularProgress
              color='inherit'
              size={'15px'}
              sx={{ color: palette.grey[400] }}
            />
          )}
        </>
      }
    />
  );
};
