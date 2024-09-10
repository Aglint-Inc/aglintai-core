'use client';

import { SlotComp } from '@devlink/SlotComp';
import { InterviewMemberSide } from '@devlink2/InterviewMemberSide';
import { ModuleMembers } from '@devlink2/ModuleMembers';
import { Printer, Text } from 'lucide-react';

export function InterviewMemberList({
  textObjective = "This module aims to evaluate candidates' ability to write efficient, maintainable, and bug-free C++ code, covering a range of topics such as syntax, data structures, algorithms, object-oriented programming concepts, memory management, and best practices.",
  textDepartment = 'Engineering',
  slotNewTabPill,
  slotModuleContent,
  slotEditButton,
  slotJobsCard,
  slotBanner,
  isBannerVisible = false,
}) {
  return (
    <div className='iml-wrappers'>
      <div className='interview-member-list-wrapper'>
        <div className='header-interview-list-wrap'>
          {isBannerVisible && <div>{slotBanner}</div>}

          <div className='iml-details-wrapper flex justify-between p-4 w-[900px]'>
            <div className='im-detail-wrap '>
              <div className='im-detail-item flex gap-1 pb-2'>
                <div className='im-detail-item-left flex items-center w-[120px] gap-2'>
                  <Printer className='w-[18px] h-[18px]' strokeWidth={1} />
                  <p className='text-[14px]'>
                    {'Department'}
                    <br />
                  </p>
                </div>

                <div className='im-detail-item-right'>
                  <p>{textDepartment}</p>
                </div>
              </div>
              <div className='im-detail-item flex gap-1'>
                <div className='im-detail-item-left flex items-center w-[120px] gap-2'>
                  <Text className='w-[18px] h-[18px]' strokeWidth={1} />
                  <p className='text-[14px]'> {'Objective'}</p>
                </div>

                <div className='im-detail-item-right'>
                  <p className='text-wrap'>{textObjective}</p>
                </div>
              </div>
            </div>
            <div className='slot-edit-btn-iml'>{slotEditButton}</div>
          </div>
        </div>

        <div className='slot_newtab_pill'>
          {slotNewTabPill ?? <SlotComp componentName='NewTabPill' />}
        </div>

        <div className='iml-new-body-wrap flex '>
          <div className='im-slot-tab-content flex justify-between w-full'>
            {slotModuleContent ?? (
              <>
                <ModuleMembers />
                <InterviewMemberSide />
                <InterviewMemberSide />
              </>
            )}
          </div>
          <div className='iml-right-wrappers w-[400px] bg-[var(--neutral-2)] p-[16px] m-[16px] h-[calc(100vh_-_210px)]'>
            {slotJobsCard}
          </div>
        </div>
      </div>
    </div>
  );
}
