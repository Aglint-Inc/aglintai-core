import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Building2, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';
import { type CompanyPostAPI } from '@/pages/api/jobpost/company';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import Footer from '../Common/Footer';

type CompanyJobPostType = CompanyPostAPI;

const CompanyJobPost: React.FC<CompanyJobPostType> = ({ recruiter, jobs }) => {
  const router = useRouterPro();

  const filteredJobs = jobs.filter((job: any) => job.status === 'published');

  return (
    <div className='h-screen overflow-auto pb-6'>
      <Card className='m-4'>
        <CardHeader>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage src={recruiter.logo!} alt={recruiter.name} />
              <AvatarFallback>
                <Building2 className='h-12 w-12' />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{recruiter.name}</CardTitle>
              <p className='text-sm text-muted-foreground'>
                {recruiter.industry || '--'}
              </p>
              <p className='text-sm text-muted-foreground'>
                {recruiter.employee_size || '--'} employees
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {recruiter.company_overview && (
            <div className='mb-6'>
              <h3 className='mb-2 text-lg font-semibold'>About</h3>
              <p>{recruiter.company_overview}</p>
            </div>
          )}

          {recruiter?.socials && (
            <div className='mb-6'>
              <h3 className='mb-2 text-lg font-semibold'>Social Links</h3>
              <div className='flex space-x-2'>
                {Object.entries(recruiter.socials).map(
                  ([platform, link], index) => {
                    if (platform === 'custom' || !link) return null;
                    return (
                      <Button
                        key={index}
                        variant='outline'
                        size='sm'
                        onClick={() => window.open(link as string, '_blank')}
                      >
                        <Image
                          src={`/images/social/${platform}.svg`}
                          height={16}
                          width={16}
                          alt={platform}
                          className={
                            platform === 'twitter'
                              ? 'rounded bg-white p-0.5'
                              : ''
                          }
                        />
                        <span className='ml-2 capitalize'>{platform}</span>
                      </Button>
                    );
                  },
                )}
              </div>
            </div>
          )}

          {recruiter?.office_locations &&
            recruiter.office_locations.length > 0 && (
              <div className='mb-6'>
                <h3 className='mb-2 text-lg font-semibold'>Office Locations</h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  {recruiter.office_locations.map((loc: any, index) => (
                    <Card key={index}>
                      <CardContent className='p-4'>
                        <MapPin className='mb-2 h-5 w-5' />
                        <p className='font-semibold'>
                          {capitalizeAll(loc.city)}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {[
                            capitalizeAll(loc.region),
                            capitalizeAll(loc.country),
                            capitalizeAll(loc.zipcode),
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

          <div>
            <h3 className='mb-2 text-lg font-semibold'>
              Open Positions ({filteredJobs.length})
            </h3>
            {filteredJobs.length === 0 ? (
              <p className='text-center text-muted-foreground'>
                No Jobs Found.
              </p>
            ) : (
              <div className='space-y-4'>
                {filteredJobs.map((job, index) => (
                  <Card key={index}>
                    <CardContent className='p-4'>
                      <div className='flex items-start justify-between'>
                        <div>
                          <h4 className='font-semibold'>
                            {job.job_title || '--'}
                          </h4>
                          <p className='text-sm text-muted-foreground'>
                            {job.departments?.name || '--'}
                          </p>
                          <div className='mt-2 flex space-x-2'>
                            <Badge variant='secondary'>
                              {job.job_type || '--'}
                            </Badge>
                            <Badge variant='secondary'>Location: ---</Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            router.push(
                              ROUTES['/job-post/[id]']({ id: job.id }),
                            )
                          }
                        >
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Footer brand={true} />
    </div>
  );
};

export default CompanyJobPost;
