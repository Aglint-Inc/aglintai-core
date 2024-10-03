import { Building2, Globe, Users2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { TenantType } from '@/company/hooks/useTenant';

export const BasicInfoUI = ({
  recruiter,
}: {
  recruiter: TenantType['recruiter'];
}) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='mb-2 flex items-center space-x-4'>
          <div className='justify-center rounded-md border border-border'>
            {recruiter.logo && (
              <Image
                src={recruiter.logo}
                alt={recruiter.name}
                width={72}
                height={72}
                className='rounded-md'
              />
            )}
          </div>
          <div className='flex flex-col space-y-2'>
            {recruiter.name}
            <div className='flex flex-row gap-4'>
              <div className='flex items-center space-x-2'>
                <Globe className='h-4 w-4 text-muted-foreground' />
                {recruiter.company_website && (
                  <Link
                    href={recruiter.company_website}
                    target='_blank'
                    className='text-sm text-muted-foreground'
                  >
                    {new URL(recruiter.company_website)?.hostname}
                  </Link>
                )}
              </div>
              <div className='flex items-center space-x-2'>
                <Building2 className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>
                  {recruiter.industry}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <Users2 className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>{`${recruiter.employee_size} People`}</span>
              </div>
            </div>
            <div className='flex flex-wrap gap-2'>
              {Object.entries(recruiter.socials)
                .filter(([key]) => key !== 'custom')
                .map(([key, val]) => (
                  <Link
                    key={key}
                    href={val as string}
                    target='_blank'
                    className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 transition-colors hover:bg-gray-200'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={`/images/social/${key}.svg`}
                      height={14}
                      width={14}
                      alt=''
                      className='mr-2'
                      style={{ filter: 'grayscale(100%)' }}
                    />
                    <span className='text-sm'>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
