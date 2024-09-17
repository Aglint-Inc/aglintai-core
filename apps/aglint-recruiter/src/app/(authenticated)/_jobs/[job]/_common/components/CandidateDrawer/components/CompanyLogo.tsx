import { Building2 } from 'lucide-react';
import Image from 'next/image';

interface CompanyLogoProps {
  companyName: string;
}

export const CompanyLogo = ({ companyName }: CompanyLogoProps) => {
  const name = companyName.toLowerCase().trim().replace(/\s+/g, '');
  const logoUrl = `https://logo.clearbit.com/${name}.com`;

  return companyName ? (
    <Image
      src={logoUrl}
      alt={companyName}
      width={24}
      height={24}
      className='rounded-full object-contain'
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/images/default-company-logo.png';
      }}
    />
  ) : (
    <div className='flex h-6 w-6 items-center justify-center rounded-md bg-gray-100'>
      <Building2 className='h-4 w-4 text-gray-500' />
    </div>
  );
};

export default CompanyLogo;
