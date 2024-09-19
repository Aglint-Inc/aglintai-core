'use client';

import React from 'react';

import { usePortalSettings } from '@/components/CompanyDetailComp/hook';
import ConfigureCandidateGreeting from '@/components/CompanyDetailComp/PortalSettings/components/ConfigureCandidateGreeting';
import ConfigureCompanyEdit from '@/components/CompanyDetailComp/PortalSettings/components/ConfigureCompanyEdit';
import { ConfigureSliderImages } from '@/components/CompanyDetailComp/PortalSettings/components/ConfigureSliderImages';

import CandidatePoratlSettingsSkeleton from './components/CandidatePoratlSettingsSkeleton';
import { ConfigureCoverImage } from './components/ConfigureCoverImage';

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
