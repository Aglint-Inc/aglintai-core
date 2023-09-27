import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

import {
  NewJobStep3,
  SkillPill,
  SkillsInput,
  SuggestedSkillPill,
} from '@/devlink';
import UITextField from '@/src/components/Common/UITextField';
import { generateSkills } from '@/src/utils/prompts/addNewJob/generateSkills';
import toast from '@/src/utils/toast';

import { useJobForm } from '../JobPostFormProvider';
import TipTapAIEditor from '../../../Common/TipTapAIEditor';
// import UITextField from '../../../Common/UITextField';

const FormThree = () => {
  const {
    handleUpdateFormFields,
    jobForm: { formFields },
  } = useJobForm();
  const [suggSkills, setSuggSkills] = useState<string[]>([]);
  const [openSkillForm, setSkillForm] = useState(false);

  useEffect(() => {
    (async () => {
      try {
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

  return (
    <NewJobStep3
      onClickAddSkill={{
        onClick: () => {
          setSkillForm(true);
        },
      }}
      isAddSkillVisible={true}
      slotJobDescription={
        <>
          <TipTapAIEditor
            placeholder='Job Description'
            handleChange={(s) => {
              handleUpdateFormFields({
                path: 'jobDescription',
                value: s,
              });
            }}
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
    />
  );
};

export default FormThree;

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
