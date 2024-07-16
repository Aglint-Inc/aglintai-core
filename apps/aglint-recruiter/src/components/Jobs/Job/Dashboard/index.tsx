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
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { PageLayout } from '@/devlink2/PageLayout';
import { BannerLoading } from '@/devlink3/BannerLoading';
import { DarkPill } from '@/devlink3/DarkPill';
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
import Loader from '@/src/components/Common/Loader';
import AssessmentIcon from '@/src/components/Common/ModuleIcons/assessmentIcon';
import EmailTemplateIcon from '@/src/components/Common/ModuleIcons/emailTemplateIcon';
// import EmailTemplateIcon from '@/src/components/Common/ModuleIcons/emailTemplateIcon';
import HiringTeamIcon from '@/src/components/Common/ModuleIcons/hiringTeamIcon';
import JobDetailsIcon from '@/src/components/Common/ModuleIcons/jobDetailsIcon';
import ProfileScoreIcon from '@/src/components/Common/ModuleIcons/profileScoreIcon';
import SchedulingIcon from '@/src/components/Common/ModuleIcons/schedulingIcon';
import ScreeningIcon from '@/src/components/Common/ModuleIcons/screeningIcon';
import WorkflowIcon from '@/src/components/Common/ModuleIcons/workflowIcon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import PublishButton from '@/src/components/Common/PublishButton';
import UITextField from '@/src/components/Common/UITextField';
import IconScheduleType from '@/src/components/Scheduling/Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '@/src/components/Scheduling/Candidates/utils';
import {
  ApplicationsParams,
  useApplicationsParams,
} from '@/src/context/ApplicationsContext/hooks';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJob } from '@/src/context/JobContext';
import { useJobDashboard } from '@/src/context/JobDashboard';
import { useJobs } from '@/src/context/JobsContext';
import { useCompanyMembers } from '@/src/queries/company-members';
import { Job } from '@/src/queries/jobs/types';
import { Application } from '@/src/types/applications.types';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';
import {
  capitalize,
  capitalizeAll,
  capitalizeSentence,
} from '@/src/utils/text/textUtils';

import JobNotFound from '../Common/JobNotFound';
import { UploadApplications } from '../Common/UploadApplications';
import DashboardBarChart from './BarChart2';
import DashboardDoughnutChart from './doughnut';
import DashboardLineChart from './lineChart';
import TenureAndExpSummary from './tenureAndExpSummary';

const JobDashboard = () => {
  const { job, jobLoad } = useJob();
  return jobLoad ? (
    job ? (
      <Dashboard />
    ) : (
      <JobNotFound />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

const getMatches = (
  application_match: Job['application_match'],
  total: number,
) => {
  return Object.entries(application_match ?? {}).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        count: getPlural(value, 'candidate'),
        percentage: `${value ? ((value / total) * 100).toFixed(1) : 0}%`,
      };
      return acc;
    },
    {} as {
      // eslint-disable-next-line no-unused-vars
      [id in keyof typeof application_match]: {
        count: number;
        percentage: string;
      };
    },
  );
};

