import { Card, CardContent } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

export default function InterviewsSkeleton() {
  return (
    <div className='container mx-auto flex max-w-screen-xl flex-col gap-8 p-6 lg:flex-row'>
      <main className='mx-auto space-y-6 lg:w-[70%]'>
        <div>
          <Skeleton className='mb-4 h-6 w-48' />
          <InterviewCardSkeleton />
          <InterviewCardSkeleton />
        </div>
        <div>
          <Skeleton className='mb-4 h-6 w-48' />
          <InterviewCardSkeleton />
        </div>
      </main>
    </div>
  );
}

function InterviewCardSkeleton() {
  return (
    <Card className='mb-4 border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
      <CardContent className='pt-4'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center'>
            <Skeleton className='mr-3 h-16 w-16 rounded-md' />
            <div>
              <Skeleton className='mb-2 h-4 w-32' />
              <Skeleton className='h-3 w-24' />
            </div>
          </div>
        </div>
        {[1, 2].map((_, index) => (
          <div key={index} className='mb-2 flex items-center'>
            <Skeleton className='mr-3 h-8 w-8 rounded-full' />
            <div className='flex-grow'>
              <Skeleton className='mb-1 h-4 w-40' />
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
