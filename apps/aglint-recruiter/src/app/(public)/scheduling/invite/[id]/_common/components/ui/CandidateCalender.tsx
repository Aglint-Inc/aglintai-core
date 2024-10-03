import { Calendar } from 'lucide-react';

export function CandidateCalender({
  slotDayColumn,
  textMonth,
}: {
  slotDayColumn: React.ReactNode;
  textMonth: string;
}) {
  return (
    <div className='flex h-[500px] flex-col overflow-hidden rounded-md border border-neutral-200 bg-white'>
      <div className='flex h-10 items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4'>
        <div className='flex items-center space-x-1'>
          <Calendar className='h-5 w-5 text-neutral-700' />
          <span className='font-medium'>{textMonth}</span>
        </div>
      </div>
      <div className='flex items-center justify-center gap-2 overflow-auto p-2'>
        {slotDayColumn}
      </div>
    </div>
  );
}
