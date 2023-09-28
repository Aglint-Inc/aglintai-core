import { get } from 'lodash';
import Image from 'next/image';

import { JobPublished, NewJobStep4, ShareableJobLink } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';
import { Status } from '../../types';

const FormFour = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const handlePublishJob = () => {
    handleUpdateFormFields({
      path: 'status',
      value: 'sourcing',
    });
  };

  const status = get(jobForm, 'formFields.status', '') as Status;
  const jobLink =
    process.env.NEXT_PUBLIC_HOST_NAME +
    '/job-post/' +
    get(jobForm, 'jobPostId', '');

  const isJobPublished = status === 'sourcing' || status == 'interviewing';

  return (
    <NewJobStep4
      slotShareVia={
        <>
          <JobPublished
            isJobPublished={isJobPublished}
            onClickPublishJob={{
              onClick: handlePublishJob,
            }}
            slotLogo={
              <>
                <Image
                  src={'/images/svg/Building.svg'}
                  alt='company'
                  height={60}
                  width={60}
                />
              </>
            }
            textCompany={get(jobForm, 'formFields.company', '')}
            textRole={get(jobForm, 'formFields.jobTitle', '')}
          />
          {isJobPublished && (
            <ShareableJobLink
              textLink={jobLink}
              onClickCopyLink={{
                onClick: () => {
                  navigator.clipboard.writeText(jobLink);
                },
              }}
            />
          )}
        </>
      }
    />
  );
};

export default FormFour;
