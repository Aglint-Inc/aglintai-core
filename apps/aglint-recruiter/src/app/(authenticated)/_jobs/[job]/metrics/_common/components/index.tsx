/* eslint-disable security/detect-object-injection */
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { Loader } from '@/components/Common/Loader';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { JobNotFound } from '@/job/components/JobNotFound';
import { SharedActions } from '@/job/components/SharedTopNav/actions';
import { SharedBreadCrumbs } from '@/job/components/SharedTopNav/breadcrumbs';
import { useJob, useJobDashboard, useJobParams } from '@/job/hooks';
import { type Job } from '@/queries/jobs/types';
import { getFullName } from '@/utils/jsonResume';
import { getScheduleType } from '@/utils/scheduling/colors_and_enums';

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

  const { getParams } = useJobParams();

  const score_matches = getMatches(job.application_match, Number(total) || 0);

  const handleFilter = (
    resume_match: Parameters<typeof getParams>[0]['resume_match'][number],
  ) => {
    const params = getParams({ resume_match: [resume_match] });
    push(`/jobs/${job.id}${params ? `?${params}` : ''}`);
  };

  // const [, setStorage] = useLocalStorage('scheduleFilterIds');

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='mb-2 text-2xl font-bold'>Job Analytics</h1>
            <SharedBreadCrumbs />
          </div>
          <SharedActions />
        </div>

        <div className='mb-6 flex flex-col gap-6'>
          <div>
            <div className='flex flex-col gap-4 py-4'>
              {/* {banners.length > 0 && (
                <div className='flex flex-col gap-1'>
                  {banners.map((banner, i) => (
                    <Fragment key={i}>{banner}</Fragment>
                  ))}
                </div>
              )}

              <div className='space-y-4'>
                <Pipeline />
              </div> */}

              <div className='space-y-4 rounded-lg border bg-white p-4'>
                <JobStats
                  isScoringEnabled={isScoringEnabled}
                  score_matches={score_matches}
                  handleFilter={handleFilter}
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-4'>
                <Doughnut />
                <Bars />
              </div>

              {/* Bottom Left */}
              <div className='space-y-4'>
                <LineGraph />
                <TenureAndExpSummary />
              </div>

              {/* Bottom Right */}
              <div className='space-y-4'>
                <Schedules
                  schedule={schedule}
                  // setStorage={setStorage}
                  push={push}
                  // job={job}
                />
                {/* <Roles /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobStats = ({ isScoringEnabled, score_matches, handleFilter }) => (
  <div className='flex space-x-12 overflow-x-auto'>
    {isScoringEnabled && (
      <>
        <StatItem
          label='Top Match'
          percentage={score_matches?.top_match?.percentage ?? '---'}
          count={score_matches?.top_match?.count ?? '---'}
          onClick={() => handleFilter('top_match')}
          color='bg-green-500'
        />
        <StatItem
          label='Good Match'
          percentage={score_matches?.good_match?.percentage ?? '---'}
          count={score_matches?.good_match?.count ?? '---'}
          onClick={() => handleFilter('good_match')}
          color='bg-lime-500'
        />
        <StatItem
          label='Average Match'
          percentage={score_matches?.average_match?.percentage ?? '---'}
          count={score_matches?.average_match?.count ?? '---'}
          onClick={() => handleFilter('average_match')}
          color='bg-yellow-500'
        />
        <StatItem
          label='Below Average'
          percentage={score_matches?.poor_match?.percentage ?? '---'}
          count={score_matches?.poor_match?.count ?? '---'}
          onClick={() => handleFilter('poor_match')}
          color='bg-orange-500'
        />
        <StatItem
          label='Not a Match'
          percentage={score_matches?.not_a_match?.percentage ?? '---'}
          count={score_matches?.not_a_match?.count ?? '---'}
          onClick={() => handleFilter('not_a_match')}
          color='bg-red-500'
        />
      </>
    )}
  </div>
);

const StatItem = ({ label, percentage, count, onClick, color }) => (
  <div className='mx-auto w-full max-w-4xl p-4' onClick={onClick}>
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
        <div className='mt-1 text-xs text-gray-500'>({count})</div>
      </div>
    </div>
  </div>
);

// const Roles = () => {
//   const { push } = useRouter();
//   const { job } = useJobDashboard();
//   const { data, status } = useCompanyMembers();
//   const { hiring_manager, recruiter, recruiting_coordinator, sourcer } = job;
//   const coordinatorsData = {
//     hiring_manager,
//     recruiter,
//     recruiting_coordinator,
//     sourcer,
//   };
//   const coordinators = useMemo(() => {
//     return (
//       Object.entries(coordinatorsData)
//         // eslint-disable-next-line no-unused-vars
//         .filter(([_, value]) => value)
//         .reduce((acc, [key, value], i) => {
//           const user = (data ?? []).find(({ user_id }) => user_id === value);
//           if (user) {
//             const name = getFullName(
//               user?.first_name ?? null,
//               user?.last_name ?? null,
//             );
//             acc.push(
//               <div key={i} className='flex items-center space-x-3'>
//                 <Avatar className='h-10 w-10 rounded-md'>
//                   <AvatarImage
//                     src={user?.profile_image ?? undefined}
//                     alt={name}
//                   />
//                   <AvatarFallback>{name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div className='flex flex-col'>
//                   <Link
//                     href={`/user/profile/${user.user_id}`}
//                     className='font-medium hover:underline'
//                   >
//                     {name}
//                   </Link>
//                   <span className='text-sm text-gray-500'>
//                     {user?.position ?? '--'}
//                   </span>
//                   <span className='text-xs text-gray-400'>
//                     {capitalizeAll(key)}
//                   </span>
//                 </div>
//               </div>,
//             );
//           }
//           return acc;
//         }, [])
//     );
//   }, [
//     status,
//     job,
//     hiring_manager,
//     recruiter,
//     recruiting_coordinator,
//     sourcer,
//     data,
//   ]);
//   if (status !== 'success' || coordinators.length === 0) return <></>;
//   return (
//     <div className='space-y-4'>
//       <div className='flex justify-between items-center'>
//         <h2 className='text-xl font-semibold'>Hiring Team</h2>
//         <Button
//           variant='outline'
//           size='sm'
//           onClick={() =>
//             push(ROUTES['/jobs/[job]/hiring-team']({ job: job?.id }))
//           }
//         >
//           <Pencil className='h-4 w-4 mr-2' />
//           Edit
//         </Button>
//       </div>
//       <div className='space-y-3'>
//         {coordinators.map((coordinator, index) => (
//           <div
//             key={index}
//             className='flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'
//             onClick={() =>
//               push(
//                 `/user/profile/${coordinator.props.children[1].props.children[0].props.href.split('/').pop()}`,
//               )
//             }
//           >
//             {coordinator}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Pipeline = () => {
//   const { job } = useJobDashboard();
//   const { getParams } = useJobParams();
//   const { push } = useRouter();
//   const newSections = Object.entries(job?.section_count ?? {}).reduce(
//     (acc, [key, value]) => {
//       acc[key] = {
//         count: Number(value),
//         label: getPlural(Number(value), 'candidate'),
//       };
//       return acc;
//     },
//     {} as {
//       // eslint-disable-next-line no-unused-vars
//       [_id in keyof Job['section_count']]: { count: number; label: string };
//     },
//   );
//   const handlClick = (section: Application['status']) => {
//     const params = getParams({ section });
//     push(`/jobs/${job.id}${params ? `?${params}` : ''}`);
//   };
//   return (
//     <>
//       <div className='flex flex-row justify-between gap-1'>
//         <PipeLine
//           isLeft={false}
//           textCandidateCount={newSections.new.label}
//           textName={capitalize('new')}
//           onClickPipeline={{
//             onClick: () => handlClick('new'),
//           }}
//         />
//         <PipeLine
//           textCandidateCount={newSections.interview.label}
//           textName={capitalize('interview')}
//           onClickPipeline={{
//             onClick: () => handlClick('interview'),
//           }}
//         />
//         <PipeLine
//           textCandidateCount={newSections.qualified.label}
//           textName={capitalize('qualified')}
//           onClickPipeline={{
//             onClick: () => handlClick('qualified'),
//           }}
//         />
//         <PipeLine
//           isRight={false}
//           textCandidateCount={newSections.disqualified.label}
//           textName={capitalize('disqualified')}
//           onClickPipeline={{
//             onClick: () => handlClick('disqualified'),
//           }}
//         />
//       </div>
//     </>
//   );
// };

const Schedules = ({ schedule, push }) => {
  if (schedule?.status === 'pending') return <Loader />;
  if (schedule?.status === 'error') return <>Error</>;
  if (schedule?.data.length === 0) return <NoDataAvailable />;
  const cards = schedule?.data
    .sort(
      (a, b) =>
        (dayjs(a.interview_meeting.start_time) as any) -
        (dayjs(b.interview_meeting.start_time) as any),
    )
    .slice(0, 3)
    .map((sch, i) => (
      <div
        key={i}
        className='cursor-pointer'
        onClick={() =>
          push(
            `/scheduling/view?meeting_id=${sch.interview_meeting.id}&tab=job_details`,
          )
        }
      >
        <Card className='w-full'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {dayjs(sch.interview_meeting.end_time).format('DD MMM')}
            </CardTitle>
            <Avatar className='h-7 w-7'>
              <AvatarImage
                src={sch.candidates.avatar}
                alt={getFullName(
                  sch.candidates.first_name,
                  sch.candidates.last_name,
                )}
              />
              <AvatarFallback>
                {getFullName(
                  sch.candidates.first_name,
                  sch.candidates.last_name,
                ).charAt(0)}
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {dayjs(sch.interview_meeting.end_time).format('dddd')}
            </div>
            <p className='text-xs text-muted-foreground'>
              {getScheduleType(sch.interview_session.schedule_type)}
            </p>
            <div className='mt-4 flex items-center'>
              <IconScheduleType type={sch.interview_session.schedule_type} />
              <span className='ml-2 text-sm font-medium'>
                {sch.interview_session.name}
              </span>
            </div>
            <div className='mt-2 text-xs text-muted-foreground'>
              {`${dayjs(sch.interview_meeting.start_time).format('hh:mm A')} - ${dayjs(sch.interview_meeting.end_time).format('hh:mm A')}`}
            </div>
            <div className='mt-4 text-sm font-medium'>
              {getFullName(sch.candidates.first_name, sch.candidates.last_name)}
            </div>
          </CardContent>
        </Card>
      </div>
    ));
  return <div className='flex h-full w-full flex-col gap-2'>{cards}</div>;
};

// const useBanners = () => {
//   const { push } = useRouter();
//   const { job, publishStatus, handleJobUpdate } = useJob();
//   const { isInterviewPlanDisabled, isInterviewSessionEmpty, status } =
//     useJobDashboard();

//   const banners: React.JSX.Element[] = [];
//   if (isInterviewPlanDisabled)
//     banners.push(
//       <>
//         <UIAlert
//           title='Interview plan not set'
//           type='inline'
//           color={'warning'}
//           actions={
//             <>
//               <UIButton
//                 variant='secondary'
//                 size='sm'
//                 onClick={() =>
//                   push(ROUTES['/jobs/[job]/interview-plan']({ job: job?.id }))
//                 }
//               >
//                 Ignore
//               </UIButton>
//               <UIButton
//                 variant='default'
//                 size='sm'
//                 onClick={() =>
//                   handleJobUpdate({ interview_plan_warning_ignore: true })
//                 }
//               >
//                 View
//               </UIButton>
//             </>
//           }
//         />
//         {/* <Banner
//           type='warning'
//           title='Interview plan not set'
//           description='To use the scheduling module, enable interview plans for this job.'
//           primary={{
//             title: 'Ignore',
//             onClick: () =>
//               push(ROUTES['/jobs/[job]/interview-plan']({ id: job?.id })),
//           }}
//           secondary={{
//             title: 'View',
//             onClick: () =>
//               handleJobUpdate({ interview_plan_warning_ignore: true }),
//           }}
//         /> */}
//         ,
//       </>,
//     );
//   if (isInterviewSessionEmpty)
//     banners.push(
//       <>
//         <UIAlert
//           title='Interview plan not set'
//           color={'warning'}
//           type='inline'
//           actions={
//             <>
//               <UIButton
//                 variant='secondary'
//                 size='sm'
//                 onClick={() =>
//                   push(ROUTES['/jobs/[job]/interview-plan']({ job: job?.id }))
//                 }
//               >
//                 Ignore
//               </UIButton>
//               <UIButton
//                 variant='default'
//                 size='sm'
//                 onClick={() =>
//                   handleJobUpdate({ interview_session_warning_ignore: true })
//                 }
//               >
//                 View
//               </UIButton>
//             </>
//           }
//         />
//       </>,
//     );
//   if (
//     !publishStatus.detailsValidity.validity ||
//     !publishStatus.hiringTeamValidity.validity
//   ) {
//     if (!publishStatus.detailsValidity.validity) {
//       banners.push(
//         <UIAlert
//           title={publishStatus.detailsValidity.message}
//           iconName='CircleAlert'
//           color={'error'}
//           actions={
//             <>
//               <UIButton
//                 variant='destructive'
//                 size='sm'
//                 onClick={() =>
//                   push(ROUTES['/jobs/[job]/job-details']({ job: job?.id }))
//                 }
//               >
//                 View
//               </UIButton>
//             </>
//           }
//           type='inline'
//         />,
//       );
//     }
//     if (!publishStatus.hiringTeamValidity.validity) {
//       banners.push(
//         <UIAlert
//           iconName='CircleAlert'
//           color={'error'}
//           title='Hiring team not set'
//           actions={
//             <UIButton
//               variant='destructive'
//               size='sm'
//               onClick={() =>
//                 push(ROUTES['/jobs/[job]/hiring-team']({ job: job?.id }))
//               }
//             >
//               Set Now
//             </UIButton>
//           }
//           type={'inline'}
//         />,
//       );
//     }
//   } else if (publishStatus.loading)
//     banners.push(
//       <BannerLoading
//         slotLoader={
//           <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900'></div>
//         }
//       />,
//     );
//   else if (!publishStatus.jdValidity)
//     banners.push(
//       <Banner
//         type='error'
//         title={'Profile score is empty'}
//         description='Candidates cannot be scored without scoring criterias. Please ensure that valid scoring criterias are provided.'
//         primary={{
//           title: 'View',
//           onClick: () =>
//             push(ROUTES['/jobs/[job]/profile-score']({ job: job?.id })),
//         }}
//       />,
//     );
//   else if (status.scoring_criteria_changed)
//     banners.push(
//       <Banner
//         type='warning'
//         title='Profile score has been updated'
//         description='You may need to publish changes to score applicants with the current profile score'
//         primary={{
//           title: 'View',
//           onClick: () =>
//             push(ROUTES['/jobs/[job]/profile-score']({ job: job?.id })),
//         }}
//         secondary={{
//           title: 'Revert',
//           onClick: () =>
//             handleJobUpdate({
//               parameter_weights: distributeScoreWeights(job.jd_json),
//               draft: { ...job.draft, jd_json: job.jd_json },
//             }),
//         }}
//       />,
//     );
//   if (status.description_changed)
//     banners.push(
//       <Banner
//         type='warning'
//         title={'Job details changed.'}
//         description='Please publish the updates.'
//         primary={{
//           title: 'View',
//           onClick: () =>
//             push(ROUTES['/jobs/[job]/job-details']({ job: job?.id })),
//         }}
//         secondary={{
//           title: 'Revert',
//           onClick: () =>
//             handleJobUpdate({
//               draft: {
//                 ...job.draft,
//                 location_id: job.location_id,
//                 department_id: job.department_id,
//                 description: job.description,
//                 job_title: job.job_title,
//                 job_type: job.job_type,
//                 workplace_type: job.workplace_type,
//               },
//             }),
//         }}
//       />,
//       // <Banner
//       //   type='warning'
//       //   title={'Job details changed.'}
//       //   description='Please publish the updates.'
//       //   primary={{
//       //     title: 'View',
//       //     onClick: () =>
//       //       push(ROUTES['/jobs/[job]/job-details']({ id: job?.id })),
//       //   }}
//       //   secondary={{
//       //     title: 'Revert',
//       //     onClick: () =>
//       //       handleJobUpdate({
//       //         draft: {
//       //           ...job.draft,
//       //           department_id: job.department_id,
//       //           description: job.description,
//       //           job_title: job.job_title,
//       //           job_type: job.job_type,
//       //           location: job.location,
//       //           workplace_type: job.workplace_type,
//       //         },
//       //       }),
//       //   }}
//       // />,
//     );
//   return banners;
// };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>
          Location Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='city'>
          <TabsList>
            {Object.entries(options).map(([key, value]) => (
              <TabsTrigger key={key} value={key}>
                {value}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.keys(options).map((key) => (
            <TabsContent key={key} value={key}>
              <DashboardDoughnutChart option={key as keyof typeof options} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>
          Experience and Tenure
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='experience'>
          <TabsList>
            {Object.entries(options).map(([key, value]) => (
              <TabsTrigger key={key} value={key}>
                {value}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.keys(options).map((key) => (
            <TabsContent key={key} value={key}>
              <DashboardLineChart option={key as keyof typeof options} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

const Bars = () => {
  const options: DashboardGraphOptions<'skills'> = {
    top_skills: 'Top skills',
    required_skills: 'Skills mentioned in JD',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='top_skills'>
          <TabsList>
            {Object.entries(options).map(([key, value]) => (
              <TabsTrigger key={key} value={key}>
                {value}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.keys(options).map((key) => (
            <TabsContent key={key} value={key}>
              <DashboardBarChart option={key as keyof typeof options} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

// type BaseBanner = {
//   title: string;
//   description: string;
//   primary: {
//     title: string;
//     onClick: () => void;
//   };
//   secondary: {
//     title: string;
//     onClick: () => void;
//   };
// };

// type BannerProps =
//   | ({ type: 'warning' } & BaseBanner)
//   | ({ type: 'error' } & Omit<BaseBanner, 'secondary'>);
