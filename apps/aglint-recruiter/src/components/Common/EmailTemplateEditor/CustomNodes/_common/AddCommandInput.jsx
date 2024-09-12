import { Card } from '@components/ui/card';

import { UIButton } from '@/components/Common/UIButton';

export function AddCommandInput({
  onClickDelete,
  isDeleteVisible = true,
  onClickCancel,
  onClickDone,
  slotInputCommand,
}) {
  return (
    <Card className='p-5 border border-gray-200 rounded-lg shadow-md'>
      <div className='flex items-start gap-3'>
        input
        <div className='w-full min-h-[40px]'>{slotInputCommand}</div>
      </div>
      <div className='flex justify-between mt-5'>
        <div>
          {isDeleteVisible && (
            <button
              className='flex items-center gap-2.5 text-red-600 hover:opacity-60 transition-opacity duration-200'
              onClick={onClickDelete}
            >
              <span>Delete Command</span>
            </button>
          )}
        </div>
        <div className='flex items-center gap-4'>
          <button
            className='text-gray-600 hover:opacity-70 transition-opacity duration-200'
            onClick={onClickCancel}
          >
            Cancel
          </button>
          <UIButton variant='outline' size='sm' onClick={onClickDone}>
            Done
          </UIButton>
        </div>
      </div>
    </Card>
  );
}
