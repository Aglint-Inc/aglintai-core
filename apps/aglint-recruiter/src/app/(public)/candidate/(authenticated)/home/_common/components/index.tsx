'use client';

import { getFullName } from '@aglint/shared-utils';

import { useRouterPro } from '@/hooks/useRouterPro';

import { useCandidatePortalProfile } from '../../../profile/_common/hooks';
import { usePortalHomePage } from '../hooks';
import AllSet from './AllSet';
import CompanyImage from './CompanyImage';
import CompanyTabs from './CompanyTabs';
import GreetingCandidate from './GreetingCandidate';
import HomeSkeleton from './HomeSkeleton';
import IncompleteProfile from './IncompleteProfile';
import InterviewProgress from './InterviewProgress';
import RequestedAvailability from './RequestedAvailability';
import SelfScheduling from './SelfScheduling';
import UpcomingInterview from './UpcomingInterview';

export default function Home() {
  const { queryParams } = useRouterPro();
  const application_id = queryParams.application_id as string;
  const { isPending, data, error } = usePortalHomePage({ application_id });
  const { data: profileData, isPending: porfilePending } =
    useCandidatePortalProfile();

  if (isPending || porfilePending) {
    return <HomeSkeleton />;
  }

  if (error) throw new Error(error.message);

  const {
    availability,
    candidate,
    company,
    interviewPlan,
    job,
    schedule,
    upcoming,
  } = data;

  const isPorfileInComplete = hasEmptyValue(profileData);
  const isAllSet =
    !isPorfileInComplete &&
    upcoming?.length === 0 &&
    availability?.length === 0 &&
    schedule?.length === 0;

  return (
    <div className='flex flex-col'>
      <main className='mx-auto flex-1 px-4 py-8'>
        <div className='grid grid-cols-3 gap-8'>
          <div className='col-span-2'>
            <div className='overflow-hidden rounded-lg shadow'>
              <CompanyImage
                candidate={candidate}
                coverSrc={company.banner_image}
              />

              <div className='p-8 pb-0 pt-20'>
                <h1 className='mb-1 mt-2 text-2xl font-semibold'>
                  {getFullName(candidate.first_name, candidate.last_name)}
                </h1>
                <p className='text-sm'>
                  for {job.name} at {company.name}
                </p>
                <GreetingCandidate sentence={company.greetings} />
              </div>
              <CompanyTabs
                companyImages={company.company_images}
                aboutContent={company.about}
                job={job}
              />
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            {isAllSet && <AllSet />}
            {isPorfileInComplete && <IncompleteProfile />}
            {upcoming?.length > 0 ? (
              <UpcomingInterview upcomingData={upcoming} />
            ) : (
              <></>
            )}

            {availability?.length ? (
              <RequestedAvailability
                availabilityData={availability}
                job={job}
              />
            ) : (
              <></>
            )}
            {schedule?.length > 0 ? (
              <SelfScheduling scheduleData={schedule} />
            ) : (
              <></>
            )}

            {interviewPlan.length > 0 ? (
              <InterviewProgress interviews={interviewPlan} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function hasEmptyValue(obj: Record<string, any>) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
      return true;
    }
  }
  return false;
}
