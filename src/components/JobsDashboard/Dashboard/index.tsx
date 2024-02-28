/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useState } from 'react';

import {
  AssistantApplicantCount,
  AssistantDashboard,
  AssistStatus,
  DashboardMenu,
} from '@/devlink';
import { useJobDashboard } from '@/src/context/JobDashboard';
import NotFoundPage from '@/src/pages/404';

import DashboardBarChart from './BarChart';
import DashboardDoughnutChart from './Doughnut';
import JobsPopOver from './JobPopOver';
import ProgressChart from './ProgressChart';
import { countMatches, totalCount } from './utils';
import JobAssistant from '../JobAssistant';
import Loader from '../../Common/Loader';
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

const Dashboard = () => {
  const [maximizeChat, setMaximizeChat] = useState(false);
  const {
    job,
    analytics: { counts },
  } = useJobDashboard();
  const router = useRouter();

  const score_matches = countMatches(counts.matches);

  const [openImportCandidates, setOpenImportCandidates] = useState(false);
  return (
    <>
      <AddCandidates
        openImportCandidates={openImportCandidates}
        setOpenImportCandidates={setOpenImportCandidates}
      />
      <AssistantDashboard
        isLeftSideVisible={!maximizeChat}
        slotLeftDashboard={
          <>
            <AssistantApplicantCount
              slotIntegrationLogo={job?.posted_by}
              slotBarGraph={<ProgressChart score_matches={score_matches} />}
              applicantCount={totalCount(job?.count)}
              countTopMatch={score_matches.top_Matches.score}
              countGoodMatch={score_matches.good_Matches.score}
              countAverageMatch={score_matches.average_Matches.score}
              countPoorMatch={score_matches.poor_Matches.score}
              countNotMatch={score_matches.not_Matches.score}
            />
            <DashboardMenu
              onClickCandidateList={{
                onClick: () => {
                  router.push(`${job.id}/candidate-list`);
                },
              }}
              onClickViewJob={{
                onClick: () => {
                  window.open(`/job-post/${job.id}`);
                },
                href: `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${job.id}`,
                target: '_blank',
              }}
              onClickEditJobDetails={{
                onClick: () => {
                  router.push(`/jobs/edit?job_id=${job.id}`);
                  posthog.capture('Edit Job Details clicked');
                },
              }}
              onClickImportCandidates={{
                onClick: () => {
                  setOpenImportCandidates((pre) => !pre);
                },
              }}
              onClickAssesssment={{
                onClick: () => router.push(`/jobs/${job.id}/assessment`),
              }}
            />
            <DashboardDoughnutChart />
            <DashboardBarChart />
          </>
        }
        slotStatus={
          <AssistStatus
            isCloseVisible={job?.status === 'closed'}
            isDraftVisible={job?.status === 'draft'}
            isPublishedVisible={job?.status === 'published'}
          />
        }
        textJob={capitalize(job?.status)}
        onClickJob={{
          onClick: () => {
            router.push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
        textHeaderTitle={<JobsPopOver currecntJob={job?.job_title} />}
        textTotalCandidateCount={''}
        slotChat={
          <JobAssistant
            maximizeChat={maximizeChat}
            setMaximizeChat={setMaximizeChat}
          />
        }
      />
    </>
  );
};

export default JobDashboard;
