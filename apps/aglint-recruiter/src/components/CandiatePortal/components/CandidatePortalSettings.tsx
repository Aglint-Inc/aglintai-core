'use client';

import React from 'react';

import ConfigureCandidateGreeting from '@/components/CandiatePortal/components/ConfigureCandidateGreeting';
import ConfigureCompanyEdit from '@/components/CandiatePortal/components/ConfigureCompanyEdit';
import { ConfigureSliderImages } from '@/components/CandiatePortal/components/ConfigureSliderImages';
import { usePortalSettings } from '@/components/CompanyDetailComp/hook';

function CandidatePortalSettings() {
  const { isPending } = usePortalSettings();
  if (isPending) return <>Loading</>;
  return (
    <div className='flex flex-col gap-10 p-4'>
      <ConfigureSliderImages />
      <ConfigureCandidateGreeting />
      <ConfigureCompanyEdit />
    </div>
  );
}

export default CandidatePortalSettings;
