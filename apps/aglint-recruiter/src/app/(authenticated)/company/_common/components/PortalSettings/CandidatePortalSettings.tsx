'use client';

import AboutCompany from './AboutCompany';
import CandidateGreeting from './CandidateGreeting';
import { CoverImage } from './CoverImage';
import { PortalPreview } from './Preview';
import { SliderImages } from './SliderImages';

function CandidatePortalSettings() {
  return (
    <div className='flex w-full flex-col gap-8 mb-8'>
      <PortalPreview />
      <CoverImage />
      <AboutCompany />
      <CandidateGreeting />
      <SliderImages />
    </div>
  );
}

export default CandidatePortalSettings;
