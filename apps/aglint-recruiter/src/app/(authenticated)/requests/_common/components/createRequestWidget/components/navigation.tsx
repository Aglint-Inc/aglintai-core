import { Button } from '@components/ui/button';
import { ChevronLeft } from 'lucide-react';

import { useCreateRequest, useCreateRequestActions } from '../hooks';

export const Navigation = () => {
  const step = useCreateRequest((state) => state.step);
  const { previousPage } = useCreateRequestActions();
  if (step === 0) return <></>;
  return (
    <Button variant='ghost' size='sm' onClick={() => previousPage()}>
      <ChevronLeft className='mr-2 h-4 w-4' /> Back
    </Button>
  );
};
