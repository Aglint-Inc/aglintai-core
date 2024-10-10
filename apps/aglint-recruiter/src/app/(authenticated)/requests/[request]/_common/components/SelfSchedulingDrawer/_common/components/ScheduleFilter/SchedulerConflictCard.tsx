import { Card, CardContent, CardHeader } from '@components/ui/card';

export function SchedulerConflictCard({
  slotCountText,
  slotToggleWithText,
}: {
  slotCountText: React.ReactNode;
  slotToggleWithText: React.ReactNode;
}) {
  return (
    <Card className='relative flex flex-col overflow-hidden rounded-lg border-[1px] p-2'>
      <CardHeader className='relative z-10 flex p-0'>
        <div className='flex items-center gap-2'>{slotCountText}</div>
      </CardHeader>
      <CardContent className='flex items-center justify-between p-0'>
        <div className='relative z-10'>{slotToggleWithText}</div>
      </CardContent>
    </Card>
  );
}
