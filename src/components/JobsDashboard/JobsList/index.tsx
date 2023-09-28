import { Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { JobEmptyState, JobsListingCard } from '@/devlink';
import { palette } from '@/src/context/Theme/Theme';
import { JobDB } from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';

import { JobType } from '../types';
import {
  calculateTimeDifference,
  filterApplicationsByStatus,
  StatusColor,
} from '../utils';
import Icon from '../../Common/Icons/Icon';

interface JobsListProps {
  jobs: JobType[];
  applications: JobDB[];
}

const JobsList: React.FC<JobsListProps> = ({ jobs, applications }) => {
  const router = useRouter();
  if (jobs.length == 0) {
    return (
      <JobEmptyState
        onClickHere={{
          onClick: () => {
            router.push(pageRoutes.JOBS + '?flow=create', undefined, {
              shallow: true,
            });
          },
        }}
      />
    );
  }
  return (
    <Stack>
      {jobs?.map((job, ind) => {
        return (
          <JobsListingCard
            key={ind}
            textJobRole={job.job_title}
            postedCompanyName={job.company}
            textCompanyLocation={`${job.company}, ${job.location}`}
            applicantCount={
              filterApplicationsByStatus(job.id, applications).length
            }
            interviewingCount={
              filterApplicationsByStatus(job.id, applications, 'interviewing')
                .length
            }
            shortlistedCount={
              filterApplicationsByStatus(job.id, applications, 'shortlisted')
                .length
            }
            bgColorProps={{
              style: { backgroundColor: StatusColor[job.status] },
            }}
            textJobsStatus={job.status}
            slotCompanyLogo={
              <Avatar
                variant='rounded'
                sx={{
                  zIndex: 0,
                  color: 'common.black',
                  '& .MuiAvatar-img ': {
                    objectFit: 'contain',
                  },
                  height: '54px',
                  width: '54px',
                  textTransform: 'capitalize',
                  background: palette.grey[100],
                }}
                src={job.logo}
                alt={job.job_title}
              >
                <Stack
                  sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    background: palette.grey[200],
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon variant='CompanyOutlined' />
                </Stack>
              </Avatar>
            }
            textPostedDate={calculateTimeDifference(job.created_at)}
            slotPostedCompany={
              <Avatar
                variant='rounded'
                sx={{
                  zIndex: 0,
                  color: 'common.black',
                  '& .MuiAvatar-img ': {
                    objectFit: 'contain',
                  },
                  height: '32px',
                  width: '32px',
                  textTransform: 'capitalize',
                  background: palette.grey[100],
                }}
                src={'/images/favicon.ico'}
                alt={job.job_title}
              >
                <Stack
                  direction={'row'}
                  sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    background: palette.grey[200],
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon variant='CompanyOutlined' />
                </Stack>
              </Avatar>
            }
            onClickCard={{
              onClick: () => {
                router.push(`${pageRoutes.JOBS}/${job.id}`);
              },
            }}
          />
        );
      })}
    </Stack>
  );
};

export default JobsList;
