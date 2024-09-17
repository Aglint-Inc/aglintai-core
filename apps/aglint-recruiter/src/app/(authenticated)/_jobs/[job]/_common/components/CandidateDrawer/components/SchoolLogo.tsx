import { School } from 'lucide-react';
import Image from 'next/image';

interface SchoolLogoProps {
  schoolName: string;
}

export const SchoolLogo = ({ schoolName }: SchoolLogoProps) => {
  const name = schoolName.toLowerCase().trim().replace(/\s+/g, '');
  const logoUrl = `https://logo.clearbit.com/${name}.edu`;

  return schoolName ? (
    <Image
      src={logoUrl}
      alt={schoolName}
      width={24}
      height={24}
      className='rounded-full object-contain'
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/images/default-school-logo.png';
      }}
    />
  ) : (
    <div className='flex h-6 w-6 items-center justify-center rounded-md bg-gray-100'>
      <School className='h-4 w-4 text-gray-500' />
    </div>
  );
};

export default SchoolLogo;
