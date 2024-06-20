/* eslint-disable security/detect-object-injection */
import { CircularProgress, Dialog, Popover, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useMemo, useState } from 'react';

import { AssistStatus } from '@/devlink/AssistStatus';
import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CloseDeleteJob } from '@/devlink/CloseDeleteJob';
import { CloseJobModal } from '@/devlink/CloseJobModal';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { AddCandidateButton } from '@/devlink3/AddCandidateButton';
import { BannerLoading } from '@/devlink3/BannerLoading';
import { DarkPill } from '@/devlink3/DarkPill';
import { DashboardAlert } from '@/devlink3/DashboardAlert';
import { DashboardWarning } from '@/devlink3/DashboardWarning';
import { EnableDisable } from '@/devlink3/EnableDisable';
import { GraphBlock } from '@/devlink3/GraphBlock';
import { JobDashboard as JobDashboardDev } from '@/devlink3/JobDashboard';
import { JobDashboardTopRight } from '@/devlink3/JobDashboardTopRight';
import { JobRole } from '@/devlink3/JobRole';
import { JobsBanner } from '@/devlink3/JobsBanner';
import { ModuleCard } from '@/devlink3/ModuleCard';
import { NoData } from '@/devlink3/NoData';
import { PipeLine } from '@/devlink3/PipeLine';
import { RoleList } from '@/devlink3/RoleList';
import { ScheduleCardSmall } from '@/devlink3/ScheduleCardSmall';
import { ScoreSetting } from '@/devlink3/ScoreSetting';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import { useJob } from '@/src/context/JobContext';
import { useJobDetails } from '@/src/context/JobDashboard';
import { useJobDashboardStore } from '@/src/context/JobDashboard/store';
import { useJobs } from '@/src/context/JobsContext';
import NotFoundPage from '@/src/pages/404';
import { useCompanyMembers } from '@/src/queries/company-members';
import { Job } from '@/src/queries/jobs/types';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import Loader from '../../Common/Loader';
import AssessmentIcon from '../../Common/ModuleIcons/assessmentIcon';
import EmailTemplateIcon from '../../Common/ModuleIcons/emailTemplateIcon';
import HiringTeamIcon from '../../Common/ModuleIcons/hiringTeamIcon';
import JobDetailsIcon from '../../Common/ModuleIcons/jobDetailsIcon';
import ProfileScoreIcon from '../../Common/ModuleIcons/profileScoreIcon';
import SchedulingIcon from '../../Common/ModuleIcons/schedulingIcon';
import ScreeningIcon from '../../Common/ModuleIcons/screeningIcon';
import WorkflowIcon from '../../Common/ModuleIcons/workflowIcon';
import MuiAvatar from '../../Common/MuiAvatar';
import UITextField from '../../Common/UITextField';
import { capitalize } from '../../JobApplicationsDashboard/utils';
import { UploadApplications } from '../../JobNewApplications/ui/uploadApplications';
import PublishButton from '../../publishButton';
import IconScheduleType from '../../Scheduling/Candidates/ListCard/Icon';
import { getScheduleType } from '../../Scheduling/Candidates/utils';
import DashboardBarChart from './BarChart';
import DashboardDoughnutChart from './Doughnut';
import DashboardLineChart from './LineChart';
import TenureAndExpSummary from './TenureAndExpSummary';

