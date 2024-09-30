'use client';

import AboutCompany from './AboutCompany';
import CandidateGreeting from './CandidateGreeting';
import { CoverImage } from './CoverImage';
import { SliderImages } from './SliderImages';

function CandidatePortalSettings() {
  return (
    <div className='flex flex-col gap-5'>
      <CoverImage />
      <AboutCompany />
      <CandidateGreeting />
      <SliderImages />
    </div>
  );
}

export default CandidatePortalSettings;
