/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
// import posthog from 'posthog-js';
import { useState } from 'react';

import {
  // AssistantApplicantCount,
  // AssistantDashboard,
  AssistStatus
  // DashboardMenu,
} from '@/devlink';
import { Breadcrum, PageLayout } from '@/devlink2';
import {
  DarkPill,
  EnableDisable,
  GraphBlock,
  JobDashboard as JobDashboardDev,
  JobDashboardTopRight,
  ModuleCard,
  PipeLine
} from '@/devlink3';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import { useJobDashboard } from '@/src/context/JobDashboard';
import NotFoundPage from '@/src/pages/404';

import DashboardBarChart from './BarChart';
import DashboardDoughnutChart from './Doughnut';
import Loader from '../../Common/Loader';
import AssessmentIcon from '../../Common/ModuleIcons/assessmentIcon';
// import EmailTemplateIcon from '../../Common/ModuleIcons/emailTemplateIcon';
import SchedulingIcon from '../../Common/ModuleIcons/schedulingIcon';
import ScreeningIcon from '../../Common/ModuleIcons/screeningIcon';
import { AddCandidates } from '../../JobApplicationsDashboard';

const JobDashboard = () => {
  const { initialLoad, job } = useJobDashboard();

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

const getCounts = (
  counts: ReturnType<typeof useJobDashboard>['analytics']['counts']
) => {
  return Object.entries(counts.matches).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        count: getPlural(value, 'candidate'),
        percentage: `${value ? Math.trunc((value / counts.total) * 100) : 0}%`
      };
      return acc;
    },
    {} as {
      // eslint-disable-next-line no-unused-vars
      [id in keyof typeof counts.matches]: {
        count: number;
        percentage: string;
      };
    }
  );
};

const Dashboard = () => {
  // const [maximizeChat, setMaximizeChat] = useState(false);
  const {
    job,
    analytics: { counts }
  } = useJobDashboard();
  const { push } = useRouter();

  const score_matches = getCounts(counts);

  const [openImportCandidates, setOpenImportCandidates] = useState(false);

  return (
    <>
      <AddCandidates
        openImportCandidates={openImportCandidates}
        setOpenImportCandidates={setOpenImportCandidates}
      />
      <PageLayout
        slotBody={
          <JobDashboardDev
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
            slotSkillGraphBlock={<Bars />}
            slotPipeline={<Pipeline />}
            slotModuleCard={<Modules />}
            textCandidateCount={counts.total}
            onClickAssistant={{
              onClick: () => push(`/jobs/${job.id}/agent`)
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
            onClickEdit={{ onClick: () => push(`/jobs/edit?job_id=${job.id}`) }}
          />
        }
      />
    </>
  );
};

export default JobDashboard;

const BreadCrumbs = () => {
  const router = useRouter();
  const { job } = useJobApplications();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            router.push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' }
        }}
      />
      <Breadcrum textName={capitalize(job?.job_title ?? 'Job')} showArrow />
    </>
  );
};

const Pipeline = () => {
  const {
    job,
    analytics: { sections }
  } = useJobDashboard();
  const { setSection } = useJobApplications();
  const { push } = useRouter();

  const newSections = Object.entries(sections).reduce(
    (acc, [key, value]) => {
      acc[key] = { count: value, label: getPlural(value, 'candidate') };
      return acc;
    },
    // eslint-disable-next-line no-unused-vars
    {} as { [id in keyof typeof sections]: { count: number; label: string } }
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
          onClick: () => handlClick(JobApplicationSections.NEW)
        }}
      />
      {job.phone_screen_enabled && (
        <PipeLine
          textCandidateCount={newSections.screening.label}
          textName={capitalize(JobApplicationSections.SCREENING)}
          onClickPipeline={{
            onClick: () => handlClick(JobApplicationSections.SCREENING)
          }}
        />
      )}
      {job.assessment && (
        <PipeLine
          textCandidateCount={newSections.assessment.label}
          textName={capitalize(JobApplicationSections.ASSESSMENT)}
          onClickPipeline={{
            onClick: () => handlClick(JobApplicationSections.ASSESSMENT)
          }}
        />
      )}
      <PipeLine
        textCandidateCount={newSections.interview.label}
        textName={capitalize(JobApplicationSections.INTERVIEW)}
        onClickPipeline={{
          onClick: () => handlClick(JobApplicationSections.INTERVIEW)
        }}
      />
      <PipeLine
        textCandidateCount={newSections.qualified.label}
        textName={capitalize(JobApplicationSections.QUALIFIED)}
        onClickPipeline={{
          onClick: () => handlClick(JobApplicationSections.QUALIFIED)
        }}
      />
      <PipeLine
        isRight={false}
        textCandidateCount={newSections.disqualified.label}
        textName={capitalize(JobApplicationSections.DISQUALIFIED)}
        onClickPipeline={{
          onClick: () => handlClick(JobApplicationSections.DISQUALIFIED)
        }}
      />
    </>
  );
};

