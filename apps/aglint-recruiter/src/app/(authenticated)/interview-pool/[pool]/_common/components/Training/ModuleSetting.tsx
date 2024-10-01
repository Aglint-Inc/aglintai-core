'use client';
import { RotateCcw, RotateCw } from 'lucide-react';
import React from 'react';

export function ModuleSetting({
  as: _Component = 'div',
  slotInputNoOfShadow,
  slotInputNoOfReverse,
  slotCheckbox,
  isApprovalDoneVisible = false,
  slotApprovalDoneInput,
  isRequireTrainingVisible = false,
  isDisable = false,
}: {
  as?: React.ElementType;
  slotInputNoOfShadow: React.ReactNode;
  slotInputNoOfReverse: React.ReactNode;
  slotCheckbox: React.ReactNode;
  isApprovalDoneVisible?: boolean;
  slotApprovalDoneInput: React.ReactNode;
  isRequireTrainingVisible?: boolean;
  isDisable?: boolean;
}) {
  return (
    <div className='relative mb-3 rounded-lg bg-white p-4'>
      <div className='relative'>
        <div className='flex flex-col gap-2'>
          {isRequireTrainingVisible ? (
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <div className='flex w-full items-center justify-between gap-2'>
                  <div className='flex items-center gap-2'>
                    <RotateCw className='h-6 w-6' />
                    <span>No of shadows</span>
                  </div>
                  {slotInputNoOfShadow}
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex w-full items-center justify-between gap-2'>
                  <div className='flex items-center gap-2'>
                    <RotateCcw className='h-6 w-6' />
                    <span>No of reverse shadows</span>
                  </div>
                  {slotInputNoOfReverse}
                </div>
              </div>
              <div className='mt-3 flex items-center justify-start gap-2'>
                {slotCheckbox}
                <span>Require approval before moving to Qualified</span>
              </div>
              {isApprovalDoneVisible ? (
                <div className='mt-2 flex flex-col'>
                  <span>Approvers:</span>
                  {slotApprovalDoneInput}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {isDisable ? (
          <div className='z-2 absolute inset-0 bg-white opacity-50' />
        ) : null}
      </div>
    </div>
  );
}
