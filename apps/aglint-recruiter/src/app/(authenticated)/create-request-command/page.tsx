'use client';
import { CreateRequestCommand } from '@components/create-request-command';

import { CreateRequestWidget } from '@/components/Requests/_common/components/createRequestWidget';

const Page = () => {
  return (
    <div className='flex gap-2'>
      <CreateRequestCommand />
      <CreateRequestWidget />
    </div>
  );
};

export default Page;
