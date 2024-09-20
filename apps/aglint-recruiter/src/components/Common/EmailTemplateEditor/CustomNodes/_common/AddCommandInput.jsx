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
    <Card className='rounded-lg border border-gray-200 p-5 shadow-md'>
      <div className='flex items-start gap-3'>
        input
        <div className='min-h-[40px] w-full'>{slotInputCommand}</div>
      </div>
      <div className='mt-5 flex justify-between'>
        <div>
          {isDeleteVisible && (
            <button
              className='flex items-center gap-2.5 text-red-600 transition-opacity duration-200 hover:opacity-60'
              onClick={onClickDelete}
            >
              <span>Delete Command</span>
            </button>
          )}
        </div>
        <div className='flex items-center gap-4'>
          <button
            className='text-gray-600 transition-opacity duration-200 hover:opacity-70'
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
