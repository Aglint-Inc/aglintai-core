import { useEffect, useState } from 'react';

import { NewJobStep3, SkillPill, SuggestedSkillPill } from '@/devlink';

import { useJobList } from '../JobPostFormProvider';
import TipTapAIEditor from '../../../Common/TipTapAIEditor';
// import UITextField from '../../../Common/UITextField';

type Skill = {
  skill: string;
  added: boolean;
};

const FormThree = () => {
  const { dispatch } = useJobList();
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setSkills(() => {
      return ['HTML', 'CSS', 'Typescript', 'Python'].map((p) => ({
        skill: p,
        added: false,
      }));
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'setJobdetails',
      payload: {
        path: '',
        value: skills.filter((s) => s.added).map((s) => s.skill),
      },
    });
  }, [skills]);

  return (
    <NewJobStep3
      onClickAddSkill={{
        onClick: () => {
          //
        },
      }}
      slotJobDescription={
        <>
          <TipTapAIEditor
            placeholder='Job Description'
            handleChange={(s) => {
              dispatch({
                type: 'setJobdetails',
                payload: { path: 'jobDescription', value: s },
              });
            }}
            initialValue=''
          />
        </>
      }
      slotAddedSkill={
        <>
          {skills
            .filter((p) => p.added)
            .map((p) => {
              return (
                <SkillPill
                  key={p.skill}
                  textSkill={p.skill}
                  onClickRemove={{
                    onClick: () => {
                      const newSkills = skills.filter(
                        (s) => s.skill !== p.skill,
                      );
                      setSkills(() => newSkills);
                    },
                  }}
                />
              );
            })}
        </>
      }
      // slotInputForm={
      //   <>
      //     <UITextField />
      //   </>
      // }
      slotSuggestedSkill={
        <>
          {skills
            .filter((p) => !p.added)
            .map((p) => {
              return (
                <SuggestedSkillPill
                  key={p.skill}
                  textSkill={p.skill}
                  onClickAdd={{
                    onClick: () => {
                      const newSkills = skills.map((s) => {
                        if (p.skill === s.skill) return { ...s, added: true };
                        return s;
                      });
                      setSkills(() => newSkills);
                    },
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
