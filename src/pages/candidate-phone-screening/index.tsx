import React from 'react';

import KnockOffQns from '@/src/components/KnockOffQns/KnockOffQns';
import { ScreeningCtxProvider } from '@/src/components/KnockOffQns/ScreeningCtxProvider';

const Screening = () => {
  return (
    <>
      <ScreeningCtxProvider>
        <KnockOffQns />
      </ScreeningCtxProvider>
    </>
  );
};

Screening.getLayout = (page) => {
  return <>{page}</>;
};

export default Screening;
