'use client';
import { Send } from 'lucide-react';
import { useState } from 'react';

import { useAllIntegrations } from '@/authenticated/hooks';

import { UIButton } from '../Common/UIButton';
import ATSTools from './ATSTools';
import MessagingTools from './MessagingTools';
import RequestNew from './RequestNewPopUp';
import Scheduling from './SchedulingTools';

function Integrations() {
  const { data, invalidate } = useAllIntegrations();
  const [isRequestNewOpen, setIsRequestNewOpen] = useState(false);

  return (
    <>
      <div className='p-4'>
        <header className='mb-4 flex flex-row justify-between'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-semibold'>Integrations</h1>
            <p className='mb-4 text-sm text-muted-foreground'>
              Connect your favorite tools to streamline your workflow.
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <UIButton
              size='md'
              variant='default'
              leftIcon={<Send />}
              onClick={() => setIsRequestNewOpen(true)}
            >
              Request New
            </UIButton>
            <RequestNew
              isOpen={isRequestNewOpen}
              close={() => setIsRequestNewOpen(false)}
            />
          </div>
        </header>
        <div className='flex flex-col gap-12'>
          <section>
            <h2 className='text-md font-semibold'>ATS</h2>
            <p className='mb-4 text-sm text-muted-foreground'>
              Easily manage job postings and candidate information by connecting
              your preferred ATS.
            </p>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <ATSTools data={data} invalidate={invalidate} />
            </div>
          </section>

          <section>
            <h2 className='text-md font-semibold'>Scheduling Tools</h2>
            <p className='mb-4 text-sm text-muted-foreground'>
              Connect your calendar and video conferencing tools to simplify
              interview scheduling.
            </p>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <Scheduling allIntegrations={data} />
            </div>
          </section>

          <section>
            <h2 className='text-md font-semibold'>Communication Platforms</h2>
            <p className='mb-4 text-sm text-muted-foreground'>
              Connect popular communication tools to enhance your team&apos;s
              coordination.
            </p>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <MessagingTools />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Integrations;
