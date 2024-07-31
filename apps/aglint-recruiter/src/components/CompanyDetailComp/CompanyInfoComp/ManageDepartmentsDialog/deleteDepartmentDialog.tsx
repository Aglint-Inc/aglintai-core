import { Dialog } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { DcPopup } from '@/devlink/DcPopup';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

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
  const { data: usage, isPending } = useDepartmentsUsage(id);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'xl'}>
      <DcPopup
        popupName={'Delete Department'}
        slotBody={
          !isPending &&
          (usage.jobUsage || usage.userUsage ? (
            <GlobalBanner
              iconName='warning'
              color={'warning'}
              textTitle='Can Not Delete'
              isDescriptionVisible={true}
              textDescription={`This department is used for ${usage?.userUsage} users and ${usage?.jobUsage} jobs`}
              slotButtons={<></>}
            />
          ) : (
            `Department ${usage.name} will be deleted. Are you sure?`
          ))
        }
        slotButtons={
          <>
            <ButtonSoft
              textButton='Close'
              size={2}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  handleClose();
                },
              }}
            />
            <ButtonSoft
              textButton='Delete'
              size={2}
              color={'error'}
              isDisabled={
                isPending || Boolean(usage.jobUsage || usage.userUsage)
              }
              onClickButton={{
                onClick: () => {
                  handleDelete();
                },
              }}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default DeleteDepartmentsDialog;

function useDepartmentsUsage(id: number) {
  const { recruiter } = useAuthDetails();
  return useQuery({
    queryKey: ['departmentsUsage', id],
    queryFn: () => checkDepartmentsUsage({ id, recruiter_id: recruiter.id }),
    enabled: Boolean(recruiter.id),
  });
}

async function checkDepartmentsUsage({
  id,
  recruiter_id,
}: {
  id: number;
  recruiter_id: string;
}) {
  const temp_data = (
    await supabase
      .from('departments')
      .select('name, recruiter_user(first_name)')
      .eq('id', id)
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data;
  const userUsage = temp_data.recruiter_user?.length || 0;
  const jobUsage = (
    await supabase
      .from('public_jobs')
      .select('id', { count: 'exact' })
      .eq('department', temp_data.name)
      .throwOnError()
  ).count;
  return { name: temp_data.name, userUsage, jobUsage };
}