const Modules = () => {
  return (
    <>
      <InterviewModule />
      <AssessmentModule />
      <ScreeningModule />
    </>
  );
};

const AssessmentModule = () => {
  const { job } = useJobDashboard();
  const { push } = useRouter();
  const count = job.assessment_job_relation.length;
  const descripition = job.assessment
    ? `${count} assessment${count === 1 ? '' : 's'} linked`
    : 'Assessments are disabled';
  const handleClick = () => {
    push(`/jobs/${job.id}/assessment`);
  };
  return (
    <ModuleCard
      onClickCard={{ onClick: () => handleClick() }}
      textDescription={descripition}
      textName={'Assessment'}
      slotIcon={<AssessmentIcon />}
      slotEnableDisable={<EnableDisable isEnabled={job.assessment} />}
    />
  );
};

export type DashboardGraphOptions<
  T extends keyof ReturnType<typeof useJobDashboard>['analytics']
> = {
  // eslint-disable-next-line no-unused-vars
  [id in keyof ReturnType<typeof useJobDashboard>['analytics'][T]]: string;
};

const Doughnut = () => {
  const options: DashboardGraphOptions<'locations'> = {
    city: 'City',
    state: 'State',
    country: 'Country'
  };
  const [selection, setSelection] = useState<keyof typeof options>('city');
  const pills = Object.entries(options).map(([key, value]) => (
    <DarkPill
      key={key}
      isActive={selection === key}
      textPill={value}
      onClickPill={{
        onClick: () => setSelection(key as keyof typeof options)
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

const Bars = () => {
  const options: DashboardGraphOptions<'skills'> = {
    top_skills: 'Top skills',
    required_skills: 'Skills mentioned in JD'
  };
  const [selection, setSelection] =
    useState<keyof typeof options>('top_skills');
  const pills = Object.entries(options).map(([key, value]) => (
    <DarkPill
      key={key}
      isActive={selection === key}
      textPill={value}
      onClickPill={{
        onClick: () => setSelection(key as keyof typeof options)
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
      textDescription={
        job.phone_screen_enabled
          ? `Phone screening is enabled for this job`
          : 'Phone screening has not been enabled for this job.'
      }
      textName={'Screening'}
      slotIcon={<ScreeningIcon />}
      slotEnableDisable={<EnableDisable isEnabled={job.phone_screen_enabled} />}
    />
  );
};

const InterviewModule = () => {
  const { job } = useJobDashboard();
  const { push } = useRouter();
  const interview_plan = job.interview_plan as any;
  const count =
    interview_plan && interview_plan?.plan ? interview_plan.plan.length : 0;
  const handleClick = () => {
    push(`/jobs/${job.id}/interview-plan`);
  };
  return (
    <ModuleCard
      onClickCard={{ onClick: () => handleClick() }}
      textName={'Interview Plan (Scheduler)'}
      isDescription
      textDescription={`${count} interview plans linked`}
      slotIcon={<SchedulingIcon />}
      slotEnableDisable={<></>}
    />
  );
};
