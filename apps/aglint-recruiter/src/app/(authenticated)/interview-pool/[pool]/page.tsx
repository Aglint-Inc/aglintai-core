'use client';

import InterviewTypeDetail from './_common/components';

function Page({ params: { pool } }: { params: { pool: string } }) {
  return <InterviewTypeDetail module_id={pool} />;
}

export default Page;
