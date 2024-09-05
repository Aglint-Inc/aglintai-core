import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

export default function UpcomingInterviewSkeleton() {
  return (
    <div>
      <Card className='bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
        <CardHeader className='p-4'>
          <Skeleton className='h-6 w-1/3' />
        </CardHeader>
        <CardContent className='p-4 pt-0'>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col items-center justify-center bg-gray-100 py-2 rounded-lg w-24'>
              <Skeleton className='h-4 w-12 mb-1' />
              <Skeleton className='h-8 w-10 mb-1' />
              <Skeleton className='h-4 w-14' />
            </div>
            <div className='flex flex-col gap-2 flex-grow'>
              <Skeleton className='h-5 w-1/2' />
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-4 w-1/4' />
            </div>
          </div>
          <div className='flex w-full gap-2 mt-4'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
