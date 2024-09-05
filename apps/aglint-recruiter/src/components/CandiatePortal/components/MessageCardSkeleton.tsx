import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

export default function MessageCardSkeleton() {
  return (
    <Card className='mx-auto rounded-lg overflow-hidden border shadow-none mb-4'>
      <CardHeader className='flex items-center px-6 py-4'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-row items-center gap-4 justify-center'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-4 rounded-md' />
              <Skeleton className='h-4 w-10 rounded-md' />
            </div>
            <Skeleton className='h-4 w-24' />
          </div>
          <div className='flex items-center gap-2 text-sm ml-auto text-center sm:text-right'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-20' />
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-6'>
        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-4 w-full mb-1' />
        <Skeleton className='h-4 w-5/6 mb-1' />
        <Skeleton className='h-4 w-4/6' />
        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-4 w-full mb-1' />
        <Skeleton className='h-4 w-5/6 mb-1' />
        <Skeleton className='h-4 w-4/6' />
      </CardContent>
      <CardFooter className='w-full'>
        <Skeleton className='h-10 w-full' />
      </CardFooter>
    </Card>
  );
}
