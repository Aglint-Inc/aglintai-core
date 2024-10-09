/* eslint-disable no-unused-vars */
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Clock, MapPin, PencilIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

interface LocationCardProps {
  id: number;
  location: string;
  address: string;
  timeZone: string;
  isHeadquarter: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function LocationCard({
  id,
  location,
  address,
  timeZone,
  isHeadquarter,
  onEdit,
  onDelete,
}: LocationCardProps) {
  const { checkPermissions } = useRolesAndPermissions();
  const isFormDisabled = !checkPermissions(['manage_company']);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='relative h-full rounded-md bg-gray-100 p-4'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isFormDisabled && isHovered && (
        <div className='absolute right-2 top-2 flex space-x-1'>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => onEdit(id)}
            className='h-8 w-8 bg-white p-0 shadow-sm hover:bg-gray-200'
          >
            <PencilIcon className='h-3 w-3' />
          </Button>
          <Button
            variant='secondary'
            size='sm'
            className='h-8 w-8 bg-white p-0 shadow-sm hover:bg-red-500 hover:text-white'
            onClick={() => onDelete(id)}
          >
            <Trash2 className='h-3 w-3' />
          </Button>
        </div>
      )}
      <div className='flex items-center justify-between'>
        <h4 className='text-md font-medium'>{location}</h4>
      </div>
      <div className='mt-2'>
        <div className='flex items-center'>
          <MapPin className='mr-2 h-4 w-4 text-muted-foreground' />
          <span className='text-sm text-muted-foreground'>
            {address || '-'}
          </span>
        </div>
        <div className='mt-1 flex items-center'>
          <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
          <span className='text-sm text-muted-foreground'>{timeZone}</span>
        </div>
      </div>
      {isHeadquarter && (
        <div className='absolute bottom-3 right-3'>
          <Badge variant='outline'>Headquarters</Badge>
        </div>
      )}
    </div>
  );
}

export default LocationCard;
