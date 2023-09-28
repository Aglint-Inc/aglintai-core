import { get } from 'lodash';
import { useRouter } from 'next/router';

import { NewJobSuccess } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';

function FormSeven() {
  const { jobForm } = useJobForm();
  const router = useRouter();
  const jobLink =
    process.env.NEXT_PUBLIC_HOST_NAME +
    '/job-post/' +
    get(jobForm, 'jobPostId', '');
  return (
    <NewJobSuccess
      onClickViewJob={{
        onclick: () => {
          router.push(jobLink);
        },
      }}
    />
  );
}

export default FormSeven;
