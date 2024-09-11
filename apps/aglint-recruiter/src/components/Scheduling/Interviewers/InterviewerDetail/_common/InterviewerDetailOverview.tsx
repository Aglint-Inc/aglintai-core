'use client';

export function InterviewerDetailOverview({
  slotTrainingModules,
  textHeader = '',
  slotButtonTraining,
}) {
  return (
    <div className='flex flex-col w-[900px] p-4 gap-6'>
      {
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center gap-2'>
            <p className='font-bold'>{textHeader}</p>
            <div>{slotButtonTraining}</div>
          </div>
          <div className='flex flex-col gap-4'>{slotTrainingModules}</div>
        </div>
      }
    </div>
  );
}
