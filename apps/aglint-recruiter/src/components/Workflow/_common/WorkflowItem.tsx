import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Trash2 } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

interface WorkflowItemProps {
  textWorkflowType: string;
  textTypeDescription: string;
  slotWorkflowIcon: React.ReactNode;
  slotInputFields: React.ReactNode;
  isDeleteVisible: boolean;
  onClickDelete?: {
    onClick: () => void;
    [key: string]: any;
  };
}

export function WorkflowItem({
  textWorkflowType,
  textTypeDescription,
  slotWorkflowIcon,
  slotInputFields,
  isDeleteVisible,
  onClickDelete,
}: WorkflowItemProps) {
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row justify-between  p-4 border-b'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center w-6 h-6 rounded bg-accent text-accent-foreground'>
              {slotWorkflowIcon}
            </div>
            <span className='font-medium'>{textWorkflowType}</span>
          </div>
          <span className='text-sm text-muted-foreground'>
            {textTypeDescription}
          </span>
        </div>
        {isDeleteVisible && (
          <UIButton
            variant='ghost'
            size='sm'
            className='m-0'
            icon={<Trash2 />}
            onClick={onClickDelete?.onClick}
            {...onClickDelete}
          />
        )}
      </CardHeader>
      <CardContent className='p-4'>{slotInputFields}</CardContent>
    </Card>
  );
}
