import {
  Briefcase,
  Building2,
  ExternalLink,
  Globe,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { type CompanyPostAPI } from '@/src/pages/api/jobpost/company';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import Footer from '../Common/Footer';

type CompanyJobPostType = CompanyPostAPI;

const CompanyJobPost: React.FC<CompanyJobPostType> = ({ recruiter, jobs }) => {
  const router = useRouterPro();

  const filteredJobs = jobs.filter((job: any) => job.status === 'published');

  return (
    <div className='min-h-screen bg-white'>
      <ScrollArea className='h-screen'>
        <div className='py-24 border-b border-gray-200'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center justify-center space-y-8'>
              <Avatar className='h-24 w-24 rounded border border-gray-200'>
                {recruiter.logo ? (
                  <img
                    src={recruiter.logo}
                    alt={recruiter.name}
                    className='object-cover'
                  />
                ) : (
                  <Building2 className='h-16 w-16 text-gray-400' />
                )}
              </Avatar>
              <div className='text-center'>
                <h1 className='text-4xl font-bold'>{recruiter.name}</h1>
                <p className='text-xl text-gray-600 mt-2'>
                  {recruiter.industry || 'Industry not specified'}
                </p>
              </div>
              {recruiter?.socials &&
                Object.entries(recruiter.socials).length > 0 && (
                  <div className='text-center'>
                    <div className='flex flex-wrap justify-center gap-4'>
                      {Object.entries(recruiter.socials).map(
                        ([platform, link], index) => {
                          if (platform === 'custom' || !link) return null;
                          return (
                            <Button
                              key={index}
                              variant='outline'
                              size='sm'
                              onClick={() =>
                                window.open(link as string, '_blank')
                              }
                              className='flex items-center space-x-2 bg-white text-black hover:bg-gray-200'
                            >
                              <Image
                                src={`/images/logo/${platform}.svg`}
                                height={16}
                                width={16}
                                alt={platform}
                                className={
                                  platform === 'twitter'
                                    ? 'bg-white rounded p-0.5'
                                    : ''
                                }
                              />
                              <span className='capitalize'>{platform}</span>
                              <ExternalLink className='h-4 w-4' />
                            </Button>
                          );
                        },
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className='container w-3/4 mx-auto py-8 px-4 sm:px-6 lg:px-8'>
          <div className='bg-white'>
            <div className='px-4 py-5 sm:p-6'>
              <div className='mb-8'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                  About the Company
                </h2>
                <div className='flex flex-row gap-6 mb-4'>
                  <div className='flex items-center space-x-2'>
                    <Globe className='h-4 w-4' />
                    <span className='text-sm text-gray-600'>
                      {recruiter.industry || 'Industry not specified'}
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Briefcase className='h-4 w-4' />
                    <span className='text-sm text-gray-600'>
                      {recruiter.employee_size || 'Employee size not specified'}
                    </span>
                  </div>
                </div>
                {recruiter.company_overview && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: recruiter.company_overview,
                    }}
                  />
                )}
              </div>

              {recruiter.office_locations &&
                recruiter.office_locations.length > 0 && (
                  <div className='mb-8'>
                    <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                      Office Locations
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {recruiter.office_locations.map((loc, index) => (
                        <Card key={index} className='p-4 bg-gray-50'>
                          <div className='flex items-start space-x-3'>
                            <MapPin className='h-5 w-5 mt-1' />
                            <div>
                              <p className='font-medium text-gray-900'>
                                {capitalizeAll(loc.city)}
                              </p>
                              <p className='text-sm text-gray-600'>
                                {[
                                  capitalizeAll(loc.region),
                                  capitalizeAll(loc.country),
                                  capitalizeAll(loc.zipcode),
                                ]
                                  .filter(Boolean)
                                  .join(', ')}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

              <div className='mb-8'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                  Open Positions ({filteredJobs.length})
                </h2>
                {filteredJobs.length === 0 ? (
                  <p className='text-gray-600'>
                    No open positions at the moment.
                  </p>
                ) : (
                  <div className='space-y-4'>
                    {filteredJobs.map((job, index) => (
                      <Card
                        key={index}
                        className='p-4 hover:bg-gray-50 transition duration-150 ease-in-out relative group'
                      >
                        <div className='flex justify-between items-center'>
                          <div>
                            <h3 className='text-lg font-medium text-gray-900'>
                              {job.job_title || 'Untitled Position'}
                            </h3>
                            <p className='text-sm text-gray-600'>
                              {job.departments?.name ||
                                'Department not specified'}
                            </p>
                            <div className='mt-2 flex items-center space-x-2'>
                              <Badge variant='primary'>
                                {job.job_type || 'Job type not specified'}
                              </Badge>
                              <span className='text-sm text-gray-500'>
                                Location:{' '}
                                {recruiter.office_locations.find(
                                  (loc) => loc.id == job.location_id,
                                )?.city || 'Not specified'}
                              </span>
                            </div>
                          </div>
                          <Button
                            size='sm'
                            onClick={() =>
                              router.push(
                                ROUTES['/job-post/[id]']({ id: job.id }),
                              )
                            }
                            className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-4 top-1/2 transform -translate-y-1/2'
                          >
                            Apply Now
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer brand={true} />
      </ScrollArea>
    </div>
  );
};

export default CompanyJobPost;
