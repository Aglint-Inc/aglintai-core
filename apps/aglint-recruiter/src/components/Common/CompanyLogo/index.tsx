import { Building2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CompanyLogoProps {
  companyLogo?: string;
  companyName: string;
  borderRadius?: number;
}

const CompanyLogo = ({
  companyLogo,
  companyName,
  borderRadius = 0,
}: CompanyLogoProps) => {
  const name =
    typeof companyName === 'string' ? companyName.toLowerCase().trim() : '';
  const shouldUseClearbit =
    name && !(name.includes('pvt') || name.includes('ltd'));

  return (
    <Avatar className='w-full h-full bg-white/70'>
      <AvatarImage
        src={
          shouldUseClearbit
            ? companyLogo ||
              `https://logo.clearbit.com/${name.replaceAll(' ', '')}.com`
            : undefined
        }
        alt={name}
        className={`object-contain ${borderRadius ? `rounded-[${borderRadius}px]` : ''}`}
      />
      <AvatarFallback className='bg-neutral-100'>
        <Building2 className='w-6 h-6 text-neutral-400' />
      </AvatarFallback>
    </Avatar>
  );
};

export default CompanyLogo;
