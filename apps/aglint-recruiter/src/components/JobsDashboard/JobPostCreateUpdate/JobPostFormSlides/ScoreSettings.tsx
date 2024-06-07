import { Popover } from '@mui/material';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

import { AddButton } from '@/devlink/AddButton';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { Checkbox } from '@/devlink/Checkbox';
import { ScoreCard } from '@/devlink/ScoreCard';
import { ScoreCardEdit } from '@/devlink/ScoreCardEdit';
import { ScorePillMust } from '@/devlink/ScorePillMust';
import { ScorePillNice } from '@/devlink/ScorePillNice';
import { ScoreSetting } from '@/devlink/ScoreSetting';
import { SettingSkeleton } from '@/devlink/SettingSkeleton';
import UITypography from '@/src/components/Common/UITypography';
import { generatejdToScoreJson } from '@/src/utils/prompts/addNewJob/jd_scoreJson';
import toast from '@/src/utils/toast';

import { JdJsonType, JobFormState, useJobForm } from '../JobPostFormProvider';
import { API_FAIL_MSG } from '../utils';
import { isAutoGenJson, removeAutogenJson } from './BasicStepTwo';

type ScoreParam = {
  paramKey: string;
  value: string;
  isMustHave: boolean;
  id: string;
} | null;

type newField = {
  paramKey: 'rolesResponsibilities' | 'skills' | 'educations';
  value: string;
  isMustHave: boolean;
} | null;

const params: {
  label: string;
  paramKey: newField['paramKey'];
  AddBtnLabel: string;
  color: string;
}[] = [
  {
    label: 'Experience',
    paramKey: 'rolesResponsibilities',
    AddBtnLabel: 'Add Experience',
    color: 'rgb(48, 170, 188)'
  },
  {
    label: 'Skill',
    paramKey: 'skills',
    AddBtnLabel: 'Add Skill',
    color: 'rgb(136, 107, 216)'
  },
  {
    label: 'Education',
    paramKey: 'educations',
    AddBtnLabel: 'Add Education',
    color: 'rgb(93, 125, 245)'
  }
];

