'use client';

import React from 'react';

import ConfigureCandidateGreeting from '@/components/CandiatePortal/components/ConfigureCandidateGreeting';
import ConfigureCompanyEdit from '@/components/CandiatePortal/components/ConfigureCompanyEdit';
import { ConfigureSliderImages } from '@/components/CandiatePortal/components/ConfigureSliderImages';
import { usePortalSettings } from '@/components/CompanyDetailComp/hook';

import CandidatePoratlSettingsSkeleton from './CandidatePoratlSettingsSkeleton';
import { ConfigureCoverImage } from './ConfigureCoverImage';

function CandidatePortalSettings() {
  const { isPending } = usePortalSettings();
  if (isPending) return <CandidatePoratlSettingsSkeleton />;
  return (
    <div className='flex flex-col gap-8 p-4 pb-32 pl-6'>
      <ConfigureCoverImage />
      <ConfigureCandidateGreeting />
      <ConfigureCompanyEdit />
      <ConfigureSliderImages />
    </div>
  );
}

export default CandidatePortalSettings;
