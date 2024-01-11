import { set } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

import { CloseJobModal } from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { useJobForm } from '../JobPostFormProvider';
import { supabaseWrap } from '../utils';
import UITextField from '../../../Common/UITextField';

const CloseJobPopup = ({ onClose }) => {
  const { handleUIJobUpdate } = useJobs();
  const router = useRouter();
  const [confirmJobTitle, setConfirmJobTitle] = useState({
    value: '',
    error: '',
  });
  const { jobForm } = useJobForm();
  const handleCloseJob = async () => {
    try {
      if (confirmJobTitle.value !== jobForm.formFields.jobTitle) {
        setConfirmJobTitle((p) => ({
          ...p,
          error: 'incorrect job title',
        }));
        return;
      }
      const [publicJob] = supabaseWrap(
        await supabase.from('public_jobs').select().eq('id', jobForm.jobPostId),
      );
      const newActiveStatus = publicJob.active_status;
      set(newActiveStatus, 'closed.isActive', true);
      const [job] = supabaseWrap(
        await supabase
          .from('public_jobs')
          .update({
            active_status: {
              ...newActiveStatus,
            },
            status: 'closed',
          })
          .eq('id', jobForm.jobPostId)
          .select(),
      );
      handleUIJobUpdate({
        ...job,
        count: {
          new: 0,
          interviewing: 0,
          qualified: 0,
          disqualified: 0,
        },
      });
      router.replace('/jobs');
    } catch (err) {
      toast.error('Something went wrong, please try again');
    }
  };

  return (
    <>
      <CloseJobModal
        slotInput={
          <UITextField
            placeholder={jobForm.formFields.jobTitle}
            error={Boolean(confirmJobTitle.error)}
            helperText={confirmJobTitle.error}
            value={confirmJobTitle.value}
            onChange={(e) => {
              setConfirmJobTitle((p) => ({
                ...p,
                error: '',
                value: e.target.value,
              }));
            }}
          />
        }
        onClickCancel={{ onClick: onClose }}
        onClickCloseJob={{ onClick: handleCloseJob }}
        textJobTitle={jobForm.formFields.jobTitle}
        textLocation={jobForm.formFields.jobLocation}
      />
    </>
  );
};

export default CloseJobPopup;
