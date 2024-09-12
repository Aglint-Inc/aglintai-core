/* eslint-disable security/detect-object-injection */
import { GlobalBanner } from '@devlink2/GlobalBanner';
import { GlobalBannerInline } from '@devlink2/GlobalBannerInline';
import { BannerLoading } from '@devlink3/BannerLoading';
import { DarkPill } from '@devlink3/DarkPill';
import { GraphBlock } from '@devlink3/GraphBlock';
import { JobDashboard as JobDashboardDev } from '@devlink3/JobDashboard';
import { JobRole } from '@devlink3/JobRole';
import { JobsBanner } from '@devlink3/JobsBanner';
import { PipeLine } from '@devlink3/PipeLine';
import { RoleList } from '@devlink3/RoleList';
import { ScheduleCardSmall } from '@devlink3/ScheduleCardSmall';
import { CircularProgress, Stack } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useMemo, useState } from 'react';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import Loader from '@/components/Common/Loader';
// import EmailTemplateIcon from '@/components/Common/ModuleIcons/emailTemplateIcon';
import MuiAvatar from '@/components/Common/MuiAvatar';
import { UIButton } from '@/components/Common/UIButton';
import { UIPageLayout } from '@/components/Common/UIPageLayout';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { JobNotFound } from '@/job/components/JobNotFound';
import { SharedActions } from '@/job/components/SharedTopNav/actions';
import { SharedBreadCrumbs } from '@/job/components/SharedTopNav/breadcrumbs';
import { useApplicationsParams, useJob, useJobDashboard } from '@/job/hooks';
import type { ApplicationsParams } from '@/job/hooks/useApplicationParams';
import { distributeScoreWeights } from '@/job/utils';
import { useCompanyMembers } from '@/queries/company-members';
import { type Job } from '@/queries/jobs/types';
import { type Application } from '@/types/applications.types';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';
import { getScheduleType } from '@/utils/scheduling/colors_and_enums';
import { capitalize, capitalizeAll } from '@/utils/text/textUtils';

import DashboardBarChart from './BarChart2';
import DashboardDoughnutChart from './doughnut';
import DashboardLineChart from './lineChart';
import { NoDataAvailable } from './nodata';
import TenureAndExpSummary from './tenureAndExpSummary';

export const JobDashboard = () => {
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
        count: Number(value),
        percentage: `${value ? ((Number(value) / total) * 100).toFixed(1) : 0}%`,
      };
      return acc;
    },
    {} as {
      // eslint-disable-next-line no-unused-vars
      [_id in keyof typeof application_match]: {
        count: number;
        percentage: string;
      };
    },
  );
};

const Dashboard = () => {
  const { job, total } = useJob();
  const { isScoringEnabled } = useRolesAndPermissions();
  const {
    schedules: { data: schedule },
  } = useJobDashboard();
  const { push } = useRouter();

  const { getParams } = useApplicationsParams();

  const score_matches = getMatches(job.application_match, Number(total) || 0);

  const handleFilter = (
    resume_match: ApplicationsParams['filters']['resume_match'][number],
  ) => {
    const params = getParams({ resume_match: [resume_match] });
    push(`/jobs/${job.id}${params ? `?${params}` : ''}`);
  };

  const banners = useBanners();

  const [, setStorage] = useLocalStorage('scheduleFilterIds');

  return (
    <>
      <UIPageLayout
        slotBody={
          <JobDashboardDev
            isJobStatsVisible={isScoringEnabled}
            isJobRoleVisible={false}
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
            slotModuleCard={<></>}
            slotCardWithNumber={<TenureAndExpSummary />}
            isViewScheduleVisible={schedule?.length > 3}
            onClickViewSchedule={{
              onClick: () => {
                setStorage((prev) => ({
                  ...prev,
                  status: ['confirmed'],
                  member: [],
                  jobs: [job?.id],
                }));
                push(`/scheduling?tab=schedules`);
              },
            }}
            slotScheduleCardSmall={<Schedules />}
            onClickAssistant={{
              onClick: () => push(`/jobs/${job.id}/agent`),
            }}
            slotJobRole={<Roles />}
          />
        }
        slotTopbarLeft={<SharedBreadCrumbs />}
        slotTopbarRight={<SharedActions />}
      />
    </>
  );
};

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
                textName={
                  <Link href={`/user/profile/${user.user_id}`} key={i}>
                    {name}
                  </Link>
                }
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
        onClick: () =>
          push(ROUTES['/jobs/[job]/hiring-team']({ job: job?.id })),
      }}
      slotRoleList={coordinators}
    />
  );
};

