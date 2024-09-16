'use client';
import {
  Briefcase,
  LinkedinIcon,
  Mail,
  MapPin,
  Smartphone,
  SquareUser,
} from 'lucide-react';
import React from 'react';

export function ApplicantInfoBox({
  onClickLinkedIn = {},
  isLinkedInVisible = true,
  textDepartment = 'Engineering',
  textLocation = 'San Francisco, California',
  textEmail = 'dileep@aglinthq.com',
  textRole = 'Software Engineer',
  textPhone = '+1 123-456-7890',
  isRoleVisible = true,
  isDepartmentVisible = true,
}) {
  return (
    <dl className='grid grid-cols-3 gap-x-4 gap-y-2 text-sm'>
      {/* Work Information */}
      {isDepartmentVisible && (
        <div className='flex items-center col-span-1'>
          <Briefcase className='w-4 h-4 text-neutral-600 mr-2 flex-shrink-0' />
          <div>
            <dt className='sr-only'>Department</dt>
            <dd className='truncate'>{textDepartment}</dd>
          </div>
        </div>
      )}
      {isRoleVisible && (
        <div className='flex items-center col-span-1'>
          <SquareUser className='w-4 h-4 text-neutral-600 mr-2 flex-shrink-0' />
          <div>
            <dt className='sr-only'>Current Role</dt>
            <dd className='truncate'>{textRole}</dd>
          </div>
        </div>
      )}
      {isLinkedInVisible && (
        <div
          className='flex items-center col-span-1 cursor-pointer'
          {...onClickLinkedIn}
        >
          <LinkedinIcon className='w-4 h-4 text-neutral-600 mr-2 flex-shrink-0' />
          <div>
            <dt className='sr-only'>LinkedIn</dt>
            <dd className='truncate'>View Profile</dd>
          </div>
        </div>
      )}

      {/* Location Information */}
      <div className='flex items-center col-span-1'>
        <MapPin className='w-4 h-4 text-neutral-600 mr-2 flex-shrink-0' />
        <div>
          <dt className='sr-only'>Location</dt>
          <dd className='truncate'>{textLocation}</dd>
        </div>
      </div>
      {/* <div className='flex items-center col-span-2'>
        <Globe className='w-4 h-4 text-neutral-600 mr-2 flex-shrink-0' />
        <div>
          <dt className='sr-only'>Time Zone</dt>
          <dd className='truncate'>{textTimeZone}</dd>
        </div>
      </div> */}

      {/* Contact Information */}
      <div className='flex items-center col-span-2'>
        <Mail className='w-4 h-4 text-neutral-600 mr-2 flex-shrink-0' />
        <div>
          <dt className='sr-only'>Email</dt>
          <dd className='truncate'>{textEmail}</dd>
        </div>
      </div>
      <div className='flex items-center col-span-1'>
        <Smartphone className='w-4 h-4 text-neutral-600 mr-2 flex-shrink-0' />
        <div>
          <dt className='sr-only'>Phone</dt>
          <dd className='truncate'>{textPhone}</dd>
        </div>
      </div>
    </dl>
  );
}
