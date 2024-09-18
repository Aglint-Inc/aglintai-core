import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Progress } from '@components/ui/progress'
import { Skeleton } from '@components/ui/skeleton';
import React from 'react'

import { useCandidatePipeline } from '../../hooks/useInterviewStatics';

function CandidatePipeline({module_id}:{module_id:string}) {
    const {data,isFetched} = useCandidatePipeline(module_id);
    const divider = (data?.applied||0)/100;
  return <Card className='border-t-4 border-t-purple-500 bg-white shadow-md'>
        <CardHeader>
          <CardTitle className='text-gray-800'>Candidate Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Applied</span>
              <div className='flex items-center space-x-2'>
                <span className='font-bold text-gray-900'>{isFetched?data.applied:<Skeleton className='h-6 w-10'/>}</span>
                <Progress value={100} className='w-[60px] bg-purple-100' />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Screened</span>
              <div className='flex items-center space-x-2'>
                <span className='font-bold text-gray-900'>{isFetched?data.screened:<Skeleton className='h-6 w-10'/>}</span>
                <Progress value={isFetched?data.screened/divider:0} className='w-[60px] bg-purple-100' />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Interviewed</span>
              <div className='flex items-center space-x-2'>
                <span className='font-bold text-gray-900'>{isFetched?data.interviewed:<Skeleton className='h-6 w-10'/>}</span>
                <Progress value={isFetched?data.interviewed/divider:0} className='w-[60px] bg-purple-100' />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Offered</span>
              <div className='flex items-center space-x-2'>
                <span className='font-bold text-gray-900'>{isFetched?data.offered:<Skeleton className='h-6 w-10'/>}</span>
                <Progress value={isFetched?data.offered/divider:0} className='w-[60px] bg-purple-100' />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
}

export default CandidatePipeline