import { Plus } from 'lucide-react';

import UITypography from '@/components/Common/UITypography';

export function AddScheduleOption({
  onClickAddSession = {},
  onClickAddDebriefSession = {},
  onClickAddBreak = {},
  isBreakVisibe = true,
}) {
  return (
    <div className='z-4 w-44 p-1 flex flex-col justify-start items-start gap-3  shadow-sm border border-slate-200 rounded-md bg-white'>
      <div className=' w-full flex flex-col justify-start items-start gap-3'>
        <div
          className='px-2 py-1 rounded-sm w-full flex justify-start items-center gap-1 cursor-pointer hover:bg-slate-100'
          {...onClickAddSession}
        >
          <Plus size={15} />
          <UITypography variant='p' type='small'>
            Add Interview
          </UITypography>
        </div>
        <div
          className='px-2 py-1 rounded-sm w-full flex justify-start items-center gap-1 cursor-pointer hover:bg-slate-100'
          {...onClickAddDebriefSession}
        >
          <Plus size={15} />
          <UITypography variant='p' type='small'>
            Add Debrief
          </UITypography>
        </div>
        {isBreakVisibe ? (
          <div
            className='px-2 py-1 rounded-sm w-full flex justify-start items-center gap-1 cursor-pointer hover:bg-slate-100'
            {...onClickAddBreak}
          >
            <Plus size={15} />
            <UITypography variant='p' type='small'>
              Add Break
            </UITypography>
          </div>
        ) : null}
      </div>
    </div>
  );
}
