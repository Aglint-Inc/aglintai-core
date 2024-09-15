'use client';
import { Card, CardContent } from '@components/ui/card';
import {
  Briefcase,
  Globe,
  LinkedinIcon,
  Mail,
  MapPin,
  Smartphone,
  SquareUser,
  User,
} from 'lucide-react';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

export function ApplicantInfoBox({
  as: _Component = 'div',
  textName = 'Dileep B C',
  slotImage,
  onClickLinkedIn = {},
  isLinkedInVisible = true,
  textDepartment = 'Engineering',
  textLocation = 'San Fransisco, California',
  textTimeZone = 'Asia, Kolkata, Chennai (GMT+5:30)',
  textEmail = 'dileep@aglinthq.com',
  textRole = 'dileep@aglinthq.com',
  textPhone = 'Asia, Kolkata, Chennai (GMT+5:30)',
  isRoleVisible = true,
  isDepartmentVisible = true,
}) {
  return (
    <Card>
      <CardContent>
        <div className='grid grid-cols-3 gap-4 mt-6'>
          {/* Personal Information */}
          <div className='col-span-3 flex items-center gap-2 mb-4'>
            <div className='overflow-hidden w-6 h-6 rounded-md'>
              {slotImage ?? <User className='w-6 h-6 text-neutral-600' />}
            </div>
            <UITypography type='medium' fontBold='normal'>
              {textName}
            </UITypography>
            {isLinkedInVisible && (
              <div className='cursor-pointer' {...onClickLinkedIn}>
                <LinkedinIcon className='w-4 h-4 text-neutral-600' />
              </div>
            )}
          </div>

          {/* Professional Information */}
          {isDepartmentVisible && (
            <div className='flex flex-col'>
              <UITypography type='small' className='text-neutral-600 mb-1'>
                Department
              </UITypography>
              <div className='flex items-center gap-1'>
                <Briefcase className='w-4 h-4 text-neutral-600' />
                <UITypography type='small'>{textDepartment}</UITypography>
              </div>
            </div>
          )}
          {isRoleVisible && (
            <div className='flex flex-col'>
              <UITypography type='small' className='text-neutral-600 mb-1'>
                Role
              </UITypography>
              <div className='flex items-center gap-1'>
                <SquareUser className='w-4 h-4 text-neutral-600' />
                <UITypography type='small'>{textRole}</UITypography>
              </div>
            </div>
          )}

          {/* Location Information */}
          <div className='flex flex-col'>
            <UITypography type='small' className='text-neutral-600 mb-1'>
              Location
            </UITypography>
            <div className='flex items-center gap-1'>
              <MapPin className='w-4 h-4 text-neutral-600' />
              <UITypography type='small'>{textLocation}</UITypography>
            </div>
          </div>
          <div className='flex flex-col'>
            <UITypography type='small' className='text-neutral-600 mb-1'>
              Time Zone
            </UITypography>
            <div className='flex items-center gap-1'>
              <Globe className='w-4 h-4 text-neutral-600' />
              <UITypography type='small'>{textTimeZone}</UITypography>
            </div>
          </div>

          {/* Contact Information */}
          <div className='flex flex-col'>
            <UITypography type='small' className='text-neutral-600 mb-1'>
              Email
            </UITypography>
            <div className='flex items-center gap-1'>
              <Mail className='w-4 h-4 text-neutral-600' />
              <UITypography type='small'>{textEmail}</UITypography>
            </div>
          </div>
          <div className='flex flex-col'>
            <UITypography type='small' className='text-neutral-600 mb-1'>
              Phone
            </UITypography>
            <div className='flex items-center gap-1'>
              <Smartphone className='w-4 h-4 text-neutral-600' />
              <UITypography type='small'>{textPhone}</UITypography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
