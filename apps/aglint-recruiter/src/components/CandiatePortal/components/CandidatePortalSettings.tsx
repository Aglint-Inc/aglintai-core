'use client'

import React from 'react';

import ConfigureCandidateGreeting from '@/components/CandiatePortal/components/ConfigureCandidateGreeting';
import ConfigureCompanyEdit from '@/components/CandiatePortal/components/ConfigureCompanyEdit';
import { ConfigureSliderImages } from '@/components/CandiatePortal/components/ConfigureSliderImages';

import { ConfigureCoverImage } from './ConfigureCoverImage';

function CandidatePortalSettings() {
  return (
    <div className='flex flex-col gap-10'>
        <ConfigureSliderImages/>
        <ConfigureCoverImage/>
        <ConfigureCandidateGreeting/>
        <ConfigureCompanyEdit/>  
    </div>
  );
}

export default CandidatePortalSettings;
