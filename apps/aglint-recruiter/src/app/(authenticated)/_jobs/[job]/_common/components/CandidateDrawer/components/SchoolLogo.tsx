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
      className='object-contain rounded-full'
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/images/default-school-logo.png';
      }}
    />
  ) : (
    <div className='w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center'>
      <School className='w-4 h-4 text-gray-500' />
    </div>
  );
};

export default SchoolLogo;