const ScoreSettings = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [editParam, setEditParam] = useState<ScoreParam>(null);
  const [popUpEl, setPopUpEl] = useState(null);
  const [isJsonLoading, setIsJsonLoading] = useState(false);
  const [newField, setNewField] = useState<newField>(null);
  const [newFieldEv, setNewFieldEv] = useState(null);

  const handleGenerate = async () => {
    try {
      setIsJsonLoading(true);
      removeAutogenJson(jobForm.jobPostId);

      const json = await generatejdToScoreJson(
        `
Job Role : ${jobForm.formFields.jobTitle}

${jobForm.formFields.jobDescription}
`
      );

      const j: JdJsonType = {
        title: jobForm.formFields.jobTitle,
        level: json.jobLevel,
        rolesResponsibilities: arrItemToReactArr([
          ...json.roles,
          ...json.responsibilities,
          ...json.requirements
        ]),
        skills: arrItemToReactArr([...json.skills]),
        educations: arrItemToReactArr([...json.educations])
      };

      handleUpdateFormFields({
        multipayload: [
          {
            path: `resumeScoreSettings`,
            value: getBalancedScore(
              j.rolesResponsibilities.length === 0,
              j.educations.length === 0,
              j.skills.length === 0
            )
          },
          {
            path: 'isjdChanged',
            value: false
          },
          {
            path: 'jdJson',
            value: j
          }
        ]
      });
      // handleUpdateFormFields({
      //   path: `resumeScoreSettings`,
      //   value: getBalancedScore(
      //     j.rolesResponsibilities.length === 0,
      //     j.educations.length === 0,
      //     j.skills.length === 0,
      //   ),
      // });
      // handleUpdateFormFields({
      //   path: 'isjdChanged',
      //   value: false,
      // });
      // handleUpdateFormFields({
      //   path: 'jdJson',
      //   value: j,
      // });
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsJsonLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const areAllFieldsEmpty =
        jobForm.formFields.jdJson.educations.length === 0 &&
        jobForm.formFields.jdJson.skills.length === 0 &&
        jobForm.formFields.jdJson.rolesResponsibilities.length === 0;
      if (
        areAllFieldsEmpty &&
        jobForm.formFields.jobDescription &&
        jobForm.formFields.jobDescription.split(' ').length > 10 &&
        isAutoGenJson(jobForm.jobPostId)
      ) {
        handleGenerate();
      }
    })();
  }, [jobForm.formFields.jdJson]);

  const handleClickEdit = (paramKey: string, id: string, s, e) => {
    setEditParam({
      paramKey: paramKey,
      isMustHave: s.isMustHave,
      value: s.field,
      id
    });
    setPopUpEl(e.currentTarget);
  };

  const handleAddFeild = (paramKey: newField['paramKey']) => {
    const isFeildValExist = get(
      jobForm.formFields,
      `jdJson.${paramKey}`,
      []
    ).find(
      (s) =>
        s.field.trim().toLowerCase() === newField.value.trim().toLowerCase()
    );
    if (isFeildValExist) {
      toast.warning(`Field already exists.`);
      setNewField(null);

      return;
    }
    if (newField.value.length === 0) return;
    handleUpdateFormFields({
      path: `jdJson.${paramKey}`,
      value: [
        ...get(jobForm.formFields, `jdJson.${paramKey}`, []),
        {
          field: newField.value,
          isMustHave: newField.isMustHave,
          id: nanoid()
        }
      ]
    });
    setNewField(null);
  };

  const handleEdit = () => {
    if (editParam.value.length === 0) return;
    const existedItem = jobForm.formFields.jdJson[
      String(editParam.paramKey)
    ].find(
      (it) =>
        it.id !== editParam.id &&
        it.field.trim().toLowerCase() === editParam.value.trim().toLowerCase()
    );
    if (existedItem) {
      toast.warning(`Field already exists.`);
      setPopUpEl(null);
      return;
    }

    handleUpdateFormFields({
      path: `jdJson.${editParam.paramKey}`,
      value: jobForm.formFields.jdJson[String(editParam.paramKey)].map(
        (item) => {
          if (item.id === editParam.id)
            return {
              ...editParam,
              field: editParam.value,
              isMustHave: editParam.isMustHave
            };
          return item;
        }
      )
    });
    setPopUpEl(null);
  };

  // let isJdTooShort =
  //   !jobForm.formFields.jobDescription ||
  //   jobForm.formFields.jobDescription.split(' ').length <= 10;
  // let showRegen = false;
  // if (!isJsonLoading && !isJdTooShort) {
  //   showRegen = jobForm.formFields.isjdChanged;
  // }

  return (
    <>
      {
        <>
          <ScoreSetting
            // isRegenerateVisible={showRegen}
            // isRegenerateVisible={showRegen}
            // isEmptyWarningVisible={isJdTooShort}
            slotScoreCardDetails={
              <>
                {params.map((p) => {
                  return (
                    <ScoreCard
                      colorPropsHeading={{
                        style: {
                          backgroundColor: p.color
                        }
                      }}
                      key={p.paramKey}
                      textHeading={
                        <>
                          <UITypography fontBold='normal' type='small'>
                            {p.label}
                          </UITypography>
                        </>
                      }
                      slotScorePills={
                        <>
                          {isJsonLoading && <SettingSkeleton />}
                          {!isJsonLoading &&
                            get(jobForm.formFields, `jdJson.${p.paramKey}`, [])
                              .filter((s) => s.isMustHave)
                              .map((s, idx) => {
                                return (
                                  <ScorePillMust
                                    key={idx}
                                    textDetails={s.field}
                                    onClickEditText={{
                                      onClick: (e) =>
                                        handleClickEdit(p.paramKey, s.id, s, e)
                                    }}
                                  />
                                );
                              })}
                          {!isJsonLoading &&
                            get(jobForm.formFields, `jdJson.${p.paramKey}`, [])
                              .filter((s) => !s.isMustHave)
                              .map((s, idx) => {
                                return (
                                  <ScorePillNice
                                    key={idx}
                                    textDetails={s.field}
                                    onClickEditText={{
                                      onClick: (e) =>
                                        handleClickEdit(p.paramKey, s.id, s, e)
                                    }}
                                  />
                                );
                              })}
                        </>
                      }
                      slotAddButton={
                        <>
                          <AddButton
                            textAddButton={p.AddBtnLabel}
                            onClickAdd={{
                              onClick: (e) => {
                                setNewFieldEv(e.currentTarget);
                                setNewField({
                                  paramKey: p.paramKey,
                                  isMustHave: true,
                                  value: ''
                                });
                              }
                            }}
                          />
                          <Popover
                            open={
                              Boolean(newFieldEv) &&
                              newField &&
                              newField.paramKey === p.paramKey
                            }
                            anchorEl={newFieldEv}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left'
                            }}
                            onClose={() => {
                              setNewField(null);
                              setNewFieldEv(null);
                            }}
                            sx={{
                              '& .MuiPaper-outlined': {
                                border: 'none',
                                outline: 'none'
                              }
                            }}
                          >
                            <div
                              style={{
                                width:
                                  newField &&
                                  newField.paramKey === 'rolesResponsibilities'
                                    ? '600px'
                                    : '300px'
                              }}
                            >
                              {newField && (
                                <ScoreCardEdit
                                  isDeleteVisible={false}
                                  slotButtonUpdate={
                                    <>
                                    <ButtonSolid size={'2'} isLeftIcon={false} isRightIcon={false} onClickButton={async () => await handleAddFeild(p.paramKey)} textButton="Add" />
                                      {/* <AUIButton
                                        size='small'
                                        onClick={() => {
                                          handleAddFeild(p.paramKey);
                                        }}
                                      >
                                        Add
                                      </AUIButton> */}
                                    </>
                                  }
                                  slotTextEdit={
                                    <>
                                      <textarea
                                        style={{
                                          width: '100%',
                                          outline: 'none',
                                          border: '0px',
                                          backgroundColor: '#f8f9f9',
                                          resize: 'none'
                                        }}
                                        // eslint-disable-next-line jsx-a11y/no-autofocus
                                        autoFocus={true}
                                        placeholder={p.AddBtnLabel}
                                        value={newField?.value}
                                        onChange={(e) => {
                                          setNewField((p) => ({
                                            ...p,
                                            value: e.target.value
                                          }));
                                        }}
                                      ></textarea>
                                    </>
                                  }
                                  isCancelVisible={true}
                                  onClickCancel={{
                                    onClick: () => {
                                      setNewField(null);
                                    }
                                  }}
                                  slotCheckBox={
                                    <Checkbox
                                      isChecked={newField.isMustHave}
                                      onClickCheck={{
                                        onClick: () => {
                                          setNewField((prev) => ({
                                            ...prev,
                                            isMustHave: !newField?.isMustHave
                                          }));
                                        }
                                      }}
                                    />
                                  }
                                />
                              )}
                            </div>
                          </Popover>
                        </>
                      }
                    />
                  );
                })}
              </>
            }
            // onClickRegenerate={{
            //   onClick: handleGenerate
            // }}
            // onClickDismiss={{
            //   onClick: () => {
            //     handleUpdateFormFields({
            //       path: 'isjdChanged',
            //       value: false
            //     });
            //   }
            // }}
          />

          <Popover
            open={Boolean(popUpEl)}
            anchorEl={popUpEl}
            onClose={() => {
              setPopUpEl(null);
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            sx={{
              mt: 1,
              '& .MuiPaper-outlined': {
                border: 'none',
                outline: 'none'
              }
            }}
          >
            <div
              style={{
                width:
                  editParam && editParam.paramKey === 'rolesResponsibilities'
                    ? '600px'
                    : '300px'
              }}
            >
              <ScoreCardEdit
                isDeleteVisible={true}
                onClickDelete={{
                  onClick: () => {
                    let arr = get(
                      jobForm.formFields.jdJson,
                      `${editParam.paramKey}`,
                      []
                    ).filter((it) => it.id !== editParam.id);

                    // jobForm.formFields.resumeScoreSettings.education;
                    // jobForm.formFields.resumeScoreSettings.skills;
                    // jobForm.formFields.resumeScoreSettings.experience;
                    if (arr.length === 0) {
                      if (editParam.paramKey === 'skills') {
                        handleUpdateFormFields({
                          multipayload: [
                            {
                              path: `resumeScoreSettings.skills`,
                              value: 0
                            },
                            {
                              path: `jdJson.${editParam.paramKey}`,
                              value: arr
                            }
                          ]
                        });
                      } else if (
                        editParam.paramKey === 'rolesResponsibilities'
                      ) {
                        handleUpdateFormFields({
                          multipayload: [
                            {
                              path: `resumeScoreSettings.experience`,
                              value: 0
                            },
                            {
                              path: `jdJson.${editParam.paramKey}`,
                              value: arr
                            }
                          ]
                        });
                      } else if (editParam.paramKey === 'educations') {
                        handleUpdateFormFields({
                          multipayload: [
                            {
                              path: `resumeScoreSettings.education`,
                              value: 0
                            },
                            {
                              path: `jdJson.${editParam.paramKey}`,
                              value: arr
                            }
                          ]
                        });
                      }
                    } else {
                      handleUpdateFormFields({
                        path: `jdJson.${editParam.paramKey}`,
                        value: arr
                      });
                    }

                    setPopUpEl(null);
                  }
                }}
                slotButtonUpdate={
                  <>
                  <ButtonSolid size={'2'} isLeftIcon={false} isRightIcon={false} onClickButton={() => {
                        handleEdit();
                      }} textButton="Update" />
                    {/* <AUIButton
                      size='small'
                      onClick={() => {
                        handleEdit();
                      }}
                    >
                      Update
                    </AUIButton> */}
                  </>
                }
                slotTextEdit={
                  <>
                    <textarea
                      style={{
                        width: '100%',
                        outline: 'none',
                        border: '0px',
                        backgroundColor: 'transparent',
                        resize: 'none'
                      }}
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus={true}
                      placeholder={'Type Here'}
                      value={editParam?.value}
                      onChange={(e) => {
                        setEditParam((p) => ({ ...p, value: e.target.value }));
                      }}
                    ></textarea>
                  </>
                }
                slotCheckBox={
                  <Checkbox
                    isChecked={editParam?.isMustHave}
                    onClickCheck={{
                      onClick: () => {
                        setEditParam((prev) => ({
                          ...prev,
                          isMustHave: !editParam.isMustHave
                        }));
                      }
                    }}
                  />
                }
              />
            </div>
          </Popover>
        </>
      }
    </>
  );
};
export default ScoreSettings;

