import { Card, CardContent, CardHeader } from '@components/ui/card';

export function SchedulerConflictCard({ slotCountText, slotToggleWithText }) {
  return (
    <Card className='relative flex flex-col overflow-hidden p-2 border-[1px] rounded-lg'>
      <CardHeader className='p-0 relative z-10 flex'>
        <div className='flex items-center gap-2'>{slotCountText}</div>
      </CardHeader>
      <CardContent className='flex justify-between items-center p-0'>
        <div className='relative z-10'>{slotToggleWithText}</div>
      </CardContent>
    </Card>
  );
}
