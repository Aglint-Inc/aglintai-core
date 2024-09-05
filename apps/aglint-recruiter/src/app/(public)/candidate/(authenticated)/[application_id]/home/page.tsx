'use client';

import { getFullName } from '@aglint/shared-utils';

import CandidatePortalLoader from '@/components/CandiatePortal/components/CandidatePortalLoader';
import CompanyImage from '@/components/CandiatePortal/components/CompanyImage';
import CompanyTabs from '@/components/CandiatePortal/components/CompanyTabs';
import GreetingCandidate from '@/components/CandiatePortal/components/GreetingCandidate';
import InterviewProgress from '@/components/CandiatePortal/components/InterviewProgress';
import RequestedAvailability from '@/components/CandiatePortal/components/RequestedAvailability';
import SelfScheduling from '@/components/CandiatePortal/components/SelfScheduling';
import UpcomingInterview from '@/components/CandiatePortal/components/UpcomingInterview';
import UpcomingInterviewSkeleton from '@/components/CandiatePortal/components/UpcomingInterviewSkeleton';
import { usePortalHomePage } from '@/components/CandiatePortal/hook';

export default function Component({ params }) {
  const application_id = params.application_id;
  const { isLoading, data, error } = usePortalHomePage({ application_id });

  if (isLoading) {
    return <CandidatePortalLoader loadingText='Loading your details..' />;
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

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1 mx-auto px-4 py-8'>
        <div className='grid grid-cols-3 gap-8'>
          <div className='col-span-2'>
            <div className=' rounded-lg overflow-hidden shadow'>
              <CompanyImage imageSrc={candidate.avatar} coverSrc={job.banner} />

              <div className='p-8 pt-20 pb-0'>
                <h1 className='text-2xl font-semibold mb-1 mt-2'>
                  {getFullName(candidate.first_name, candidate.last_name)}
                </h1>
                <p className='text-sm'>
                  for {job.name} at {company.name}
                </p>
                <GreetingCandidate sentence={job.greetings} />
              </div>
              <CompanyTabs
                companyImages={job.images}
                aboutContent={company.company_overview}
                job={job}
              />
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            {interviewPlan.length > 0 && (
              <InterviewProgress interviews={interviewPlan} />
            )}

            <UpcomingInterview upcomingData={upcoming} />

            <RequestedAvailability availabilityData={availability} job={job} />
            <SelfScheduling scheduleData={schedule} />

            <UpcomingInterviewSkeleton />
          </div>
        </div>
      </main>
    </div>
  );
}
