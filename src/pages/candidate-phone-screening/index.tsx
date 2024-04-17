import React from 'react';

import Seo from '@/src/components/Common/Seo';
import KnockOffQns from '@/src/components/KnockOffQns/KnockOffQns';
import { ScreeningCtxProvider } from '@/src/components/KnockOffQns/ScreeningCtxProvider';

const Screening = () => {
  return (
    <>
      <Seo
        title={'Aglint | Phone Screening'}
        description='Find Your Ideal Candidates'
      />
      <ScreeningCtxProvider>
        <KnockOffQns />
      </ScreeningCtxProvider>
    </>
  );
};

Screening.publicProvider = (page) => {
  return <>{page}</>;
};

export default Screening;
