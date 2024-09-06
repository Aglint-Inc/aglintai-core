'use client';

import { getFullName } from '@aglint/shared-utils';

import AllSet from '@/components/CandiatePortal/components/AllSet';
import CompanyImage from '@/components/CandiatePortal/components/CompanyImage';
import CompanyTabs from '@/components/CandiatePortal/components/CompanyTabs';
import GreetingCandidate from '@/components/CandiatePortal/components/GreetingCandidate';
import IncompleteProfile from '@/components/CandiatePortal/components/IncompleteProfile';
import InterviewProgress from '@/components/CandiatePortal/components/InterviewProgress';
import RequestedAvailability from '@/components/CandiatePortal/components/RequestedAvailability';
import SelfScheduling from '@/components/CandiatePortal/components/SelfScheduling';
import UpcomingInterview from '@/components/CandiatePortal/components/UpcomingInterview';
import HomeSkeleton from '@/components/CandiatePortal/Home/HomeSkeleton';
import { usePortalHomePage } from '@/components/CandiatePortal/hook';

import { useCandidatePortalProfile } from '../_common/hooks';

export default function Component({ params }) {
  const application_id = params.application_id;
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
    availability?.length === 0;

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1 mx-auto px-4 py-8'>
        <div className='grid grid-cols-3 gap-8'>
          <div className='col-span-2'>
            <div className=' rounded-lg overflow-hidden shadow'>
              <CompanyImage
                candidate={candidate}
                coverSrc={company.banner_image}
              />

              <div className='p-8 pt-20 pb-0'>
                <h1 className='text-2xl font-semibold mb-1 mt-2'>
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

function hasEmptyValue(obj) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
      return true;
    }
  }
  return false;
}
