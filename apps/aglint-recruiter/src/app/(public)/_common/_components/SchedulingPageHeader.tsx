'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Separator } from '@components/ui/separator';

export function SchedulingPageHeader({
  title,
  description,
  companyName,
  logo,
}: {
  title?: string;
  description: string;
  companyName: string;
  logo: string;
}) {
  return (
    <div className='flex w-full flex-col items-start'>
      <div className='flex w-full items-start rounded-t-lg bg-muted p-4'>
        <div className='flex flex-row items-center'>
          <Avatar className='h-[50px] w-[50px]'>
            <AvatarImage src={logo} alt={companyName} />
            <AvatarFallback>{companyName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className='text-2xl font-semibold'>{companyName}</h1>
        </div>
      </div>
      {title ? <h1 className='text-3xl font-semibold'>{title}</h1> : null}
      <Separator />
      <h2 className='flex items-center gap-2 p-8 pb-4 text-lg font-semibold'>
        {description}
      </h2>
    </div>
  );
}

export default SchedulingPageHeader;
