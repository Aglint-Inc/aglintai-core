'use client';
import {
  PageActions,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { Send } from 'lucide-react';
import { useState } from 'react';

import { useIntegrations } from '@/authenticated/hooks';
import { UIButton } from '@/common/UIButton';

import ATSTools from './ATSTools';
import MessagingTools from './MessagingTools';
import RequestNew from './RequestNewPopUp';
import Scheduling from './SchedulingTools';

// New Header Component
export const IntegrationsHeader = () => {
  const [isRequestNewOpen, setIsRequestNewOpen] = useState(false);

  return (
    <PageHeader>
      <PageHeaderText>
        <PageTitle>Integrations</PageTitle>
        <PageDescription>
          Connect your favorite tools to streamline your workflow.
        </PageDescription>
      </PageHeaderText>
      <PageActions>
        <UIButton
          size='md'
          variant='outline'
          leftIcon={<Send />}
          onClick={() => setIsRequestNewOpen(true)}
        >
          Request new Integration
        </UIButton>
        <RequestNew
          isOpen={isRequestNewOpen}
          close={() => setIsRequestNewOpen(false)}
        />
      </PageActions>
    </PageHeader>
  );
};

// New ATS Section Component
const ATSSecion = ({
  data,
  invalidate,
}: {
  data: ReturnType<typeof useIntegrations>['data'];
  invalidate: ReturnType<typeof useIntegrations>['invalidate'];
}) => (
  <section>
    <h2 className='text-md font-semibold'>ATS</h2>
    <p className='mb-4 text-sm text-muted-foreground'>
      Easily manage job postings and candidate information by connecting your
      preferred ATS.
    </p>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
      <ATSTools data={data} invalidate={invalidate} />
    </div>
  </section>
);

// New Scheduling Section Component
const SchedulingSection = ({
  data,
}: {
  data: ReturnType<typeof useIntegrations>['data'];
}) => (
  <section>
    <h2 className='text-md font-semibold'>Scheduling Tools</h2>
    <p className='mb-4 text-sm text-muted-foreground'>
      Connect your calendar and video conferencing tools to simplify interview
      scheduling.
    </p>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
      <Scheduling allIntegrations={data} />
    </div>
  </section>
);

// New Messaging Section Component
const MessagingSection = () => (
  <section>
    <h2 className='text-md font-semibold'>Communication Platforms</h2>
    <p className='mb-4 text-sm text-muted-foreground'>
      Connect popular communication tools to enhance your team&apos;s
      coordination.
    </p>
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
      <MessagingTools />
    </div>
  </section>
);

export const Integrations = () => {
  const { data, invalidate } = useIntegrations();

  return (
    <div className='space-y-8 px-8'>
      <ATSSecion data={data} invalidate={invalidate} />
      <SchedulingSection data={data} />
      <MessagingSection />
    </div>
  );
};
