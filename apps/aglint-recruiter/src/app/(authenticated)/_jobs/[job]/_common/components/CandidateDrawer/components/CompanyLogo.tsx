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
      className='object-contain rounded-full'
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/images/default-company-logo.png';
      }}
    />
  ) : (
    <div className='w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center'>
      <Building2 className='w-4 h-4 text-gray-500' />
    </div>
  );
};

export default CompanyLogo;
