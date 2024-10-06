import { getFullName } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

import { Loader } from '@/common/Loader';
import { useDepartmentsUsage } from '@/company/hooks';
import { capitalizeAll } from '@/utils/text/textUtils';

function DeleteDepartmentsDialog({
  handleClose,
  open,
  handleDelete,
  id,
}: {
  handleClose: () => void;
  open: boolean;
  id: number;
  handleDelete: () => void;
}) {
  const { data: usage, isPending } = useDepartmentsUsage({ id: Number(id) });
  const jobUsageCount = usage?.jobUsage.length || 0;
  const isJobEmpty = jobUsageCount === 0;
  const userUsageCount = usage?.userUsage.length || 0;
  const isUserEmpty = userUsageCount === 0;
  const isBothEmpty = isJobEmpty && isUserEmpty;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete Department</DialogTitle>
        </DialogHeader>
        {isPending ? (
          <div className='flex justify-center'>
            <Loader />
          </div>
        ) : isBothEmpty ? (
          <div
            className='border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700'
            role='alert'
          >
            <p className='font-bold'>Warning</p>
            <p>
              Are you sure you want to delete the &quot;{usage?.name || ''}
              &quot; department?
            </p>
          </div>
        ) : (
          <div
            className='border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700'
            role='alert'
          >
            <p className='font-bold'>Warning</p>
            <p className='text-sm'>
              Cannot delete this department. Disconnect the following
              {!isUserEmpty ? (userUsageCount > 1 ? 'users ' : 'user ') : ''}
              {!isUserEmpty && !isJobEmpty ? 'and ' : ''}
              {!isJobEmpty ? (jobUsageCount > 1 ? 'jobs ' : 'job') : ''}
              first:
            </p>
            <ul className='mt-2 list-inside list-disc'>
              {!isUserEmpty && (
                <li>
                  <span className='font-medium'>
                    {`${userUsageCount > 1 ? 'Users' : 'User'}: `}
                  </span>
                  {usage?.userUsage
                    .map((user) => getFullName(user.first_name, user.last_name))
                    .join(', ')}
                </li>
              )}
              {!isJobEmpty && (
                <li>
                  <span className='font-medium'>
                    {`${jobUsageCount > 1 ? 'Jobs' : 'Job'}: `}
                  </span>
                  {usage?.jobUsage
                    .map((job) => capitalizeAll(job || ''))
                    .join(', ')}
                </li>
              )}
            </ul>
          </div>
        )}
        <DialogFooter>
          <Button variant='outline' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isPending || !isJobEmpty || !isUserEmpty}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDepartmentsDialog;
