import { Avatar } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import {
  CompanyListing,
  CompanyListingLinks,
  OfficeLocationCard,
  OpenJobListingCard,
} from '@/devlink';
import { palette } from '@/src/context/Theme/Theme';
import { JobTypeDB, RecruiterDB } from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';

import Icon from '../Common/Icons/Icon';

interface CompanyJobPostType {
  recruiter: RecruiterDB;
  jobs: JobTypeDB[];
}

const CompanyJobPost: React.FC<CompanyJobPostType> = ({ recruiter, jobs }) => {
  const router = useRouter();
  return (
    <div>
      <CompanyListing
        slotCompanyImage={
          <Avatar
            variant='rounded'
            src={recruiter.logo}
            sx={{
              p: '4px',
              color: 'common.black',
              '& .MuiAvatar-img ': {
                objectFit: 'contain',
              },
              height: '150px',
              width: '150px',
              background: palette.grey[100],
            }}
          >
            <Icon variant='CompanyOutlinedBig' />
          </Avatar>
        }
        textCompanyName={recruiter.name}
        textCompanyAbout={recruiter.company_overview}
        textCompanyType={recruiter.industry || '--'}
        textEmployeeCount={recruiter.employee_size || '--'}
        textHeaderDiscription={recruiter.company_values}
        slotOpenJobListing={jobs.map((job, ind) => {
          return (
            <OpenJobListingCard
              key={ind}
              textJobRole={job.job_title || '--'}
              textCompanyType={'--'}
              textLocation={job.location || '--'}
              textWorkingType={job.job_type || '--'}
              onClickApplyNow={{
                onClick: () => {
                  router.push(pageRoutes.JOBPOST + job.id);
                },
              }}
            />
          );
        })}
        slotCompanyLinks={
          recruiter?.socials &&
          Object.entries(recruiter?.socials)?.map((soc, ind) => {
            if (soc[0] === 'custom') {
              return null; // Skip this iteration
            }
            return (
              <CompanyListingLinks
                key={ind}
                slotIcon={
                  <Image
                    src={`/images/logo/${soc[0]}.svg`}
                    height={16}
                    width={16}
                    alt=''
                  />
                }
                textLinkName={soc[0]}
                onClickLink={{
                  onClick: () => {
                    window.open(soc[1], '_blank');
                  },
                }}
              />
            );
          })
        }
        slotOfficeLocaionCard={recruiter?.office_locations.map((loc, ind) => {
          return (
            <OfficeLocationCard
              key={ind}
              textAddress={loc}
              textCountry={''}
              textJobPostCount={`${
                jobs.filter((job) => job.location.includes(loc)).length
              } Jobs`}
            />
          );
        })}
      />
    </div>
  );
};

export default CompanyJobPost;
