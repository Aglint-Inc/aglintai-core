import React from 'react';

import KnockOffQns from '@/src/components/KnockOffQns/KnockOffQns';

const Screening = () => {
  return (
    <>
      <KnockOffQns />
    </>
  );
};

Screening.getLayout = (page) => {
  return <>{page}</>;
};

export default Screening;
