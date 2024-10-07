'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

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
    <div className='w-lg flex w-full flex-col items-center'>
      <div className='mb-4 flex items-center justify-center'>
        <div className='flex flex-col items-center'>
          <Avatar className='h-[50px] w-[50px]'>
            <AvatarImage src={logo} alt={companyName} />
            <AvatarFallback>{companyName.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className='text-2xl font-semibold'>{companyName}</h1>
        </div>
      </div>
      {title ? <h1 className='text-3xl font-semibold'>{title}</h1> : null}
      <div className='mb-8 flex items-center gap-2'>{description}</div>
    </div>
  );
}

export default SchedulingPageHeader;
