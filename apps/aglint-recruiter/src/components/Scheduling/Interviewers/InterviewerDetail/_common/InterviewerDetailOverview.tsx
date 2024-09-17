'use client';

export function InterviewerDetailOverview({
  slotTrainingModules,
  textHeader = '',
  slotButtonTraining,
}) {
  return (
    <div className='flex w-[900px] flex-col gap-6 p-4'>
      {
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-2'>
            <p className='font-bold'>{textHeader}</p>
            <div>{slotButtonTraining}</div>
          </div>
          <div className='flex flex-col gap-4'>{slotTrainingModules}</div>
        </div>
      }
    </div>
  );
}
