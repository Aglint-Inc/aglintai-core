import { Card, CardContent, CardHeader } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { CalendarArrowUp, CalendarCheck, CalendarX } from 'lucide-react';

import UITypography from '@/components/Common/UITypography';

export function InterviewersDash({
  slotInterviewersCardList,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickQualified = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickTrainee = () => {},
  isQualifiedActive = false,
  isTraineeActive = true,
}) {
  const value = isQualifiedActive
    ? 'qualified'
    : isTraineeActive
      ? 'trainee'
      : '';
  return (
    <Card className='h-[420px] overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between border-b bg-neutral-100 p-0 px-3 py-1'>
        <UITypography variant='p' type='small'>
          Interviewers
        </UITypography>
        <div className='flex gap-2'>
          <Tabs value={value}>
            <TabsList className='bg-neutral-300'>
              <TabsTrigger onClick={onClickQualified} value='qualified'>
                Account
              </TabsTrigger>
              <TabsTrigger onClick={onClickTrainee} value='trainee'>
                Trainees
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {/* <UIButton
            variant={isQualifiedActive ? 'secondary' : 'ghost'}
            size='sm'
            onClick={onClickQualified}
          >
            Qualified
          </UIButton>
          <UIButton
            variant={isTraineeActive ? 'secondary' : 'ghost'}
            size='sm'
            onClick={onClickTrainee}
          >
            Trainees
          </UIButton> */}
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='grid grid-cols-[40%_20%_20%_20%] items-center border-b px-4 py-2'>
          <UITypography variant='p' type='small' className='text-neutral-500'>
            Name
          </UITypography>
          <CalendarCheck size={16} strokeWidth={1} className='text-green-600' />
          <CalendarArrowUp
            size={16}
            strokeWidth={1}
            className='text-blue-600'
          />
          <CalendarX size={16} strokeWidth={1} className='text-red-600' />
        </div>
        <ScrollArea className='h-[347px]'>
          {slotInterviewersCardList}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
