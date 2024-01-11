import { NewJobStep2 } from '@/devlink';

import { useJobForm } from '../JobPostFormProvider';
import TipTapAIEditor from '../../../Common/TipTapAIEditor';
// import UITextField from '../../../Common/UITextField';

const BasicStepTwo = ({ showWarnOnEdit }: { showWarnOnEdit?: () => void }) => {
  const {
    handleUpdateFormFields,
    jobForm: { formFields, formType },
    dispatch,
  } = useJobForm();

  const handleChangeTipTap = (s: string) => {
    if (showWarnOnEdit) showWarnOnEdit();
    handleUpdateFormFields({
      path: 'jobDescription',
      value: s,
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
      onClickProceed={{
        onClick: () => {
          dispatch({
            type: 'moveToSlide',
            payload: {
              nextSlide: 'resumeScore',
            },
          });
        },
      }}
      isAddJob={formType === 'new'}
    />
  );
};

export default BasicStepTwo;
