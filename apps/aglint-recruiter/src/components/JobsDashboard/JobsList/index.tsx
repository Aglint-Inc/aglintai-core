import { Avatar } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import React, { useMemo, useState } from 'react';

import { AtsBadge } from '@/devlink/AtsBadge';
import { JobEmptyState } from '@/devlink/JobEmptyState';
import { JobsListingCard } from '@/devlink/JobsListingCard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { FilterHeader } from '@/src/context/Tasks/Filters/FilterHeader';
import { Job } from '@/src/queries/job/types';
import { ScrollList, YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';

import { POSTED_BY } from '../AddJobWithIntegrations/utils';
import { calculateTimeDifference, StatusColor } from '../utils';

interface JobsListProps {
  jobs: Job[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs }) => {
  const isAssessmentEnabled = useFeatureFlagEnabled('isNewAssessmentEnabled');
  const isScreeningEnabled = useFeatureFlagEnabled('isPhoneScreeningEnabled');
  const isSchedulingEnabled = useFeatureFlagEnabled('isSchedulingEnabled');
  const {
    sortOptions,
    setSort,
    sortValue,
    filterOptions,
    filterValues,
    filteredJobs,
    setFilterValues,
  } = useJobFilterAndSort(jobs);

  const router = useRouter();
  if (jobs?.length == 0) {
    return (
      <YTransform uniqueKey={router.query.status}>
        <JobEmptyState />
      </YTransform>
    );
  }
  return (
    <>
      <FilterHeader
        filters={[
          {
            type: 'filter',
            name: 'department',
            options: filterOptions.department,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                department: val,
              });
            },
            value: filterValues.department,
          },
          {
            type: 'filter',
            name: 'Job Location',
            options: filterOptions.location,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                location: val,
              });
            },
            value: filterValues.location,
          },
          {
            type: 'filter',
            name: 'Job type',
            options: filterOptions.type,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                type: val,
              });
            },
            value: filterValues.type,
          },
          {
            type: 'filter',
            name: 'hiring manager',
            options: filterOptions.hiringManager,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                hiringManager: val,
              });
            },
            value: filterValues.hiringManager,
          },
          {
            type: 'filter',
            name: 'recruiter',
            options: filterOptions.recruiter,
            setValue: (val) => {
              setFilterValues({
                ...filterValues,
                recruiter: val,
              });
            },
            value: filterValues.recruiter,
          },
          // {
          //   type: 'filter',
          //   name: 'Job source',
          //   options: filterOptions.source,
          //   setValue: (val) => {
          //     setFilterValues({
          //       ...filterValues,
          //       source: val,
          //     });
          //   },
          //   value: filterValues.source,
          // },
          // {
          //   type: 'filter',
          //   name: 'workplace',
          //   options: filterOptions.workplace,
          //   setValue: (val) => {
          //     setFilterValues({
          //       ...filterValues,
          //       workplace: val,
          //     });
          //   },
          //   value: filterValues.workplace,
          // },
          // filterOptions.coOrdinator.length
          //   ? {
          //       type: 'filter',
          //       name: 'co-ordinator',
          //       options: filterOptions.coOrdinator,
          //       setValue: (val) => {
          //         setFilterValues({
          //           ...filterValues,
          //           coOrdinator: val,
          //         });
          //       },
          //       value: filterValues.coOrdinator,
          //     }
          //   : null,
        ]}
        sort={{
          selected: sortValue,
          setOrder: (order) => {
            setSort({
              ...sortValue,
              ...(order as unknown as typeof sortValue),
            });
          },
          sortOptions: sortOptions as unknown as {
            type: string[];
            order: string[];
          },
        }}
      />
      {filteredJobs?.map((job, ind) => {
        let jobDetails;
        if (job.status == 'draft') {
          jobDetails = job.draft;
        } else {
          jobDetails = job;
        }

        return (
          <>
            <ScrollList uniqueKey={job.id}>
              <JobsListingCard
                isAssessmentPillVisible={isAssessmentEnabled && job.assessment}
                isScreeningPillsVisible={
                  isScreeningEnabled && job.phone_screen_enabled
                }
                isInterviewPillVisible={isSchedulingEnabled}
                slotAtsBadge={
                  job.posted_by == POSTED_BY.LEVER ? (
                    <AtsBadge
                      slotLogo={
                        <Avatar
                          variant='square'
                          src='/images/ats/lever.png'
                          sx={{ width: '100%', height: '14px' }}
                        />
                      }
                    />
                  ) : job.posted_by == POSTED_BY.GREENHOUSE ? (
                    <AtsBadge
                      slotLogo={
                        <Avatar
                          variant='square'
                          src='/images/ats/greenhouse.svg'
                          sx={{ width: '100%', height: '16px', pt: '4px' }}
                        />
                      }
                    />
                  ) : job.posted_by == POSTED_BY.ASHBY ? (
                    <AtsBadge
                      slotLogo={
                        <Avatar
                          variant='square'
                          src='/images/ats/ashby.svg'
                          sx={{ width: '100%', height: '14px', p: '2px' }}
                        />
                      }
                    />
                  ) : (
                    ''
                  )
                }
                key={ind}
                textJobRole={jobDetails?.job_title}
                textCompanyLocation={`${jobDetails?.location}`}
                newCount={job?.count?.new}
                qualifiedCount={job?.count?.qualified}
                assessmentCount={job?.count?.assessment}
                disqualifiedCount={job?.count?.disqualified}
                screeningCount={job?.count?.screening}
                bgColorProps={{
                  style: {
                    backgroundColor:
                      job.status == 'draft'
                        ? StatusColor['inactive']
                        : job.status == 'published'
                          ? StatusColor['active']
                          : StatusColor['closed'],
                  },
                }}
                interviewCount={job?.count?.interview}
                textJobsStatus={job.status}
                slotStatusIcon={
                  <Image
                    src={
                      job.status == 'draft'
                        ? '/images/dashboard/inactive.svg'
                        : job.status == 'published'
                          ? '/images/dashboard/active.svg'
                          : '/images/dashboard/closed.svg'
                    }
                    width={20}
                    height={20}
                    alt=''
                  />
                }
                isJobWarningVisible={
                  job.status == 'published' &&
                  (!job.jd_json || !job.description)
                    ? true
                    : false
                }
                textPostedDate={
                  'Posted ' + calculateTimeDifference(job.created_at)
                }
                onClickCard={{
                  onClick: () => {
                    router.push(`${pageRoutes.JOBS}/${job.id}`);
                    posthog.capture('Job Card Clicked');
                  },
                }}
              />
            </ScrollList>
          </>
        );
      })}
    </>
  );
};

