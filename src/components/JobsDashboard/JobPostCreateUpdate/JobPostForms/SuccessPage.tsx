import { get } from 'lodash';
import { useRouter } from 'next/router';

import { NewJobSuccess } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';

function SuccessPage() {
  const { jobForm } = useJobForm();
  const router = useRouter();
  const jobLink =
    'https://dev.aglinthq.com' + '/job-post/' + get(jobForm, 'jobPostId', '');
  return (
    <NewJobSuccess
      onClickViewJob={{
        onClick: () => {
          router.push(jobLink);
        },
      }}
    />
  );
}

export default SuccessPage;
