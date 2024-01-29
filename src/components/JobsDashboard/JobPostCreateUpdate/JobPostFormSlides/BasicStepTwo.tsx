import { NewJobStep2 } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';
import TipTapAIEditor from '../../../Common/TipTapAIEditor';

const BasicStepTwo = ({ showWarnOnEdit }: { showWarnOnEdit?: () => void }) => {
  const {
    handleUpdateFormFields,
    jobForm: { formFields, formType, jobPostId },
  } = useJobForm();

  const handleChangeTipTap = (s: string) => {
    if (showWarnOnEdit) showWarnOnEdit();
    if (formType === 'new' && formFields.jobDescription.length === 0) {
      autoGenJson(jobPostId);
    }
    handleUpdateFormFields({
      path: 'jobDescription',
      value: s,
    });
    handleUpdateFormFields({
      path: 'isjdChanged',
      value: true,
    });
  };

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
