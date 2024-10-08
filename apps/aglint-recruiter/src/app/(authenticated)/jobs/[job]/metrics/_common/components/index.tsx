import {
  Page,
  PageActions,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useState } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { JobNotFound } from '@/job/components/JobNotFound';
import { SharedActions } from '@/job/components/SharedTopNav/actions';
import { SharedBreadCrumbs } from '@/job/components/SharedTopNav/breadcrumbs';
import { useJob } from '@/job/hooks';
import { type Job } from '@/queries/jobs/types';
import { SafeObject } from '@/utils/safeObject';
import { capitalizeAll } from '@/utils/text/textUtils';

import { DashboardBarChart } from './BarChart2';
import { DashboardDoughnutChart } from './doughnut';
import { DashboardLineChart } from './lineChart';
import { TenureAndExpSummary } from './tenureAndExpSummary';

export const JobDashboard = () => {
  const { job, jobLoad } = useJob();
  return jobLoad ? (
    job ? (
      <Dashboard />
    ) : (
      <JobNotFound />
    )
  ) : (
    <div className='min-h-screen'>
      <div className='container mx-auto'>
        <div className='w-full space-y-6'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-[200px]' />
            <Skeleton className='h-4 w-[300px]' />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className='space-y-2'>
                  <Skeleton className='h-4 w-1/2' />
                  <Skeleton className='h-8 w-3/4' />
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className='h-6 w-1/3' />
                </CardHeader>
                <CardContent>
                  <Skeleton className='h-[200px] w-full' />
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-1/4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-[300px] w-full' />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const getMatches = (
  application_match: Job['application_match'],
  total: number,
) => {
  return SafeObject.entries(application_match!).reduce(
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

  const score_matches = getMatches(job.application_match, Number(total) || 0);

  return (
    <Page>
      <PageHeader className='px-4'>
        <PageHeaderText>
          <PageTitle>Job Metrics</PageTitle>
          <SharedBreadCrumbs />
        </PageHeaderText>
        <PageActions>
          <SharedActions />
        </PageActions>
      </PageHeader>
      <ScrollArea className='h-[calc(100vh-220px)]'>
        <div className='mb-6 flex flex-col gap-6 px-4'>
          <div>
            <div className='flex flex-col gap-4 py-4'>
              <div className='space-y-4 rounded-lg bg-muted p-4'>
                <JobStats
                  isScoringEnabled={isScoringEnabled}
                  score_matches={score_matches}
                />
              </div>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-4'>
                <Doughnut />
                <Bars />
              </div>
              <div className='space-y-4'>
                <LineGraph />
                <TenureAndExpSummary />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Page>
  );
};

const JobStats = ({
  isScoringEnabled,
  score_matches,
}: {
  isScoringEnabled: boolean;
  score_matches: any;
}) => (
  <div className='flex space-x-12 overflow-x-auto'>
    {isScoringEnabled && (
      <>
        <StatItem
          label='Top Match'
          percentage={score_matches?.top_match?.percentage ?? '---'}
          count={score_matches?.top_match?.count ?? '---'}
          // onClick={() => handleFilter('top_match')}
          color='bg-green-500'
        />
        <StatItem
          label='Good Match'
          percentage={score_matches?.good_match?.percentage ?? '---'}
          count={score_matches?.good_match?.count ?? '---'}
          // onClick={() => handleFilter('good_match')}
          color='bg-lime-500'
        />
        <StatItem
          label='Average Match'
          percentage={score_matches?.average_match?.percentage ?? '---'}
          count={score_matches?.average_match?.count ?? '---'}
          // onClick={() => handleFilter('average_match')}
          color='bg-yellow-500'
        />
        <StatItem
          label='Below Average'
          percentage={score_matches?.poor_match?.percentage ?? '---'}
          count={score_matches?.poor_match?.count ?? '---'}
          // onClick={() => handleFilter('poor_match')}
          color='bg-orange-500'
        />
        <StatItem
          label='Not a Match'
          percentage={score_matches?.not_a_match?.percentage ?? '---'}
          count={score_matches?.not_a_match?.count ?? '---'}
          // onClick={() => handleFilter('not_a_match')}
          color='bg-red-500'
        />
      </>
    )}
  </div>
);

const StatItem = ({
  label,
  percentage,
  count,
  color,
}: {
  label: string;
  percentage: string;
  count: number;
  color: string;
}) => (
  <div className='mx-auto w-full max-w-4xl p-4'>
    <div className='flex cursor-pointer flex-col rounded-lg transition-colors duration-200 hover:bg-gray-100 sm:flex-row'>
      <div className='flex-1 p-2'>
        <div className='mb-1 text-sm font-medium' style={{ color: color }}>
          {label}
        </div>
        <div className='mb-2 text-2xl font-bold'>{percentage}</div>
        <div className='h-2 w-full overflow-hidden rounded-full bg-gray-200'>
          <div
            className={`h-full ${color}`}
            style={{ width: `${parseFloat(percentage)}%` }}
            role='progressbar'
            aria-valuenow={parseFloat(percentage)}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
        <div className='mt-1 text-xs text-muted-foreground'>({count})</div>
      </div>
    </div>
  </div>
);

type DoughnutType = 'city' | 'state' | 'country';
const Doughnut = () => {
  const [currentTab, setCurrentTab] = useState<DoughnutType>('city');
  const tabs: DoughnutType[] = ['city', 'state', 'country'];

  return (
    <Section className='rounded-lg bg-muted p-4'>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Location Distribution</SectionTitle>
          <SectionDescription>Applicants by location.</SectionDescription>
        </SectionHeaderText>
        <SectionActions>
          <Tabs
            value={currentTab}
            onValueChange={(value) => {
              const curTab = value as DoughnutType;
              setCurrentTab(curTab);
            }}
          >
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {capitalizeAll(tab)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </SectionActions>
      </SectionHeader>
      <ScrollArea className='h-[300px]'>
        <DashboardDoughnutChart option={currentTab} />
      </ScrollArea>
    </Section>
  );
};

type LineGraphType = 'experience' | 'tenure';
const LineGraph = () => {
  const [currentTab, setCurrentTab] = useState<LineGraphType>('experience');
  const tabs: LineGraphType[] = ['experience', 'tenure'];

  return (
    <Section className='rounded-lg bg-muted p-4'>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Experience and Tenure</SectionTitle>
          <SectionDescription>
            Applicants by experience and tenure.
          </SectionDescription>
        </SectionHeaderText>
        <SectionActions>
          <Tabs
            value={currentTab}
            onValueChange={(value) => {
              const curTab = value as LineGraphType;
              setCurrentTab(curTab);
            }}
          >
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {capitalizeAll(tab)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </SectionActions>
      </SectionHeader>
      <ScrollArea className='h-[300px]'>
        <DashboardLineChart option={currentTab} />
      </ScrollArea>
    </Section>
  );
};

type BarsType = 'top_skills' | 'skills_mentioned_in_JD';

const Bars = () => {
  const [currentTab, setCurrentTab] = useState<BarsType>('top_skills');
  const tabs: BarsType[] = ['top_skills', 'skills_mentioned_in_JD'];
  return (
    <Section className='rounded-lg bg-muted p-4'>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Skills</SectionTitle>
          <SectionDescription>Applicants by skills.</SectionDescription>
        </SectionHeaderText>
        <SectionActions>
          <Tabs
            value={currentTab}
            onValueChange={(value) => {
              const curTab = value as BarsType;
              setCurrentTab(curTab);
            }}
          >
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {capitalizeAll(tab)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </SectionActions>
      </SectionHeader>
      <ScrollArea className='h-[300px]'>
        <DashboardBarChart
          option={
            currentTab === 'top_skills' ? 'top_skills' : 'required_skills'
          }
        />
      </ScrollArea>
    </Section>
  );
};
