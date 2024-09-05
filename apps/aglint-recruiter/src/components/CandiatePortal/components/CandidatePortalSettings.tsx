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
    <div className='p-4 pl-6 flex flex-col gap-8 pb-32'>
      <ConfigureCoverImage />
      <ConfigureCandidateGreeting />
      <ConfigureCompanyEdit />
      <ConfigureSliderImages />
    </div>
  );
}

export default CandidatePortalSettings;