const Pipeline = () => {
  const { job } = useJobDashboard();
  const { getParams } = useApplicationsParams();
  const { push } = useRouter();
  const newSections = Object.entries(job?.section_count ?? {}).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        count: Number(value),
        label: getPlural(Number(value), 'candidate'),
      };
      return acc;
    },
    {} as {
      // eslint-disable-next-line no-unused-vars
      [_id in keyof Job['section_count']]: { count: number; label: string };
    },
  );
  const handlClick = (section: Application['status']) => {
    const params = getParams({ section });
    push(`/jobs/${job.id}${params ? `?${params}` : ''}`);
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
      <PipeLine
        textCandidateCount={newSections.interview.label}
        textName={capitalize('interview')}
        onClickPipeline={{
          onClick: () => handlClick('interview'),
        }}
      />
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
  if (data.length === 0) return <NoDataAvailable />;
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
      <>
        <GlobalBannerInline
          textContent='Interview plan not set'
          color={'warning'}
          slotButton={
            <>
              <UIButton
                variant='secondary'
                size='sm'
                onClick={() =>
                  push(ROUTES['/jobs/[job]/interview-plan']({ job: job?.id }))
                }
              >
                Ignore
              </UIButton>
              <UIButton
                variant='default'
                size='sm'
                onClick={() =>
                  handleJobUpdate({ interview_plan_warning_ignore: true })
                }
              >
                View
              </UIButton>
            </>
          }
        />
        {/* <Banner
          type='warning'
          title='Interview plan not set'
          description='To use the scheduling module, enable interview plans for this job.'
          primary={{
            title: 'Ignore',
            onClick: () =>
              push(ROUTES['/jobs/[job]/interview-plan']({ id: job?.id })),
          }}
          secondary={{
            title: 'View',
            onClick: () =>
              handleJobUpdate({ interview_plan_warning_ignore: true }),
          }}
        /> */}
        ,
      </>,
    );
  if (isInterviewSessionEmpty)
    banners.push(
      <>
        <GlobalBannerInline
          textContent='Interview plan not set'
          color={'warning'}
          slotButton={
            <>
              <UIButton
                variant='secondary'
                size='sm'
                onClick={() =>
                  push(ROUTES['/jobs/[job]/interview-plan']({ job: job?.id }))
                }
              >
                Ignore
              </UIButton>
              <UIButton
                variant='default'
                size='sm'
                onClick={() =>
                  handleJobUpdate({ interview_session_warning_ignore: true })
                }
              >
                View
              </UIButton>
            </>
          }
        />
      </>,
      // <Banner
      //   type='warning'
      //   title='Interview plan not set'
      //   description='Add one or more interview types to create an interview plan.'
      //   primary={{
      //     title: 'Ignore',
      //     onClick: () =>
      //       push(ROUTES['/jobs/[job]/interview-plan']({ id: job?.id })),
      //   }}
      //   secondary={{
      //     title: 'View',
      //     onClick: () =>
      //       handleJobUpdate({ interview_session_warning_ignore: true }),
      //   }}
      // />,
    );
  if (
    !publishStatus.detailsValidity.validity ||
    !publishStatus.hiringTeamValidity.validity
  ) {
    if (!publishStatus.detailsValidity.validity) {
      banners.push(
        <GlobalBannerInline
          textContent={publishStatus.detailsValidity.message}
          iconName='warning'
          color={'error'}
          slotButton={
            <>
              <UIButton
                variant='destructive'
                size='sm'
                onClick={() =>
                  push(ROUTES['/jobs/[job]/job-details']({ job: job?.id }))
                }
              >
                View
              </UIButton>
            </>
          }
        />,
        // <Banner
        //   type='error'
        //   title={publishStatus.detailsValidity.message}
        //   description='Please ensure that valid job details are provided.'
        //   primary={{
        //     title: 'View',
        //     onClick: () =>
        //       push(ROUTES['/jobs/[job]/job-details']({ id: job?.id })),
        //   }}
        // />,
      );
    }
    if (!publishStatus.hiringTeamValidity.validity) {
      banners.push(
        <GlobalBannerInline
          iconName='warning'
          color={'error'}
          textContent='Hiring team not set'
          slotButton={
            <UIButton
              variant='destructive'
              size='sm'
              onClick={() =>
                push(ROUTES['/jobs/[job]/hiring-team']({ job: job?.id }))
              }
            >
              Set Now
            </UIButton>
          }
        />,
        // <Banner
        //   type='error'
        //   title='Hiring team not set'
        //   description='Please ensure that necessary hiring members are selected.'
        //   primary={{
        //     title: 'Set Now',
        //     onClick: () =>
        //       push(ROUTES['/jobs/[job]/hiring-team']({ id: job?.id })),
        //   }}
        // />,
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
            push(ROUTES['/jobs/[job]/profile-score']({ job: job?.id })),
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
            push(ROUTES['/jobs/[job]/profile-score']({ job: job?.id })),
        }}
        secondary={{
          title: 'Revert',
          onClick: () =>
            handleJobUpdate({
              parameter_weights: distributeScoreWeights(job.jd_json),
              draft: { ...job.draft, jd_json: job.jd_json },
            }),
        }}
      />,
    );
  if (status.description_changed)
    banners.push(
      <Banner
        type='warning'
        title={'Job details changed.'}
        description='Please publish the updates.'
        primary={{
          title: 'View',
          onClick: () =>
            push(ROUTES['/jobs/[job]/job-details']({ job: job?.id })),
        }}
        secondary={{
          title: 'Revert',
          onClick: () =>
            handleJobUpdate({
              draft: {
                ...job.draft,
                location_id: job.location_id,
                department_id: job.department_id,
                description: job.description,
                job_title: job.job_title,
                job_type: job.job_type,
                workplace_type: job.workplace_type,
              },
            }),
        }}
      />,
      // <Banner
      //   type='warning'
      //   title={'Job details changed.'}
      //   description='Please publish the updates.'
      //   primary={{
      //     title: 'View',
      //     onClick: () =>
      //       push(ROUTES['/jobs/[job]/job-details']({ id: job?.id })),
      //   }}
      //   secondary={{
      //     title: 'Revert',
      //     onClick: () =>
      //       handleJobUpdate({
      //         draft: {
      //           ...job.draft,
      //           department_id: job.department_id,
      //           description: job.description,
      //           job_title: job.job_title,
      //           job_type: job.job_type,
      //           location: job.location,
      //           workplace_type: job.workplace_type,
      //         },
      //       }),
      //   }}
      // />,
    );
  return banners;
};

export type DashboardGraphOptions<
  T extends keyof Pick<
    ReturnType<typeof useJobDashboard>,
    'assessments' | 'locations' | 'skills' | 'tenureAndExperience'
  >,
> = {
  // eslint-disable-next-line no-unused-vars
  [_id in keyof ReturnType<typeof useJobDashboard>[T]['data']]: string;
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
    [_id in keyof Pick<
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
          iconName={'info'}
          slotButtons={
            <>
              <UIButton
                variant='secondary'
                size='sm'
                onClick={props.secondary.onClick}
              >
                {props.secondary.title}
              </UIButton>

              <UIButton
                variant='default'
                size='sm'
                onClick={props.primary.onClick}
              >
                {props.primary.title}
              </UIButton>
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
          iconName={'warning'}
          slotButtons={
            <UIButton
              variant='destructive'
              size='sm'
              onClick={props.primary.onClick}
            >
              {props.primary.title}
            </UIButton>
          }
          textTitle={props.title}
          textDescription={props.description}
        />
      );
  }
};