const JobDashboard = () => {
  const { loadStatus } = useJobDetails();
  switch (loadStatus) {
    case 'loading':
      return (
        <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
          <Loader />
        </Stack>
      );
    case 'error':
      return <NotFoundPage />;
    case 'success':
      return <Dashboard />;
  }
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
  const { job, applicationScoringPollEnabled } = useJob();
  const {
    matches: { data: counts },
    schedules: { data: schedule },
    status: { description_changed, scoring_criteria_changed },
    publishStatus: {
      publishable,
      loading,
      detailsValidity,
      hiringTeamValidity,
    },
  } = useJobDetails();
  const { push } = useRouter();
  const { handleJobAsyncUpdate, handleJobDelete, handleJobPublish } = useJobs();

  const { setImportPopup, setFilters } = useApplicationsStore(
    ({ setImportPopup, setFilters }) => ({ setImportPopup, setFilters }),
  );

  const score_matches = getMatches(counts);
  const [popover, setPopover] = useState(false);

  const canPublish =
    job.status === 'draft' || description_changed || scoring_criteria_changed;

  const handleCloseJob = useCallback(async () => {
    return await handleJobAsyncUpdate(job.id, { status: 'closed' });
  }, [job.id]);
  const handleDeleteJob = useCallback(() => {
    push(`${ROUTES['/jobs']()}?status=${job?.status ?? 'all'}`);
    handleJobDelete(job.id);
  }, [job.id]);

  const handleSubmit = useCallback(async () => {
    switch (job.status) {
      case 'draft':
        handleDeleteJob();
        break;
      case 'published':
        {
          await handleCloseJob();
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
      if (response && scoring_criteria_changed) {
        //await handleJobApplicationRescore();
      }
      return response;
    } else {
      if (loading)
        toast.warning(
          'Generating profile score criteria. Please wait before publishing.',
        );
      else {
        if (!detailsValidity.validity || !hiringTeamValidity.validity) {
          if (!detailsValidity.validity) toast.error(detailsValidity.message);
          if (!hiringTeamValidity.validity)
            toast.error(hiringTeamValidity.message);
        } else {
          toast.error('Unable to publish. Please verify the job details.');
        }
      }
    }
  };

  const publishButton = useMemo(
    () => (
      <PublishButton
        onClick={async () => await handlePublish()}
        disabled={!canPublish}
      />
    ),
    [canPublish],
  );

  const scoringLoader = useMemo(
    () => (
      <Stack sx={{ width: '12px', aspectRatio: 1 }}>
        <CircularProgress
          color='inherit'
          size={'100%'}
          sx={{ color: 'var(--white)' }}
        />
      </Stack>
    ),
    [],
  );

  const handleFilter = (
    resume_score: Parameters<typeof setFilters>[0]['resume_score'][number],
  ) => {
    setFilters({ resume_score: [resume_score] });
    push(`/jobs/${job.id}/candidate-list`);
  };

  const banners = useBanners({ publishButton });

  return (
    <>
      <UploadApplications />
      <PageLayout
        slotBody={
          <JobDashboardDev
            isBanner={banners.length !== 0}
            slotBanner={
              <Stack gap={1}>
                {banners.map((banner, i) => (
                  <Fragment key={i}>{banner}</Fragment>
                ))}
              </Stack>
            }
            onClickTopMatch={{
              style: { cursor: 'pointer' },
              onClick: () => handleFilter('Top match'),
            }}
            textTopMatchPercentage={score_matches.topMatch.percentage}
            textTopMatchCount={score_matches.topMatch.count}
            onClickGoodMatch={{
              style: { cursor: 'pointer' },
              onClick: () => handleFilter('Good match'),
            }}
            textGoodMatchPercentage={score_matches.goodMatch.percentage}
            textGoodMatchCount={score_matches.goodMatch.count}
            onClickAverageMatch={{
              style: { cursor: 'pointer' },
              onClick: () => handleFilter('Average match'),
            }}
            textAverageMatchPercentage={score_matches.averageMatch.percentage}
            textAveageMatchCount={score_matches.averageMatch.count}
            onClickBelowAverage={{
              style: { cursor: 'pointer' },
              onClick: () => handleFilter('Poor match'),
            }}
            textBelowAveragePercentage={score_matches.poorMatch.percentage}
            textBelowAverageCount={score_matches.poorMatch.count}
            onClickNotaMatch={{
              style: { cursor: 'pointer' },
              onClick: () => handleFilter('Not a match'),
            }}
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
            // textCandidateCount={counts.total}
            onClickAssistant={{
              onClick: () => push(`/jobs/${job.id}/agent`),
            }}
            slotJobRole={<Roles />}
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
            slotAddCandidateButton={
              <>
                {applicationScoringPollEnabled && (
                  <ScoreSetting
                    textScoreCount={`${
                      job?.processing_count?.success ?? '---'
                    }/${counts?.total ?? '---'}`}
                    slotScoringLoader={scoringLoader}
                  />
                )}
                <AddCandidateButton
                  isImport={job?.status !== 'closed'}
                  onClickImport={{
                    onClick: () => setImportPopup(true),
                  }}
                />
              </>
            }
            slotPublishButton={publishButton}
            isPublish={job.status !== 'closed'}
            // isEditError={!settingsValidity.validity}
            // onClickEdit={{ onClick: () => push(`/jobs/${job.id}/edit`) }}
            slotCloseJobButton={
              <>
                <IconButtonGhost
                  color={'neutral'}
                  iconSize={4}
                  iconName='more_vert'
                  onClickButton={{
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

const Roles = () => {
  const { push } = useRouter();
  const { job } = useJobDetails();
  const { data, status } = useCompanyMembers();
  const { hiring_manager, recruiter, recruiting_coordinator, sourcer } = job;
  const coordinatorsData = {
    hiring_manager,
    recruiter,
    recruiting_coordinator,
    sourcer,
  };
  const coordinators = useMemo(() => {
    return (
      Object.entries(coordinatorsData)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, value]) => value)
        .reduce((acc, [key, value]) => {
          const user = (data ?? []).find(({ user_id }) => user_id === value);
          if (user) {
            const name = getFullName(
              user?.first_name ?? null,
              user?.last_name ?? null,
            );
            acc.push(
              <RoleList
                slotImage={
                  <MuiAvatar
                    src={user?.profile_image ?? null}
                    level={name}
                    variant='rounded-medium'
                  />
                }
                textDesignation={user?.position ?? '--'}
                textName={name}
                textRoleHeader={capitalizeAll(key)}
              />,
            );
          }
          return acc;
        }, [])
    );
  }, [
    status,
    job,
    hiring_manager,
    recruiter,
    recruiting_coordinator,
    sourcer,
    data,
  ]);
  if (status !== 'success' || coordinators.length === 0) return <></>;
  return (
    <JobRole
      onClickEdit={{
        onClick: () => push(ROUTES['/jobs/[id]/hiring-team']({ id: job?.id })),
      }}
      slotRoleList={coordinators}
    />
  );
};

const BreadCrumbs = () => {
  const router = useRouter();
  const {
    job,
    matches: { data: counts },
  } = useJobDetails();
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
      <Breadcrum
        textName={`${capitalize(job?.job_title ?? 'Job')} (${counts.total})`}
        showArrow
      />
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
    <ButtonGhost
      size={'2'}
      iconColor={'var(--info-11)'}
      iconSize={'4'}
      isRightIcon={true}
      isLeftIcon={false}
      textButton={'Preview'}
      iconName={'open_in_new'}
      onClickButton={{
        onClick: handlePreview,
      }}
    />
  );
};

const Pipeline = () => {
  const { job } = useJobDetails();
  const { push } = useRouter();
  const setSection = useApplicationsStore(({ setSection }) => setSection);
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
      {job.activeSections.includes(JobApplicationSections.SCREENING) && (
        <PipeLine
          textCandidateCount={newSections.screening.label}
          textName={capitalize(JobApplicationSections.SCREENING)}
          onClickPipeline={{
            onClick: () => handlClick(JobApplicationSections.SCREENING),
          }}
        />
      )}
      {job.activeSections.includes(JobApplicationSections.ASSESSMENT) && (
        <PipeLine
          textCandidateCount={newSections.assessment.label}
          textName={capitalize(JobApplicationSections.ASSESSMENT)}
          onClickPipeline={{
            onClick: () => handlClick(JobApplicationSections.ASSESSMENT),
          }}
        />
      )}
      {job.activeSections.includes(JobApplicationSections.INTERVIEW) && (
        <PipeLine
          textCandidateCount={newSections.interview.label}
          textName={capitalize(JobApplicationSections.INTERVIEW)}
          onClickPipeline={{
            onClick: () => handlClick(JobApplicationSections.INTERVIEW),
          }}
        />
      )}
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
  const { push } = useRouter();
  if (data.length === 0) return <NoData />;
  const cards = data
    .sort(
      (a, b) =>
        (dayjs(a.interview_meeting.start_time) as any) -
        (dayjs(b.interview_meeting.start_time) as any),
    )
    .slice(0, 3)
    .map((sch, i) => (
      <Stack
        key={i}
        onClick={() =>
          push(
            `/scheduling/view?meeting_id=${sch.interview_meeting.id}&tab=candidate_details`,
          )
        }
      >
        <ScheduleCardSmall
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
          textPlatformName={getScheduleType(
            sch.interview_session.schedule_type,
          )}
          textScheduleName={sch.interview_session.name}
          textTimeRange={`${dayjs(sch.interview_meeting.start_time).format(
            'hh:mm A',
          )} - ${dayjs(sch.interview_meeting.end_time).format('hh:mm A')}`}
          slotPlatformLogo={
            <IconScheduleType type={sch.interview_session.schedule_type} />
          }
          textCandidateName={getFullName(
            sch.candidates.first_name,
            sch.candidates.last_name,
          )}
        />
      </Stack>
    ));
  return (
    <Stack width={'100%'} height={'100%'} gap={2}>
      {cards}
    </Stack>
  );
};

const useBanners = ({
  publishButton,
}: {
  publishButton: React.JSX.Element;
}) => {
  const { push } = useRouter();
  const {
    publishStatus,
    status,
    job,
    isInterviewPlanDisabled,
    isInterviewSessionEmpty,
  } = useJobDetails();
  const { dismissWarnings, setDismissWarnings } = useJobDashboardStore(
    ({ dismissWarnings, setDismissWarnings }) => ({
      dismissWarnings,
      setDismissWarnings,
    }),
  );
  const banners: React.JSX.Element[] = [];
  if (job.status === 'draft')
    banners.push(<JobsBanner slotButton={publishButton} />);
  if (isInterviewPlanDisabled && !dismissWarnings.interview_plan)
    banners.push(
      <DashboardWarning
        textWarningTitle={'Interview plan not set'}
        textDesc={
          'To use the scheduling module, please configure an interview plan for this job.'
        }
        slotButton={
          <>
            <ButtonSoft
              textButton='Ignore'
              size={2}
              color={'accent'}
              highContrast={'true'}
              onClickButton={{
                onClick: () => setDismissWarnings({ interview_plan: true }),
              }}
            />

            <ButtonSolid
              textButton='View'
              size={2}
              color={'accent'}
              highContrast={'true'}
              onClickButton={{
                onClick: () => push(`/jobs/${job.id}/interview-plan`),
              }}
            />
          </>
        }
      />,
    );
  if (isInterviewSessionEmpty && !dismissWarnings.interview_session)
    banners.push(
      <DashboardWarning
        textWarningTitle={'Interview sessions not set'}
        textDesc={
          'To use the scheduling module, please create atleast one interview session for the plan.'
        }
        slotButton={
          <>
            <ButtonSoft
              textButton='Ignore'
              size={2}
              color={'accent'}
              highContrast={'true'}
              onClickButton={{
                onClick: () => setDismissWarnings({ interview_session: true }),
              }}
            />

            <ButtonSolid
              textButton='View'
              size={2}
              color={'accent'}
              highContrast={'true'}
              onClickButton={{
                onClick: () => push(`/jobs/${job.id}/interview-plan`),
              }}
            />
          </>
        }
      />,
    );
  if (
    !publishStatus.detailsValidity.validity ||
    !publishStatus.hiringTeamValidity.validity
  ) {
    if (!publishStatus.detailsValidity.validity) {
      banners.push(
        <DashboardAlert
          textTitile={publishStatus.detailsValidity.message}
          textShortDescription={
            'Please ensure that valid job details are provided.'
          }
          onClickBanner={{
            onClick: () =>
              push(ROUTES['/jobs/[id]/job-details']({ id: job?.id })),
          }}
          slotViewButton={
            <ButtonSolid
              size={2}
              color={'accent'}
              textButton='View'
              highContrast='true'
              onClickButton={{
                onClick: () =>
                  push(ROUTES['/jobs/[id]/job-details']({ id: job?.id })),
              }}
            />
          }
        />,
      );
    }
    if (!publishStatus.hiringTeamValidity.validity) {
      banners.push(
        <DashboardAlert
          textTitile={publishStatus.hiringTeamValidity.message}
          textShortDescription={
            'Please ensure that necessary hiring members are selected.'
          }
          onClickBanner={{
            onClick: () =>
              push(ROUTES['/jobs/[id]/hiring-team']({ id: job?.id })),
          }}
          slotViewButton={
            <ButtonSolid
              size={2}
              color={'accent'}
              textButton='View'
              highContrast='true'
              onClickButton={{
                onClick: () =>
                  push(ROUTES['/jobs/[id]/hiring-team']({ id: job?.id })),
              }}
            />
          }
        />,
      );
    }
  } else if (publishStatus.loading)
    banners.push(
      <BannerLoading
        slotLoader={
          <CircularProgress
            color='inherit'
            size={'100%'}
            sx={{ color: 'var(--neutral-6)' }}
          />
        }
      />,
    );
  else if (!publishStatus.jdValidity)
    banners.push(
      <DashboardAlert
        textTitile={'Profile score is empty'}
        textShortDescription={
          'Candidates cannot be scored without scoring criterias. Please ensure that valid scoring criterias are provided.'
        }
        onClickBanner={{
          onClick: () => push(`/jobs/${job.id}/profile-score`),
        }}
        slotViewButton={
          <ButtonSolid
            size={2}
            color={'accent'}
            textButton='View'
            highContrast='true'
            onClickButton={{
              onClick: () => push(`/jobs/${job.id}/profile-score`),
            }}
          />
        }
      />,
    );
  else if (status.description_changed)
    banners.push(
      <DashboardWarning
        textWarningTitle={'Job description has changed'}
        textDesc={'You may need to adjust the criteria for profile scoring.'}
        slotButton={
          <>
            <ButtonSoft
              textButton='Ignore'
              size={2}
              color={'accent'}
              highContrast={'true'}
              onClickButton={{
                onClick: () => setDismissWarnings({ job_description: true }),
              }}
            />

            <ButtonSolid
              textButton='View'
              size={2}
              color={'accent'}
              highContrast={'true'}
              onClickButton={{
                onClick: () => push(`/jobs/${job.id}/profile-score`),
              }}
            />
          </>
        }
      />,
    );
  // if (status.scoring_criteria_changed)
  //   banners.push(
  //     <DashboardWarning
  //       onClickDismiss={{ onClick: () => setDismiss(true) }}
  //       onClickView={{ onClick: () => push(`/jobs/${job.id}/profile-score`) }}
  //     />
  //   );
  return banners;
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
            background: 'transparent',
            overflow: 'visible !important',
            boxShadow: 'none',
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
          textPopupTitle={`${isDelete ? 'Delete' : 'Close'}  This Job`}
          textWarning={
            isDelete
              ? 'Deleting this job will permanently remove all related data and make the job inaccessible. Candidate data will remain unaffected.'
              : 'Closing this job will permanently stop all activities, including tasks and scheduled interviews. It will also remove the job from the company page and prevent any new applications or candidate imports.'
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
  const { isAssessmentEnabled, isScreeningEnabled, isSchedulingEnabled } =
    useAuthDetails();
  return (
    <>
      <JobDetailsModule />
      <ProfileScoreModule />
      {isSchedulingEnabled && <InterviewModule />}
      {isAssessmentEnabled && <AssessmentModule />}
      {isScreeningEnabled && <ScreeningModule />}
      <HiringTeamModule />
      <EmailTemplatesModule />
      <WorkflowModule />
    </>
  );
};

const WorkflowModule = () => {
  const { job } = useJobDetails();
  const { push } = useRouter();
  const handleClick = () => {
    push(ROUTES['/jobs/[id]/workflows']({ id: job?.id }));
  };
  return (
    <ModuleCard
      onClickCard={{ onClick: () => handleClick() }}
      textName={'Workflows'}
      slotIcon={<WorkflowIcon />}
    />
  );
};

const HiringTeamModule = () => {
  const {
    job,
    publishStatus: {
      hiringTeamValidity: { validity },
    },
  } = useJobDetails();
  const { push } = useRouter();
  const handleClick = () => {
    push(ROUTES['/jobs/[id]/hiring-team']({ id: job?.id }));
  };
  return (
    <ModuleCard
      isAlert={!validity}
      onClickCard={{ onClick: () => handleClick() }}
      textName={'Hiring Team'}
      slotIcon={<HiringTeamIcon />}
    />
  );
};

const JobDetailsModule = () => {
  const {
    job,
    publishStatus: {
      detailsValidity: { validity },
    },
  } = useJobDetails();
  const { push } = useRouter();
  const handleClick = () => {
    push(ROUTES['/jobs/[id]/job-details']({ id: job?.id }));
  };
  return (
    <ModuleCard
      isAlert={!validity}
      onClickCard={{ onClick: () => handleClick() }}
      textName={'Job Details'}
      slotIcon={<JobDetailsIcon />}
    />
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

const EmailTemplatesModule = () => {
  const { job, emailTemplateValidity } = useJobDetails();
  const { push } = useRouter();
  const handleClick = () => {
    push(`/jobs/${job.id}/email-templates`);
  };
  return (
    <ModuleCard
      onClickCard={{ onClick: () => handleClick() }}
      textName={'Email Templates'}
      slotIcon={<EmailTemplateIcon />}
      isWarning={emailTemplateValidity?.length !== 0}
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
  const { job, isInterviewPlanDisabled, isInterviewSessionEmpty } =
    useJobDetails();
  const { interview_plan, interview_session } = useJobDashboardStore(
    ({ dismissWarnings }) => dismissWarnings,
  );
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
      isWarning={
        (isInterviewPlanDisabled && !interview_plan) ||
        (isInterviewSessionEmpty && !interview_session)
      }
    />
  );
};

const ProfileScoreModule = () => {
  const { job, status } = useJobDetails();
  const { push } = useRouter();
  const handleClick = () => {
    push(`/jobs/${job.id}/profile-score`);
  };
  const isAlert = status.jd_json_error && !status.description_error;
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
              sx={{ color: 'var(--neutral-6)' }}
            />
          )}
        </>
      }
    />
  );
};