export default JobsList;

const useJobFilterAndSort = (jobs: Job[]) => {
  const { members } = useAuthDetails();
  const sortOptions = {
    type: ['published_date', 'name'] as const,
    order: ['desc', 'asce'] as const,
  };
  const [sort, setSort] = useState<{
    type: (typeof sortOptions.type)[number];
    order: (typeof sortOptions.order)[number];
  }>({
    type: 'published_date',
    order: 'desc',
  });
  const [filterValues, setFilterValues] = useState({
    status: [] as string[],
    location: [] as string[],
    type: [] as string[],
    hiringManager: [] as string[],
    recruiter: [] as string[],
    source: [] as string[],
    department: [] as string[],
    workplace: [] as string[],
    coOrdinator: [] as string[],
  });

  const getFilterOptions = (jobs: Job[]) => {
    const managerId = [
      ...new Set(
        jobs
          .map((job) => job.hiring_manager)
          .filter((item) => Boolean(item))
          .sort((a, b) => a.localeCompare(b)),
      ),
    ];
    const recId = [
      ...new Set(
        jobs
          .map((job) => job.recruiter)
          .filter((item) => Boolean(item))
          .sort((a, b) => a.localeCompare(b)),
      ),
    ];
    return {
      location: [...new Set(jobs.map((job) => job.location || ''))],
      type: [...new Set(jobs.map((job) => job.job_type || ''))],
      hiringManager: members
        .filter((member) => {
          return managerId.includes(member.user_id);
        })
        .map((item) => {
          return {
            id: item.user_id,
            label: `${item.first_name} ${item.last_name}`.trim(),
          };
        }),
      recruiter: members
        .filter((member) => {
          return recId.includes(member.user_id);
        })
        .map((item) => {
          return {
            id: item.user_id,
            label: `${item.first_name} ${item.last_name}`.trim(),
          };
        }),
      source: [
        ...new Set(
          jobs.map((job) => job.posted_by).filter((item) => Boolean(item)),
        ),
      ],
      department: [
        ...new Set(
          jobs.map((job) => job.department).filter((item) => Boolean(item)),
        ),
      ],
      workplace: [
        ...new Set(
          jobs.map((job) => job.workplace_type).filter((item) => Boolean(item)),
        ),
      ],
      coOrdinator: [
        ...new Set(
          jobs
            .map((job) => job.interview_coordinator)
            .filter((item) => Boolean(item)),
        ),
      ],
    };
  };
  // console.log(sort);

  const locationFilterValues = String(
    filterValues.location.sort((a, b) => a.localeCompare(b)),
  );
  const typeFilterValues = String(
    filterValues.type.sort((a, b) => a.localeCompare(b)),
  );
  const hiringManagerFilterValues = String(
    filterValues.hiringManager.sort((a, b) => a.localeCompare(b)),
  );
  const recruiterFilterValues = String(
    filterValues.recruiter.sort((a, b) => a.localeCompare(b)),
  );
  const sourceFilterValues = String(
    filterValues.source.sort((a, b) => a.localeCompare(b)),
  );
  const departmentFilterValues = String(
    filterValues.department.sort((a, b) => a.localeCompare(b)),
  );
  const workplaceFilterValues = String(
    filterValues.workplace.sort((a, b) => a.localeCompare(b)),
  );
  const coOrdinatorFilterValues = String(
    filterValues.coOrdinator.sort((a, b) => a.localeCompare(b)),
  );

  const filteredJobs = useMemo(() => {
    let temp = [...jobs];
    if (filterValues.location.length)
      temp = temp.filter((job) => filterValues.location.includes(job.location));
    if (filterValues.type.length)
      temp = temp.filter((job) => filterValues.type.includes(job.job_type));
    if (filterValues.hiringManager.length)
      temp = temp.filter((job) =>
        filterValues.hiringManager.includes(job.hiring_manager || ''),
      );
    if (filterValues.source.length)
      temp = temp.filter((job) =>
        filterValues.source.includes(job.posted_by || ''),
      );
    if (filterValues.department.length)
      temp = temp.filter((job) =>
        filterValues.department.includes(job.department || ''),
      );
    if (filterValues.workplace.length)
      temp = temp.filter((job) =>
        filterValues.workplace.includes(job.workplace_type || ''),
      );
    if (filterValues.recruiter.length)
      temp = temp.filter((job) =>
        filterValues.recruiter.includes(job.recruiter || ''),
      );
    if (filterValues.coOrdinator.length)
      temp = temp.filter((job) =>
        filterValues.coOrdinator.includes(job.interview_coordinator || ''),
      );
    return temp;
  }, [
    jobs,
    locationFilterValues,
    typeFilterValues,
    hiringManagerFilterValues,
    recruiterFilterValues,
    sourceFilterValues,
    departmentFilterValues,
    workplaceFilterValues,
    coOrdinatorFilterValues,
  ]);
  const sortedJobs = useMemo(() => {
    return filteredJobs.sort((a, b) => {
      if (sort.type === 'name') {
        return (
          a.job_title.localeCompare(b.job_title) *
          (sort.order === 'asce' ? 1 : -1)
        );
      } else {
        return (
          (new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()) *
          (sort.order === 'desc' ? 1 : -1)
        );
      }
    });
  }, [filteredJobs, sort.order, sort.type]);
  let filterOptions = getFilterOptions(filteredJobs);
  return {
    sortOptions,
    setSort,
    sortValue: sort,
    filterOptions,
    filterValues,
    setFilterValues,
    filteredJobs: sortedJobs,
  };
};
