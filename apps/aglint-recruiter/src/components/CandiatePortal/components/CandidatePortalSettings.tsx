'use client';

import React from 'react';

import ConfigureCandidateGreeting from '@/components/CandiatePortal/components/ConfigureCandidateGreeting';
import ConfigureCompanyEdit from '@/components/CandiatePortal/components/ConfigureCompanyEdit';
import { ConfigureSliderImages } from '@/components/CandiatePortal/components/ConfigureSliderImages';
import { usePortalSettings } from '@/components/CompanyDetailComp/hook';

import { ConfigureCoverImage } from './ConfigureCoverImage';

function CandidatePortalSettings() {
  const { isPending } = usePortalSettings();
  if (isPending) return <>Loading</>;
  return (
    <div className='p-4 flex flex-col gap-10'>
      <ConfigureSliderImages />
      <ConfigureCoverImage />
      <ConfigureCandidateGreeting />
      <ConfigureCompanyEdit />
    </div>
  );
}

export default CandidatePortalSettings;
