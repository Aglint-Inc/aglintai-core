/* eslint-disable no-unused-vars */
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Clock, MapPin, PencilIcon, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

export type DialogState = {
  deletelocation: { open: boolean; edit: number };
  location: { open: boolean; edit: number };
  roles: boolean;
  departments: boolean;
  stacks: boolean;
};

export const initialDialog = (): DialogState => {
  return {
    deletelocation: { open: false, edit: -1 },
    location: { open: false, edit: -1 },
    roles: false,
    departments: false,
    stacks: false,
  };
};

interface LocationCardProps {
  id: number;
  city: string;
  region: string;
  country: string;
  address: string;
  timeZone: string;
  isHeadquarter: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function LocationCard({
  id,
  city,
  region,
  country,
  address,
  timeZone,
  isHeadquarter,
  onEdit,
  onDelete,
}: LocationCardProps) {
  const { checkPermissions } = useRolesAndPermissions();
  const isFormDisabled = !checkPermissions(['manage_company']);
  const [isHovered, setIsHovered] = useState(false);

  const location = [city, region, country].filter(Boolean).join(', ');

  return (
    <Card
      className='p-4 h-full relative border-none shadow-none'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isFormDisabled && isHovered && (
        <div className='absolute top-2 right-2 flex space-x-1'>
          <Button variant='ghost' size='sm' onClick={() => onEdit(id)}>
            <PencilIcon className='h-3 w-3' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            className='hover:bg-red-200'
            onClick={() => onDelete(id)}
          >
            <Trash2 className='h-3 w-3' />
          </Button>
        </div>
      )}
      <div className='flex items-center justify-between'>
        <h4 className='text-base font-semibold'>{location}</h4>
      </div>
      <div className='mt-2'>
        <div className='flex items-center'>
          <MapPin className='h-4 w-4 mr-2 text-gray-500' />
          <p>{address || '-'}</p>
        </div>
        <div className='flex items-center mt-1'>
          <Clock className='h-4 w-4 mr-2 text-gray-500' />
          <p>{timeZone}</p>
        </div>
      </div>
      {isHeadquarter && (
        <div className='absolute bottom-3 right-3'>
          <Badge variant='outline'>Headquarters</Badge>
        </div>
      )}
    </Card>
  );
}

export default LocationCard;
