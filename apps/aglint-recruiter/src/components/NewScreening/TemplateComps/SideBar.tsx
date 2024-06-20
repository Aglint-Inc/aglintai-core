import React from 'react';

import { AssessmentSide } from '@/devlink/AssessmentSide';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { usePhoneScreening } from '@/src/context/PhoneScreeningContext/PhoneScreeningContext';

import { useJobForm } from '../../Jobs/Dashboard/JobPostCreateUpdate/JobPostFormProvider';

const ScreeningSideBar = () => {
  const { handleUpdateFormFields } = useJobForm();
  const { recruiterUser } = useAuthDetails();
  const { template_id } = usePhoneScreening();
  return (
    <AssessmentSide
      isPhoneScreeningImageVisible={true}
      isAssessmentImageVisible={false}
      isDisableAssessmentVisible={false}
      textDisableButton={'Disable'}
      textPreviewButton={'Preview'}
      textPreview='See How Candidates Will Experience the Screening Questions'
      textDescDisable='Disable Phone Screening for this job.'
      onClickDisableAssessment={{
        onClick: () => {
          handleUpdateFormFields({
            path: 'isPhoneScreenEnabled',
            value: false,
          });
        },
      }}
      onClickAssessmentPreview={{
        onClick: () => {
          window.open(
            `${
              process.env.NEXT_PUBLIC_HOST_NAME
            }/candidate-phone-screening?template_id=${template_id}&recruiter_email=${recruiterUser.email}&recruiter_name=${[
              recruiterUser.first_name,
              recruiterUser.last_name,
            ].join(' ')}`,
            '_blank',
          );
        },
      }}
    />
  );
};

export default ScreeningSideBar;
