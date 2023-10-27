import { get } from 'lodash';

import { NewJobSuccess } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';

function SuccessPage() {
  const { jobForm } = useJobForm();
  const jobLink = `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${get(jobForm, 'jobPostId', '')}`;
  return (
    <NewJobSuccess
      onClickViewJob={{
        onClick: () => {
          window.open(jobLink, '_blank');
        },
      }}
    />
  );
}

export default SuccessPage;
