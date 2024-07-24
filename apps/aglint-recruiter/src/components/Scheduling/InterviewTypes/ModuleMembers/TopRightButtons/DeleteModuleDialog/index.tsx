import { Dialog, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { Text } from '@/devlink/Text';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import UITextField from '@/src/components/Common/UITextField';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { setIsDeleteModuleDialogOpen, useModulesStore } from '../../../store';
import { ModuleType } from '../../../types';
import { deleteModuleById } from '../../../utils';

function DeleteModuleDialog({ editModule }: { editModule: ModuleType }) {
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
            router.push(`${ROUTES['/scheduling']()}?tab=interviewtypes`);
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
    <Dialog open={isDeleteModuleDialogOpen} onClose={onClose}>
      <DcPopup
        popupName={`Delete Interview Type ${moduleName}`}
        onClickClosePopup={{ onClick: onClose }}
        slotButtons={
          <>
            <ButtonSoft
              size={2}
              textButton='Cancel'
              color={'neutral'}
              onClickButton={{ onClick: onClose }}
            />
            <ButtonSolid
              size={2}
              color={'error'}
              textButton='Delete'
              isLoading={loading}
              isDisabled={
                isFetching || isSessionExist || moduleName !== value.trim()
              }
              onClickButton={{
                onClick: () => {
                  if (editModule.id) deleteModule();
                },
              }}
            />
          </>
        }
        slotBody={
          <Stack spacing={'var(--space-2)'}>
            {isSessionExist ? (
              <GlobalBannerShort
                color={'error'}
                iconName='warning'
                textTitle='Cannot delete interview type'
                textDescription={`Interview type is used in job's interview plan or scheduled interviews.`}
                slotButtons={<></>}
              />
            ) : (
              <>
                <Text
                  size={2}
                  color={'neutral'}
                  content={`By clicking delete the Interview Type will be permanently deleted.`}
                />
                <Stack direction={'row'} spacing={'4px'}>
                  <Text
                    size={2}
                    color={'neutral'}
                    content={`Confirm by typing the job title`}
                  />
                  <Text size={2} color={'error'} content={moduleName} />
                  <Text size={2} color={'neutral'} content={`below.`} />
                </Stack>

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
          </Stack>
        }
      />
    </Dialog>
  );
}

export default DeleteModuleDialog;
