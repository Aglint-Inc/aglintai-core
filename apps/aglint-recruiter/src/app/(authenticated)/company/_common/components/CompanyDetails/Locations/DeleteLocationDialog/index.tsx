import { getFullName } from '@aglint/shared-utils';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { Skeleton } from '@components/ui/skeleton';
import type { Dispatch, SetStateAction } from 'react';

import { UIButton } from '@/common/UIButton';
import {
  useTenantOfficeLocationDelete,
  useTenantOfficeLocationDeleteUsage,
} from '@/company/hooks/useTenantOfficeLocations';

function DeleteLocationDialog({
  dialog,
  setDialog,
}: {
  dialog: {
    open: boolean;
    id: number | null;
  };
  setDialog: Dispatch<
    SetStateAction<{
      open: boolean;
      id: number | null;
    }>
  >;
}) {
  const { mutateAsync, isPending } = useTenantOfficeLocationDelete();
  const { isLoading, data } = useTenantOfficeLocationDeleteUsage({
    location_id: dialog.id as number,
  });

  const isDeletable =
    data?.jobUsage.length === 0 && data?.userUsage.length === 0;

  return (
    <AlertDialog
      open={dialog.open}
      onOpenChange={(open) => {
        setDialog({ open, id: open ? dialog.id : null });
      }}
    >
      <AlertDialogContent className='border border-border'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Office Location</AlertDialogTitle>
          {isLoading ? (
            <Skeleton className='h-[200px] w-full' />
          ) : (
            <AlertDialogDescription>
              {isDeletable
                ? 'Are you sure you want to delete this office location? This action is permanent.'
                : data && <ConnectedUserAndJob data={data} />}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {!isLoading && (
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDialog({ open: false, id: null })}
            >
              Cancel
            </AlertDialogCancel>
            <UIButton
              isLoading={isPending}
              disabled={!isDeletable || isLoading}
              onClick={async () => {
                if (dialog.id) {
                  await mutateAsync({ location_id: dialog.id });
                  setDialog({ open: false, id: null });
                }
              }}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete
            </UIButton>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteLocationDialog;

const ConnectedUserAndJob = ({
  data,
}: {
  data: ReturnType<typeof useTenantOfficeLocationDeleteUsage>['data'];
}) => {
  const jobs = data.jobUsage || [];
  const users = data.userUsage || [];
  return (
    <>
      {jobs?.length !== 0 && (
        <div>
          <p className='mb-2 font-bold'>
            Please change the location for this jobs
          </p>
          {jobs?.map((job) => <li key={job}>{job}</li>)}
        </div>
      )}
      {users.length !== 0 && (
        <div>
          <p className='mb-2 mt-4 font-bold'>
            Please change the location for this users
          </p>
          {users.map((user, i) => (
            <li key={user.first_name + i}>
              {getFullName(user.first_name, user.last_name)}
            </li>
          ))}
        </div>
      )}
    </>
  );
};
