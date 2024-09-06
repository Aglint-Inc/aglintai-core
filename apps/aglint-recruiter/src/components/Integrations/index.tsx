import { useAllIntegrations } from '@/queries/intergrations';

import ATSTools from './ATSTools';
import MessagingTools from './MessagingTools';
import Scheduling from './SchedulingTools';
import RequestNew from './RequestNewPopUp';
import { useState } from 'react';
import { Button } from '@components/ui/button';
import ErrorBoundary from '@/components/ErrorBoundary';

function Integrations() {
  const { data: allIntegrations, refetch } = useAllIntegrations();
  const [isRequestNewOpen, setIsRequestNewOpen] = useState(false);

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
        <header className='mb-8'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-3xl font-bold mb-2'>Integrations</h1>
              <p className='text-gray-600 mb-4'>
                Connect your favorite tools to streamline your recruitment
                process.
              </p>
            </div>
            <Button onClick={() => setIsRequestNewOpen(true)}>
              Request New
            </Button>
            <RequestNew
              isOpen={isRequestNewOpen}
              close={() => setIsRequestNewOpen(false)}
            />
          </div>
        </header>

        <section>
          <h2 className='text-xl font-semibold mb-4'>ATS</h2>
          <p className='text-gray-600 mb-4'>
            Easily manage job postings and candidate information by connecting
            your preferred ATS.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <ErrorBoundary>
              <ATSTools integrations={allIntegrations} refetch={refetch} />
            </ErrorBoundary>
          </div>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>Scheduling Tools</h2>
          <p className='text-gray-600 mb-4'>
            Connect your calendar and video conferencing tools to simplify
            interview scheduling.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <ErrorBoundary>
              <Scheduling allIntegrations={allIntegrations} />
            </ErrorBoundary>
          </div>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>
            Communication Platforms
          </h2>
          <p className='text-gray-600 mb-4'>
            Connect popular communication tools to enhance your team&apos;s
            coordination.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <ErrorBoundary>
              <MessagingTools />
            </ErrorBoundary>
          </div>
        </section>
      </div>
    </>
  );
}

export default Integrations;
