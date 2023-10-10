import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

import {
  NewJobStep2,
  SkillPill,
  SkillsInput,
  SuggestedSkillPill,
} from '@/devlink';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { palette } from '@/src/context/Theme/Theme';
import { generateSkills } from '@/src/utils/prompts/addNewJob/generateSkills';
import toast from '@/src/utils/toast';

import { useJobForm } from '../JobPostFormProvider';
import TipTapAIEditor from '../../../Common/TipTapAIEditor';
// import UITextField from '../../../Common/UITextField';

const BasicStepTwo = ({ showWarnOnEdit }: { showWarnOnEdit?: () => void }) => {
  const {
    handleUpdateFormFields,
    jobForm: { formFields, formType },
  } = useJobForm();
  const [suggSkills, setSuggSkills] = useState<string[]>([]);
  const [openSkillForm, setSkillForm] = useState(false);
  const [isSkillGenerating, setIsSkillGenerating] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setIsSkillGenerating(true);
        let aiGenSkills = [];
        if (sessionStorage.getItem(`ai-gen-skills-${formFields.jobTitle}`)) {
          aiGenSkills = JSON.parse(
            sessionStorage.getItem(`ai-gen-skills-${formFields.jobTitle}`),
          );
        }
        if (aiGenSkills.length === 0) {
          const generatedSkills = await generateSkills(formFields.jobTitle);
          sessionStorage.setItem(
            `ai-gen-skills-${formFields.jobTitle}`,
            JSON.stringify(generatedSkills),
          );
          aiGenSkills = [...generatedSkills];
        }
        setSuggSkills(() => {
          return aiGenSkills.map((s) => s);
        });
      } catch (err) {
        toast.error('Some thing went wrong While generating skills');
      } finally {
        setIsSkillGenerating(false);
      }
    })();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      `ai-gen-skills-${formFields.jobTitle}`,
      JSON.stringify(suggSkills),
    );
  }, [suggSkills]);

  const handleAddSkill = (newSkill: string) => {
    if (!newSkill) return;
    const isSkillAlreadyExist = formFields.skills.find(
      (s) => s.toLowerCase() === newSkill.toLowerCase(),
    );
    if (isSkillAlreadyExist) return;
    handleUpdateFormFields({
      path: 'skills',
      value: [...formFields.skills, newSkill],
    });
    const updatedSuggSkills = suggSkills.filter((s) => s !== newSkill);
    setSuggSkills(() => updatedSuggSkills);
  };

  const handleRemoveSkill = (skillToRem: string) => {
    const updatedSkills = formFields.skills.filter((s) => s !== skillToRem);
    handleUpdateFormFields({
      path: 'skills',
      value: [...updatedSkills],
    });
  };

  const handleChangeTipTap = (s: string) => {
    if (showWarnOnEdit) showWarnOnEdit();
    handleUpdateFormFields({
      path: 'jobDescription',
      value: s,
    });
  };

  return (
    <NewJobStep2
      onClickAddSkill={{
        onClick: () => {
          setSkillForm(true);
        },
      }}
      isAddSkillVisible={true}
      slotJobDescription={
        <>
          <TipTapAIEditor
            showWarnOnEdit={showWarnOnEdit}
            placeholder='Job Description'
            handleChange={handleChangeTipTap}
            enablAI
            initialValue={formFields.jobDescription}
          />
        </>
      }
      slotAddedSkill={
        <>
          {formFields.skills.map((p) => {
            return (
              <SkillPill
                key={p}
                textSkill={p}
                onClickRemove={{
                  onClick: () => {
                    handleRemoveSkill(p);
                  },
                }}
              />
            );
          })}
        </>
      }
      slotRequiredSKill={
        openSkillForm ? (
          <SkillInput
            addSkill={handleAddSkill}
            closeForm={() => {
              setSkillForm(false);
            }}
          />
        ) : null
      }
      slotSuggestedSkill={
        <>
          {isSkillGenerating && (
            <>
              <UITypography color={palette.grey[400]}>
                Generating Skills
              </UITypography>
              <CircularProgress
                color='inherit'
                size={'15px'}
                sx={{ color: palette.grey[400] }}
              />
            </>
          )}

          {suggSkills.map((p) => {
            return (
              <SuggestedSkillPill
                key={p}
                textSkill={p}
                onClickAdd={{
                  onClick: () => handleAddSkill(p),
                }}
              />
            );
          })}
        </>
      }
      isJobHeaderVisible={formType === 'new'}
    />
  );
};

export default BasicStepTwo;

const SkillInput = ({ addSkill, closeForm }) => {
  const [skill, setSkill] = useState('');

  return (
    <>
      <Stack p={1}>
        <SkillsInput
          onClickCancel={{
            onClick: () => {
              setSkill('');
              closeForm();
            },
          }}
          onClickSave={{
            onClick: () => {
              addSkill(skill);
              setSkill('');
              closeForm();
            },
          }}
          slotInput={
            <UITextField
              placeholder='Problem Solving'
              onChange={(e) => {
                setSkill(e.target.value);
              }}
              value={skill}
            />
          }
        />
      </Stack>
    </>
  );
};
