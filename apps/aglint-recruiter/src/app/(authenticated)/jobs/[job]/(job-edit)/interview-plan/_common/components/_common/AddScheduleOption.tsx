import Typography from '@components/typography';
import { Plus } from 'lucide-react';

export function AddScheduleOption({
  onClickAddSession = () => {},
  onClickAddDebriefSession = () => {},
  onClickAddBreak = () => {},
  isBreakVisibe = true,
}) {
  return (
    <div className='z-4 flex w-44 flex-col items-start justify-start gap-3 rounded-md border border-border bg-white p-1 shadow-sm dark:border-muted dark:bg-background'>
      <div className='flex w-full flex-col items-start justify-start gap-3'>
        <div
          className='flex w-full cursor-pointer items-center justify-start gap-1 rounded-sm px-2 py-1 hover:bg-muted-foreground/20'
          onClick={onClickAddSession}
        >
          <Plus size={15} />
          <Typography variant='p' type='small'>
            Add Interview
          </Typography>
        </div>
        <div
          className='flex w-full cursor-pointer items-center justify-start gap-1 rounded-sm px-2 py-1 hover:bg-muted-foreground/20'
          onClick={onClickAddDebriefSession}
        >
          <Plus size={15} />
          <Typography variant='p' type='small'>
            Add Debrief
          </Typography>
        </div>
        {isBreakVisibe ? (
          <div
            className='flex w-full cursor-pointer items-center justify-start gap-1 rounded-sm px-2 py-1 hover:bg-muted-foreground/20'
            onClick={onClickAddBreak}
          >
            <Plus size={15} />
            <Typography variant='p' type='small'>
              Add Break
            </Typography>
          </div>
        ) : null}
      </div>
    </div>
  );
}
