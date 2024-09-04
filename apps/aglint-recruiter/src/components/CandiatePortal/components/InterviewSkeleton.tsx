import { Card, CardContent } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

export default function InterviewsSkeleton() {
  return (
    <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8 p-6'>
      <main className='lg:w-[70%] space-y-6 mx-auto'>
        <div>
          <Skeleton className='h-6 w-48 mb-4' />
          <InterviewCardSkeleton />
          <InterviewCardSkeleton />
        </div>
        <div>
          <Skeleton className='h-6 w-48 mb-4' />
          <InterviewCardSkeleton />
        </div>
      </main>
    </div>
  );
}

function InterviewCardSkeleton() {
  return (
    <Card className='mb-4 bg-background/80 backdrop-blur-sm shadow-sm border border-border'>
      <CardContent className='pt-4'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center'>
            <Skeleton className='w-16 h-16 rounded-md mr-3' />
            <div>
              <Skeleton className='h-4 w-32 mb-2' />
              <Skeleton className='h-3 w-24' />
            </div>
          </div>
        </div>
        {[1, 2].map((_, index) => (
          <div key={index} className='flex items-center mb-2'>
            <Skeleton className='w-8 h-8 rounded-full mr-3' />
            <div className='flex-grow'>
              <Skeleton className='h-4 w-40 mb-1' />
              <Skeleton className='h-3 w-32' />
            </div>
          </div>
        ))}
        <div className='mt-4 flex space-x-2'>
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-24' />
        </div>
      </CardContent>
    </Card>
  );
}
