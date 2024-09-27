import { Calendar } from 'lucide-react';
import RequestCard from 'src/app/_common/components/Requests/RequestCard';

import { useApplicationRequests } from '../../hooks/useApplicationRequests';

function Requests() {
  const { data: requests, isLoading } = useApplicationRequests();
  return (
    <div className='flex flex-col gap-4'>
      {!isLoading &&
        requests?.map((req) => <RequestCard key={req.id} request={req} />)}

      {!requests?.length && (
        <div className='flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4'>
          <Calendar className='mb-2 h-8 w-8 text-gray-400' />
          <p className='text-sm text-gray-500'>No requests found</p>
        </div>
      )}
    </div>
  );
}

export default Requests;
