import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UITextField from '@/components/Common/UITextField';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import {
  setIsDeleteModuleDialogOpen,
  useModulesStore,
} from '../../../../store';
import { deleteModuleById } from '../../../../utils';
import { type useModuleAndUsers } from '../../hooks/useModuleAndUsers';

function DeleteModuleDialog({
  editModule,
}: {
  editModule: ReturnType<typeof useModuleAndUsers>['data'];
}) {
  const router = useRouter();
  const isDeleteModuleDialogOpen = useModulesStore(
    (state) => state.isDeleteModuleDialogOpen,
  );
  const [value, setValue] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [isSessionExist, setIsSessionExist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editModule?.id) fetchMeetings();
  }, [editModule?.id]);

  const fetchMeetings = async () => {
    try {
      const { data } = await supabase
        .from('interview_session')
        .select('*')
        .eq('module_id', editModule.id);

      if (data.length > 0) {
        setIsSessionExist(true);
      }
    } catch {
      toast.error('Error fetching meetings.');
    } finally {
      setIsFetching(false);
    }
  };

  const deleteModule = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const { data } = await supabase
          .from('interview_session')
          .select('*')
          .eq('module_id', editModule.id);

        if (data.length === 0) {
          const isdeleted = await deleteModuleById(editModule.id);
          if (isdeleted) {
            router.push(`${ROUTES['/interview-pool']()}`);
            toast.success('Interview type deleted successfully.');
          } else {
            throw new Error();
          }
        } else {
          toast.warning(
            'Cannot delete interview type as it is connected to some schedules.',
          );
        }
      } catch {
        toast.error('Error deleting interview type.');
      } finally {
        setValue('');
        setLoading(false);
        setIsDeleteModuleDialogOpen(false);
      }
    } else {
      toast.warning('Please wait until the ongoing process is complete.');
    }
  };

  const moduleName = (editModule?.name ?? '').trim();

  const onClose = useCallback(() => {
    if (!loading) {
      setIsDeleteModuleDialogOpen(false);
      setTimeout(() => setValue(''), 400);
    } else {
      toast.warning('Please wait until the ongoing process is complete.');
    }
  }, [loading]);

  return (
    <>
      <UIDialog
        open={isDeleteModuleDialogOpen}
        title={`Delete Interview Type ${moduleName}`}
        onClose={onClose}
        slotButtons={
          <>
            <UIButton variant='secondary' size='sm' onClick={onClose}>
              Cancel
            </UIButton>

            <UIButton
              size='sm'
              isLoading={loading}
              disabled={
                isFetching || isSessionExist || moduleName !== value.trim()
              }
              onClick={() => {
                if (editModule.id) deleteModule();
              }}
            >
              Delete
            </UIButton>
          </>
        }
      >
        <div className='space-y-2'>
          {isSessionExist ? (
            <UIAlert
              type='small'
              color={'error'}
              iconName='Circle'
              title='Cannot delete interview type'
              description={`Interview type is used in job's interview plan or scheduled interviews.`}
            />
          ) : (
            <>
              <p className='text-muted-foreground'>
                By clicking delete the Interview Type will be permanently
                deleted.
              </p>
              <div className='flex flex-wrap items-center space-x-1'>
                <p className='text-sm text-muted-foreground'>
                  Confirm by typing the job title
                </p>
                <p className='text-sm text-destructive'>{moduleName}</p>
                <p className='text-sm text-muted-foreground'>below.</p>
              </div>

              <UITextField
                disabled={loading}
                placeholder={moduleName}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (value === moduleName) {
                      if (editModule.id) deleteModule();
                    }
                  }
                }}
              />
            </>
          )}
        </div>
      </UIDialog>
    </>
  );
}

export default DeleteModuleDialog;
