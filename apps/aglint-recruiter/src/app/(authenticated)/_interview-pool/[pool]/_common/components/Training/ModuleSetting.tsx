'use client';
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
}) {
  return (
    <div className='relative mb-3 p-4 rounded-lg bg-white'>
      <div className='relative'>
        <div className='flex flex-col gap-2'>
          {isRequireTrainingVisible ? (
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center w-full justify-between  gap-2'>
                  <div className='flex gap-2 items-center '>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        x='0.25'
                        y='0.25'
                        width='13.5'
                        height='13.5'
                        rx='6.75'
                        fill='white'
                      ></rect>
                      <rect
                        x='0.25'
                        y='0.25'
                        width='13.5'
                        height='13.5'
                        rx='6.75'
                        stroke='#467B7C'
                        stroke-width='0.5'
                        stroke-miterlimit='1.30541'
                        stroke-dasharray='2 2'
                      ></rect>
                      <path
                        d='M6.97559 10.8164C5.33496 10.8164 4.20703 10.0234 4.07031 8.80664H5.28711C5.48535 9.42188 6.07324 9.8252 7.0166 9.8252C8.00781 9.8252 8.71191 9.35352 8.71191 8.68359V8.66992C8.71191 8.1709 8.33594 7.82227 7.42676 7.60352L6.28516 7.33008C4.9043 7.00195 4.28223 6.40039 4.28223 5.34082V5.33398C4.28223 4.11035 5.45801 3.1875 7.02344 3.1875C8.56836 3.1875 9.6416 3.95996 9.80566 5.16309H8.63672C8.47949 4.58203 7.90527 4.17871 7.0166 4.17871C6.1416 4.17871 5.49902 4.62988 5.49902 5.2793V5.29297C5.49902 5.79199 5.86816 6.10645 6.73633 6.31836L7.87109 6.5918C9.25879 6.92676 9.92871 7.52832 9.92871 8.58105V8.59473C9.92871 9.90723 8.65039 10.8164 6.97559 10.8164Z'
                        fill='#467B7C'
                      ></path>
                    </svg>
                    <span>No of shadows</span>
                  </div>
                  {slotInputNoOfShadow}
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2 w-full justify-between'>
                  <div className='flex gap-2 items-center'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        x='0.25'
                        y='0.25'
                        width='13.5'
                        height='13.5'
                        rx='6.75'
                        fill='#467B7C'
                      ></rect>
                      <rect
                        x='0.25'
                        y='0.25'
                        width='13.5'
                        height='13.5'
                        rx='6.75'
                        stroke='#467B7C'
                        stroke-width='0.5'
                        stroke-miterlimit='1.30541'
                        stroke-dasharray='1 1'
                      ></rect>
                      <path
                        d='M4.41016 10.546V3.46094H7.11554C8.48051 3.46094 9.37412 4.29563 9.37412 5.56731V5.57713C9.37412 6.55912 8.83893 7.32507 7.95023 7.60494L9.59016 10.546H8.55416L7.03698 7.74242H5.29395V10.546H4.41016ZM5.29395 6.95682H7.03698C7.94532 6.95682 8.46087 6.47074 8.46087 5.60659V5.59677C8.46087 4.75226 7.91095 4.24653 6.9977 4.24653H5.29395V6.95682Z'
                        fill='#F5FCFC'
                      ></path>
                    </svg>
                    <span>No of reverse shadows</span>
                  </div>
                  {slotInputNoOfReverse}
                </div>
              </div>
              <div className='flex mt-3 justify-start items-center gap-2'>
                {slotCheckbox}
                <span>Require approval before moving to Qualified</span>
              </div>
              {isApprovalDoneVisible ? (
                <div className='flex flex-col mt-2'>
                  <span>Approvers:</span>
                  {slotApprovalDoneInput}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {isDisable ? (
          <div className='absolute inset-0 z-2 bg-white opacity-50' />
        ) : null}
      </div>
    </div>
  );
}