const Dashboard = () => {
  const {
    job,
    total,
    applicationScoringPollEnabled,
    handleJobAsyncUpdate,
    handlePublish,
    canPublish,
  } = useJob();
  const {
    schedules: { data: schedule },
  } = useJobDashboard();
  const { push } = useRouter();
  const { handleJobDelete } = useJobs();

  const { setImportPopup } = useApplicationsStore(({ setImportPopup }) => ({
    setImportPopup,
  }));

  const { getParams } = useApplicationsParams();

  const score_matches = getMatches(job.application_match, total);
  const [popover, setPopover] = useState(false);

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
        await handleJobAsyncUpdate({ status: 'closed' });
        break;
      case 'closed':
        handleDeleteJob();
        break;
    }
  }, [job.status]);

  const publishButton = useMemo(
    () => (
      <PublishButton
        onClick={async () => await handlePublish()}
        disabled={!canPublish}
      />
    ),
    [canPublish],
  );

  const handleFilter = (
    resume_score: ApplicationsParams['filters']['resume_score'][number],
  ) => {
    push(
      `/jobs/${job.id}/candidate-list?${getParams({ resume_score: [resume_score] })}`,
    );
  };

  const banners = useBanners();

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
              onClick: () => handleFilter('top_match'),
            }}
            textTopMatchPercentage={
              score_matches?.top_match?.percentage ?? '---'
            }
            textTopMatchCount={score_matches?.top_match?.count ?? '---'}
            onClickGoodMatch={{
              style: { cursor: 'pointer' },
              onClick: () => handleFilter('good_match'),
            }}
            textGoodMatchPercentage={
              score_matches?.good_match?.percentage ?? '---'
            }
            textGoodMatchCount={score_matches?.good_match?.count ?? '---'}
            onClickAverageMatch={{
              style: { cursor: 'pointer' },
              onClick: () => handleFilter('average_match'),
            }}
            textAverageMatchPercentage={
              score_matches?.average_match?.percentage ?? '---'
            }
            textAveageMatchCount={score_matches?.average_match?.count ?? '---'}
            onClickBelowAverage={{
              style: { cursor: 'pointer' },
              onClick: () => handleFilter('poor_match'),
            }}
            textBelowAveragePercentage={
              score_matches?.poor_match?.percentage ?? '---'
            }
            textBelowAverageCount={score_matches?.poor_match?.count ?? '---'}
            onClickNotaMatch={{
              style: { cursor: 'pointer' },
              onClick: () => handleFilter('not_a_match'),
            }}
            textNotAMatchPercentage={
              score_matches?.not_a_match?.percentage ?? '---'
            }
            textNotAMatchCount={score_matches?.not_a_match?.count ?? '---'}
            slotLocationGraphBlock={<Doughnut />}
            slotExperienceGraph={<LineGraph />}
            slotSkillGraphBlock={<Bars />}
            slotPipeline={<Pipeline />}
            slotModuleCard={job?.status !== 'closed' && <Modules />}
            slotCardWithNumber={<TenureAndExpSummary />}
            isViewScheduleVisible={schedule?.length > 3}
            onClickViewSchedule={{
              onClick: () => {
                localStorage.setItem(
                  'scheduleFilterIds',
                  JSON.stringify({
                    status: ['confirmed'],
                    member: [],
                    job: [job?.id],
                  }),
                );
                push(`/scheduling?tab=schedules`);
              },
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
                      job?.processing_count.processed +
                      job?.processing_count.unavailable +
                      job?.processing_count.unparsable
                    }/${total ?? '---'}`}
                    slotScoringLoader={
                      <Stack sx={{ width: '12px', aspectRatio: 1 }}>
                        <CircularProgress
                          color='inherit'
                          size={'100%'}
                          sx={{ color: 'var(--white)' }}
                        />
                      </Stack>
                    }
                  />
                )}
                {job?.status !== 'closed' && (
                  <ButtonSoft
                    size={2}
                    color='neutral'
                    textButton='Add candidates'
                    onClickButton={{ onClick: () => setImportPopup(true) }}
                    isLeftIcon
                    iconName='add'
                  />
                )}
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
                  iconSize={6}
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
  const { job } = useJobDashboard();
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
        .reduce((acc, [key, value], i) => {
          const user = (data ?? []).find(({ user_id }) => user_id === value);
          if (user) {
            const name = getFullName(
              user?.first_name ?? null,
              user?.last_name ?? null,
            );
            acc.push(
              <RoleList
                key={i}
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
  const { job, total } = useJobDashboard();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalizeSentence(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        textName={`${capitalizeSentence(job?.job_title ?? 'Job')} ${total ? `(${total})` : ''}`}
        showArrow
      />
      <Preview />
    </>
  );
};

const Preview = () => {
  const { job } = useJobDashboard();
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
  const { job } = useJobDashboard();
  const { getParams } = useApplicationsParams();
  const { push } = useRouter();
  const newSections = Object.entries(job?.section_count ?? {}).reduce(
    (acc, [key, value]) => {
      acc[key] = { count: value, label: getPlural(value, 'candidate') };
      return acc;
    },
    {} as {
      // eslint-disable-next-line no-unused-vars
      [id in keyof Job['section_count']]: { count: number; label: string };
    },
  );
  const handlClick = (section: Application['status']) => {
    push(`/jobs/${job.id}/candidate-list?${getParams({ section })}`);
  };
  return (
    <>
      <PipeLine
        isLeft={false}
        textCandidateCount={newSections.new.label}
        textName={capitalize('new')}
        onClickPipeline={{
          onClick: () => handlClick('new'),
        }}
      />
      {job.flags.screening && (
        <PipeLine
          textCandidateCount={newSections.screening.label}
          textName={capitalize('screening')}
          onClickPipeline={{
            onClick: () => handlClick('screening'),
          }}
        />
      )}
      {job.flags.assessment && (
        <PipeLine
          textCandidateCount={newSections.assessment.label}
          textName={capitalize('assessment')}
          onClickPipeline={{
            onClick: () => handlClick('assessment'),
          }}
        />
      )}
      {job.flags.interview && (
        <PipeLine
          textCandidateCount={newSections.interview.label}
          textName={capitalize('interview')}
          onClickPipeline={{
            onClick: () => handlClick('interview'),
          }}
        />
      )}
      <PipeLine
        textCandidateCount={newSections.qualified.label}
        textName={capitalize('qualified')}
        onClickPipeline={{
          onClick: () => handlClick('qualified'),
        }}
      />
      <PipeLine
        isRight={false}
        textCandidateCount={newSections.disqualified.label}
        textName={capitalize('disqualified')}
        onClickPipeline={{
          onClick: () => handlClick('disqualified'),
        }}
      />
    </>
  );
};

const Schedules = () => {
  const {
    schedules: { data, status },
  } = useJobDashboard();
  const { push } = useRouter();
  if (status === 'pending') return <Loader />;
  if (status === 'error') return <>Error</>;
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

const useBanners = () => {
  const { push } = useRouter();
  const { job, publishStatus, handleJobUpdate } = useJob();
  const { isInterviewPlanDisabled, isInterviewSessionEmpty, status } =
    useJobDashboard();

  const banners: React.JSX.Element[] = [];
  if (job.status === 'draft') banners.push(<JobsBanner />);

  if (isInterviewPlanDisabled)
    banners.push(
      <Banner
        type='warning'
        title='Interview plan not set'
        description='To use the scheduling module, enable interview plans for this job.'
        primary={{
          title: 'Ignore',
          onClick: () =>
            push(ROUTES['/jobs/[id]/interview-plan']({ id: job?.id })),
        }}
        secondary={{
          title: 'View',
          onClick: () =>
            handleJobUpdate({ interview_plan_warning_ignore: true }),
        }}
      />,
    );
  if (isInterviewSessionEmpty)
    banners.push(
      <Banner
        type='warning'
        title='Interview types not set'
        description='Add one or more interview types to create an interview plan.'
        primary={{
          title: 'Ignore',
          onClick: () =>
            push(ROUTES['/jobs/[id]/interview-plan']({ id: job?.id })),
        }}
        secondary={{
          title: 'View',
          onClick: () =>
            handleJobUpdate({ interview_session_warning_ignore: true }),
        }}
      />,
    );
  if (
    !publishStatus.detailsValidity.validity ||
    !publishStatus.hiringTeamValidity.validity
  ) {
    if (!publishStatus.detailsValidity.validity) {
      banners.push(
        <Banner
          type='error'
          title={publishStatus.detailsValidity.message}
          description='Please ensure that valid job details are provided.'
          primary={{
            title: 'View',
            onClick: () =>
              push(ROUTES['/jobs/[id]/job-details']({ id: job?.id })),
          }}
        />,
      );
    }
    if (!publishStatus.hiringTeamValidity.validity) {
      banners.push(
        <Banner
          type='error'
          title={publishStatus.detailsValidity.message}
          description='Please ensure that necessary hiring members are selected.'
          primary={{
            title: 'Assign now',
            onClick: () =>
              push(ROUTES['/jobs/[id]/hiring-team']({ id: job?.id })),
          }}
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
      <Banner
        type='error'
        title={'Profile score is empty'}
        description='Candidates cannot be scored without scoring criterias. Please ensure that valid scoring criterias are provided.'
        primary={{
          title: 'View',
          onClick: () =>
            push(ROUTES['/jobs/[id]/profile-score']({ id: job?.id })),
        }}
      />,
    );
  else if (status.scoring_criteria_changed)
    banners.push(
      <Banner
        type='warning'
        title='Profile score has been updated'
        description='You may need to publish changes to score applicants with the current profile score'
        primary={{
          title: 'View',
          onClick: () =>
            push(ROUTES['/jobs/[id]/profile-score']({ id: job?.id })),
        }}
        secondary={{
          title: 'Revert',
          onClick: () =>
            handleJobUpdate({
              draft: { ...job.draft, jd_json: job.jd_json },
            }),
        }}
      />,
    );
  if (status.description_changed)
    banners.push(
      <Banner
        type='warning'
        title={'Job details have changed'}
        description='You may need to publish these changes.'
        primary={{
          title: 'View',
          onClick: () =>
            push(ROUTES['/jobs/[id]/job-details']({ id: job?.id })),
        }}
        secondary={{
          title: 'Revert',
          onClick: () =>
            handleJobUpdate({
              draft: {
                ...job.draft,
                company: job.company,
                department: job.department,
                description: job.description,
                job_title: job.job_title,
                job_type: job.job_type,
                location: job.location,
                workplace_type: job.workplace_type,
              },
            }),
        }}
      />,
    );
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
  } = useJob();
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
          isCloseJobVisible={!isDelete}
          isDeleteJobVisible={isDelete}
          slotButton={
            <ButtonSolid
              textButton={`${isDelete ? 'Delete' : 'Close'} Job`}
              size={2}
              color={isDelete ? 'error' : 'accent'}
              onClickButton={{ onClick: () => openModal() }}
            />
          }
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
          onClickCloseJob={{ onClick: () => handleClose() }}
          textLocation={location}
          slotInput={
            <UITextField
              placeholder={job_title.trim()}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          }
          slotButton={
            <>
              <ButtonSoft
                color={'neutral'}
                textButton='Cancel'
                size={2}
                onClickButton={{ onClick: () => handleClose() }}
              />
              <ButtonSolid
                textButton={isDelete ? 'Delete Job' : 'Close Job'}
                color={isDelete ? 'error' : 'accent'}
                size={2}
                onClickButton={{ onClick: handleSubmit }}
                isDisabled={job_title.trim() !== value.trim()}
              />
            </>
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
  const { job } = useJobDashboard();
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
  } = useJob();
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
  } = useJob();
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
  const { job } = useJobDashboard();
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
  const { job /* emailTemplateValidity */ } = useJobDashboard();
  const { push } = useRouter();
  const handleClick = () => {
    push(`/jobs/${job.id}/email-templates`);
  };
  return (
    <ModuleCard
      onClickCard={{ onClick: () => handleClick() }}
      textName={'Email Templates'}
      slotIcon={<EmailTemplateIcon />}
      // isWarning={emailTemplateValidity?.length !== 0}
    />
  );
};

export type DashboardGraphOptions<
  T extends keyof Pick<
    ReturnType<typeof useJobDashboard>,
    'assessments' | 'locations' | 'skills' | 'tenureAndExperience'
  >,
> = {
  // eslint-disable-next-line no-unused-vars
  [id in keyof ReturnType<typeof useJobDashboard>[T]['data']]: string;
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
  const { job } = useJobDashboard();
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
    useJobDashboard();
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
      isWarning={isInterviewPlanDisabled || isInterviewSessionEmpty}
    />
  );
};

const ProfileScoreModule = () => {
  const { job, status } = useJobDashboard();
  const { push } = useRouter();
  const handleClick = () => {
    push(`/jobs/${job.id}/profile-score`);
  };
  const isAlert = status.jd_json_error && !status.description_error;
  const isWarning =
    !isAlert &&
    ((status.description_changed && !status.scoring_criteria_changed) ||
      status.description_error);
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

type BaseBanner = {
  title: string;
  description: string;
  primary: {
    title: string;
    onClick: () => void;
  };
  secondary: {
    title: string;
    onClick: () => void;
  };
};

type BannerProps =
  | ({ type: 'warning' } & BaseBanner)
  | ({ type: 'error' } & Omit<BaseBanner, 'secondary'>);

const Banner = (props: BannerProps) => {
  switch (props.type) {
    case 'warning':
      return (
        <GlobalBanner
          color={'warning'}
          iconName={'warning'}
          slotButtons={
            <>
              <ButtonSoft
                textButton={props.secondary.title}
                size={2}
                color={'accent'}
                highContrast={'true'}
                onClickButton={{
                  onClick: props.secondary.onClick,
                }}
              />

              <ButtonSolid
                textButton={props.primary.title}
                size={2}
                color={'accent'}
                onClickButton={{
                  onClick: props.primary.onClick,
                }}
              />
            </>
          }
          textTitle={props.title}
          textDescription={props.description}
        />
      );
    case 'error':
      return (
        <GlobalBanner
          color={'error'}
          iconName={'error'}
          slotButtons={
            <ButtonSolid
              size={2}
              color={'accent'}
              textButton={props.primary.title}
              highContrast='true'
              onClickButton={{
                onClick: () => props.primary.title,
              }}
            />
          }
          textTitle={props.title}
          textDescription={props.description}
        />
      );
  }
};