export const getBalancedScore = (
  isExpZero: boolean,
  isEduZero: boolean,
  isSkillZero: boolean
): JobFormState['formFields']['resumeScoreSettings'] => {
  const scoreSetting: JobFormState['formFields']['resumeScoreSettings'] = {
    experience: 60,
    education: 20,
    skills: 20
  };

  if (isExpZero && isEduZero && isSkillZero) {
    scoreSetting.education = 0;
    scoreSetting.skills = 0;
    scoreSetting.experience = 0;
    return scoreSetting;
  }
  if (!isExpZero && !isEduZero && !isSkillZero) {
    return scoreSetting;
  }
  if (isExpZero) {
    scoreSetting.experience = 0;
    scoreSetting.skills = isEduZero ? 100 : 50;
    scoreSetting.education = isEduZero ? 0 : 50;
  } else if (isEduZero) {
    scoreSetting.experience = isSkillZero ? 100 : 50;
    scoreSetting.skills = isSkillZero ? 0 : 50;
    scoreSetting.education = 0;
  } else if (isSkillZero) {
    scoreSetting.experience = 50;
    scoreSetting.skills = 0;
    scoreSetting.education = 50;
  }

  return scoreSetting;
};

const arrItemToReactArr = (arr: any[]) => {
  return arr.map((a) => ({ ...a, id: nanoid() }));
};
