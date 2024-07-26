import { Avatar, Stack } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { CompanyListing } from '@/devlink/CompanyListing';
import { CompanyListingLinks } from '@/devlink/CompanyListingLinks';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { OfficeLocationCard } from '@/devlink/OfficeLocationCard';
import { OpenJobListingCard } from '@/devlink/OpenJobListingCard';
import { CompanyPostAPI } from '@/src/pages/api/jobpost/company';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import Footer from '../Common/Footer';
import Icon from '../Common/Icons/Icon';

type CompanyJobPostType = CompanyPostAPI;

const CompanyJobPost: React.FC<CompanyJobPostType> = ({ recruiter, jobs }) => {
  const router = useRouter();

  const filteredJobs = jobs.filter((job: any) => job.status === 'published');
  return (
    <Stack sx={{ overflow: 'auto', height: '100vh', paddingBottom: '24px' }}>
      <CompanyListing
        isAboutJobVisible={!!recruiter.company_overview}
        isOfficeLocationVisible={!!recruiter.office_locations}
        slotCompanyImage={
          <Avatar
            variant='rounded'
            src={recruiter.logo}
            sx={{
              p: 'var(--space-1)',
              color: 'common.black',
              '& .MuiAvatar-img ': {
                objectFit: 'contain',
              },
              height: '100%',
              width: '100%',
              background: 'var(--neutral-1)',
            }}
          >
            <Icon variant='CompanyOutlinedBig' height='100%' width='100%' />
          </Avatar>
        }
        textCompanyName={recruiter.name}
        textCompanyAbout={recruiter.company_overview}
        textCompanyType={recruiter.industry || '--'}
        textEmployeeCount={recruiter.employee_size || '--'}
        // isHeaderDescriptionVisible={Boolean(recruiter.company_values)}
        textHeaderDiscription={recruiter.company_values}
        textOpenJobCount={filteredJobs.length}
        slotOpenJobListing={
          <>
            {filteredJobs.length == 0 && (
              <GlobalEmptyState textDesc='No Jobs Found.' iconName='work' />
            )}
            {filteredJobs.map((job, ind) => {
              return (
                <OpenJobListingCard
                  key={ind}
                  textJobRole={job.job_title || '--'}
                  textCompanyType={job.department || '--'}
                  textLocation={job.location || '--'}
                  textWorkingType={job.job_type || '--'}
                  onClickApplyNow={{
                    onClick: () => {
                      router.push(ROUTES['/job-post/[id]']({ id: job.id }));
                    },
                  }}
                />
              );
            })}
          </>
        }
        slotCompanyLinks={
          recruiter?.socials &&
          Object.entries(recruiter?.socials)?.map((soc, ind) => {
            if (soc[0] === 'custom') {
              return null;
            } else if (soc[0] !== 'custom' && !soc[1]) {
              return null;
            }
            return (
              <CompanyListingLinks
                key={ind}
                slotIcon={
                  <Image
                    style={{
                      background: soc[0] == 'twitter' ? '#fff' : '',
                      borderRadius: 'var(--radius-2)',
                      padding: soc[0] == 'twitter' ? '2px ' : '',
                    }}
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
        slotOfficeLocaionCard={recruiter?.office_locations.map(
          (loc: any, ind) => {
            return (
              <OfficeLocationCard
                key={ind}
                textAddress={
                  [
                    capitalizeAll(loc.region),
                    capitalizeAll(loc.country),
                    capitalizeAll(loc.zipcode),
                  ]
                    .filter(Boolean)
                    .join(', ') || ''
                }
                textCountry={capitalizeAll(loc.city)}
                textHeadquater={'asda'}
                textJobPostCount={`${
                  jobs?.filter((job) => job?.location?.includes(loc.city))
                    .length
                } Jobs`}
              />
            );
          },
        )}
      />
      <Footer brand={true} />
    </Stack>
  );
};

export default CompanyJobPost;
