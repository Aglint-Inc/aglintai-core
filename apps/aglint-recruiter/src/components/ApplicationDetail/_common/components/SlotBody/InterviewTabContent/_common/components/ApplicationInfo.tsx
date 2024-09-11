'use client';
import {
  Briefcase,
  Globe,
  LinkedinIcon,
  Mail,
  MapPin,
  Smartphone,
  SquareUser,
} from 'lucide-react';
import React from 'react';

import IconCandidate from '@/components/Common/Icons/IconCandidate';
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
    <div className='flex flex-col max-w-[870px] justify-start items-start gap-6 rounded-lg'>
      <div className='flex w-full justify-between items-start'>
        <div className='flex flex-auto gap-2.5'>
          <div className='overflow-hidden w-6 h-6 rounded-md'>
            {slotImage ?? <IconCandidate />}
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <UITypography type='medium' fontBold='normal'>
                {textName}
              </UITypography>
              {isLinkedInVisible && (
                <div className='cursor-pointer' {...onClickLinkedIn}>
                  <LinkedinIcon className='w-4 h-4 text-neutral-600' />
                </div>
              )}
            </div>
            <div className='flex flex-row gap-6'>
              {isDepartmentVisible && (
                <div className='flex items-center gap-1'>
                  <Briefcase className='w-4 h-4 text-neutral-600' />
                  <UITypography type='small' className='text-neutral-600'>
                    {textDepartment}
                  </UITypography>
                </div>
              )}
              <div className='flex items-center gap-1'>
                <MapPin className='w-4 h-4 text-neutral-600' />
                <UITypography type='small' className='text-neutral-600'>
                  {textLocation}
                </UITypography>
              </div>
              <div className='flex items-center gap-1'>
                <Globe className='w-4 h-4 text-neutral-600' />
                <UITypography type='small' className='text-neutral-600'>
                  {textTimeZone}
                </UITypography>
              </div>
            </div>
            <div className='flex flex-row gap-6'>
              {isRoleVisible && (
                <div className='flex items-center gap-1'>
                  <SquareUser className='w-4 h-4 text-neutral-600' />
                  <UITypography type='small' className='text-neutral-600'>
                    {textRole}
                  </UITypography>
                </div>
              )}
              <div className='flex items-center gap-1'>
                <Mail className='w-4 h-4 text-neutral-600' />
                <UITypography type='small' className='text-neutral-600'>
                  {textEmail}
                </UITypography>
              </div>
              <div className='flex items-center gap-1'>
                <Smartphone className='w-4 h-4 text-neutral-600' />
                <UITypography type='small' className='text-neutral-600'>
                  {textPhone}
                </UITypography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
