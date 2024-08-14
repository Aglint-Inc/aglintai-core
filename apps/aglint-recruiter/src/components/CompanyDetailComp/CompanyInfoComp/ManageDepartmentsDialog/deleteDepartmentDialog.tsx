import { getFullName } from '@aglint/shared-utils';
import { Dialog, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import Loader from '@/src/components/Common/Loader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeAll } from '@/src/utils/text/textUtils';

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

  const isJobEmpty = usage?.jobUsage.length === 0;
  const isUserEmpty = usage?.userUsage.length === 0;
  const isBothEmpty = isJobEmpty && isUserEmpty;

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={'xl'}>
      <DcPopup
        popupName={'Delete Department'}
        onClickClosePopup={{ onClick: handleClose }}
        slotBody={
          isPending ? (
            <Stack>
              <Loader />
            </Stack>
          ) : isBothEmpty ? (
            <GlobalBannerInline
              textContent={
                <Typography>
                  Are you sure you want to delete the &quot;{usage.name}&quot;
                  department?
                </Typography>
              }
              slotButton={<></>}
              color={'warning'}
            />
          ) : (
            <GlobalBannerInline
              textContent={
                <Stack>
                  {`Cannot delete this department. Disconnect the following ${!isUserEmpty ? (usage?.userUsage?.length > 1 ? 'users ' : 'user ') : ''} ${!isUserEmpty && !isJobEmpty ? 'and ' : ''} ${!isJobEmpty ? (usage?.jobUsage?.length > 1 ? 'jobs ' : 'job') : ''}
                first`}
                  <ul>
                    {!isUserEmpty && (
                      <li>
                        <span style={{ fontWeight: '500' }}>
                          {`${usage?.userUsage?.length > 1 ? 'Users ' : 'User '} : `}
                        </span>
                        {usage.userUsage
                          .map((user) =>
                            getFullName(user.first_name, user.last_name),
                          )
                          .join(', ')}
                      </li>
                    )}
                    {!isJobEmpty && (
                      <li>
                        <span style={{ fontWeight: '500' }}>
                          {' '}
                          {`${usage?.jobUsage?.length > 1 ? 'Jobs ' : 'Job '} : `}{' '}
                        </span>

                        {usage.jobUsage
                          .map((job) => capitalizeAll(job))
                          .join(', ')}
                      </li>
                    )}
                  </ul>
                </Stack>
              }
              slotButton={<></>}
              color={'warning'}
            />
          )
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
            <ButtonSolid
              textButton='Delete'
              size={2}
              color={'error'}
              isDisabled={isPending || !isJobEmpty || !isUserEmpty}
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
  const temp_user = (
    await supabase
      .from('departments')
      .select('name, recruiter_user(first_name,last_name)')
      .eq('id', id)
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data;

  const jobs = (
    await supabase
      .from('public_jobs')
      .select('job_title,departments!inner(name)')
      .eq('departments.name', temp_user.name)
      .throwOnError()
  ).data;

  const jobUsage = jobs.map((job) => job.job_title);
  const userUsage = temp_user.recruiter_user;

  return { name: temp_user.name, jobUsage, userUsage };
}
