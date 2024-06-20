import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { NewJobStep2 } from '@/devlink/NewJobStep2';

import TipTapAIEditor from '../../../../Common/TipTapAIEditor';
import { useJobForm } from '../JobPostFormProvider';

const BasicStepTwo = ({ showWarnOnEdit }: { showWarnOnEdit?: () => void }) => {
  const {
    handleUpdateFormFields,
    jobForm: { formFields, formType, jobPostId },
  } = useJobForm();
  const router = useRouter();
  const handleChangeTipTap = (s: string) => {
    if (showWarnOnEdit) showWarnOnEdit();
    if (formType === 'new' && formFields.jobDescription.length === 0) {
      autoGenJson(jobPostId);
    }

    handleUpdateFormFields({
      multipayload: [
        {
          path: 'jobDescription',
          value: s,
        },
        {
          path: 'isjdChanged',
          value: true,
        },
      ],
    });
  };

  useEffect(() => {
    if (
      router.query.ats === 'true' &&
      formFields.jobDescription.length > 0 &&
      formFields.jdJson.rolesResponsibilities.length === 0 &&
      formFields.jdJson.skills.length === 0 &&
      formFields.jdJson.educations.length === 0
    ) {
      autoGenJson(jobPostId);
    }
  }, []);

  return (
    <NewJobStep2
      isAddSkillVisible={false}
      slotJobDescription={
        <>
          <TipTapAIEditor
            showWarnOnEdit={showWarnOnEdit}
            placeholder='Job Description'
            handleChange={handleChangeTipTap}
            enablAI={
              !process.env.NEXT_PUBLIC_HOST_NAME.includes('app.aglinthq.com')
            }
            initialValue={formFields.jobDescription}
          />
        </>
      }
      isJobHeaderVisible={formType === 'new'}
      isGenerateVisible={false}
      isProceedDisable={false}
      slotAddedSkill={<></>}
      slotRequiredSKill={<></>}
      slotSuggestedSkill={<></>}
    />
  );
};

export default BasicStepTwo;

const autoGenJson = (jobId: string) => {
  localStorage.setItem(`auto-gen-${jobId}`, 'true');
};
export const isAutoGenJson = (jobId: string) => {
  return localStorage.getItem(`auto-gen-${jobId}`) === 'true';
};

export const removeAutogenJson = (jobId: string) => {
  localStorage.removeItem(`auto-gen-${jobId}`);
};
