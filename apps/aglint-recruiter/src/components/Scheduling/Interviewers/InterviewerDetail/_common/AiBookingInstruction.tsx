'use client';

export function AiBookingInstruction({
  slotTextArea,
  textHowTo = '',
  textExample = '',
}) {
  return (
    <div className='flex max-w-[865px] flex-col gap-4'>
      <p>
        These instructions will guide the selection of interviewers or specify
        any preferences for the selection within this module.
      </p>

      <div>{slotTextArea}</div>

      <div className='flex flex-col gap-3 p-4 rounded-lg bg-[var(--accent-2)]'>
        <div className='flex flex-col gap-1'>
          <div className='text-left text-sm text-red-600 font-regular '>
            {'How to Use:'}
          </div>
          <ul className='text-[#63635e]'>
            <li>{textHowTo}</li>
          </ul>
        </div>

        <div className='flex flex-col gap-1'>
          <div className='text-left text-sm font-regular text-neutral'>
            {'Example:'}
          </div>
          <div className='text-left text-sm font-regular text-neutral-12'>
            {textExample}
          </div>
        </div>
      </div>
    </div>
  );
}
