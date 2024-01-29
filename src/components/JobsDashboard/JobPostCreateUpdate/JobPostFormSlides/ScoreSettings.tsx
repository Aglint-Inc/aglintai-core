import { Popover } from '@mui/material';
import axios from 'axios';
import { get } from 'lodash';
import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';

import {
  Checkbox,
  ScoreCard,
  ScorePillMust,
  ScorePillNice,
  ScoreSetting,
  SettingSkeleton,
} from '@/devlink';
import { AddButton } from '@/devlink/AddButton';
import { ScoreCardEdit } from '@/devlink/ScoreCardEdit';
import AUIButton from '@/src/components/Common/AUIButton';
import UITypography from '@/src/components/Common/UITypography';
import { generatejdToScoreJson } from '@/src/utils/prompts/addNewJob/jd_scoreJson';
import toast from '@/src/utils/toast';

import { JdJsonType, JobFormState, useJobForm } from '../JobPostFormProvider';
import { API_FAIL_MSG } from '../utils';

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
    color: 'rgb(48, 170, 188)',
  },
  {
    label: 'Skill',
    paramKey: 'skills',
    AddBtnLabel: 'Add Skill',
    color: 'rgb(136, 107, 216)',
  },
  {
    label: 'Education',
    paramKey: 'educations',
    AddBtnLabel: 'Add Education',
    color: 'rgb(93, 125, 245)',
  },
];

const ScoreSettings = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [editParam, setEditParam] = useState<ScoreParam>(null);
  const [popUpEl, setPopUpEl] = useState(null);
  const [isJsonLoading, setIsJsonLoading] = useState(false);
  const [newField, setNewField] = useState<newField>(null);
  const [newFieldEv, setNewFieldEv] = useState(null);
  const sourceRef = useRef(axios.CancelToken.source());

  const handleGenerate = async () => {
    try {
      setIsJsonLoading(true);
      const json = await generatejdToScoreJson(
        `
Job Role : ${jobForm.formFields.jobTitle}

${jobForm.formFields.jobDescription}
`,
        sourceRef.current,
      );
    
      const j: JdJsonType = {
        title: jobForm.formFields.jobTitle,
        level: json.jobLevel,
        rolesResponsibilities: arrItemToReactArr([
          ...json.roles,
          ...json.responsibilities,
          ...json.requirements,
        ]),
        skills: arrItemToReactArr([...json.skills]),
        educations: arrItemToReactArr([...json.educations]),
      };

      handleUpdateFormFields({
        path: `resumeScoreSettings`,
        value: getBalancedScore(
          j.rolesResponsibilities.length === 0,
          j.educations.length === 0,
          j.skills.length === 0,
        ),
      });
      if (j.skills.length === 0) {
        handleUpdateFormFields({
          path: 'resumeScoreSettings.skills',
          value: 0,
        });
      }
      if (j.educations.length === 0) {
        handleUpdateFormFields({
          path: 'resumeScoreSettings.education',
          value: 0,
        });
      }

      if (j.rolesResponsibilities.length === 0) {
        handleUpdateFormFields({
          path: 'resumeScoreSettings.experience',
          value: 0,
        });
      }

      handleUpdateFormFields({
        path: 'isjdChanged',
        value: false,
      });
      handleUpdateFormFields({
        path: 'jdJson',
        value: j,
      });
    } catch (err) {
      if (!axios.isCancel(err)) {
        toast.error(API_FAIL_MSG);
      }
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
        jobForm.formFields.jobDescription.split(' ').length > 10
      ) {
        handleGenerate();
      }
    })();
    return () => {
      sourceRef.current.cancel('Pervious request canceled');
    };
  }, [jobForm.formFields.jdJson]);

  const handleClickEdit = (paramKey: string, id: string, s, e) => {
    setEditParam({
      paramKey: paramKey,
      isMustHave: s.isMustHave,
      value: s.field,
      id,
    });
    setPopUpEl(e.currentTarget);
  };

  let isJdTooShort =
    !jobForm.formFields.jobDescription ||
    jobForm.formFields.jobDescription.split(' ').length <= 10;
  let showRegen = false;
  if (!isJsonLoading && !isJdTooShort) {
    showRegen = jobForm.formFields.isjdChanged;
  }
  
  return (
    <>
      {
        <>
          <ScoreSetting
            // isRegenerateVisible={showRegen}
            isRegenerateVisible={showRegen}  
            isEmptyWarningVisible={isJdTooShort}
            slotScoreCardDetails={
              <>
                {params.map((p) => {
                  return (
                    <ScoreCard
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
                                        handleClickEdit(p.paramKey, s.id, s, e),
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
                                        handleClickEdit(p.paramKey, s.id, s, e),
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
                                  value: '',
                                });
                              },
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
                              horizontal: 'left',
                            }}
                            onClose={() => {
                              setNewField(null);
                              setNewFieldEv(null);
                            }}
                            sx={{
                              '& .MuiPaper-outlined': {
                                border: 'none',
                                outline: 'none',
                              },
                            }}
                          >
                            <div
                              style={{
                                width:
                                  newField &&
                                  newField.paramKey === 'rolesResponsibilities'
                                    ? '600px'
                                    : '300px',
                              }}
                            >
                              {newField && (
                                <ScoreCardEdit
                                  isDeleteVisible={false}
                                  slotButtonUpdate={
                                    <>
                                      <AUIButton
                                        size='small'
                                        onClick={() => {
                                          if (newField.value.length === 0)
                                            return;
                                          handleUpdateFormFields({
                                            path: `jdJson.${p.paramKey}`,
                                            value: [
                                              ...get(
                                                jobForm.formFields,
                                                `jdJson.${p.paramKey}`,
                                                [],
                                              ),
                                              {
                                                field: newField.value,
                                                isMustHave: newField.isMustHave,
                                                id: nanoid(),
                                              },
                                            ],
                                          });
                                          setNewField(null);
                                        }}
                                      >
                                        Add
                                      </AUIButton>
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
                                          resize: 'none',
                                        }}
                                        // eslint-disable-next-line jsx-a11y/no-autofocus
                                        autoFocus={true}
                                        placeholder={p.AddBtnLabel}
                                        value={newField?.value}
                                        onChange={(e) => {
                                          setNewField((p) => ({
                                            ...p,
                                            value: e.target.value,
                                          }));
                                        }}
                                      ></textarea>
                                    </>
                                  }
                                  isCancelVisible={true}
                                  onClickCancel={{
                                    onClick: () => {
                                      setNewField(null);
                                    },
                                  }}
                                  slotCheckBox={
                                    <Checkbox
                                      isChecked={newField.isMustHave}
                                      onClickCheck={{
                                        onClick: () => {
                                          setNewField((prev) => ({
                                            ...prev,
                                            isMustHave: !newField?.isMustHave,
                                          }));
                                        },
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
            slotButtonPrimaryRegular={<></>}
            isProceedDisable={false}
            onClickRegenerate={{
              onClick: handleGenerate,
            }}
            onClickDismiss={{
              onClick: () => {
                handleUpdateFormFields({
                  path: 'isjdChanged',
                  value: false,
                });
              },
            }}
          />

          <Popover
            open={Boolean(popUpEl)}
            anchorEl={popUpEl}
            onClose={() => {
              setPopUpEl(null);
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{
              mt: 1,
              '& .MuiPaper-outlined': {
                border: 'none',
                outline: 'none',
              },
            }}
          >
            <div
              style={{
                width:
                  editParam && editParam.paramKey === 'rolesResponsibilities'
                    ? '600px'
                    : '300px',
              }}
            >
              <ScoreCardEdit
                isDeleteVisible={true}
                onClickDelete={{
                  onClick: () => {
                    let arr = get(
                      jobForm.formFields.jdJson,
                      `${editParam.paramKey}`,
                      [],
                    ).filter((it) => it.id !== editParam.id);
                    handleUpdateFormFields({
                      path: `jdJson.${editParam.paramKey}`,
                      value: arr,
                    });
                    // jobForm.formFields.resumeScoreSettings.education;
                    // jobForm.formFields.resumeScoreSettings.skills;
                    // jobForm.formFields.resumeScoreSettings.experience;
                    if (arr.length === 0) {
                      if (editParam.paramKey === 'skills') {
                        handleUpdateFormFields({
                          path: `resumeScoreSettings.skills`,
                          value: 0,
                        });
                      } else if (
                        editParam.paramKey === 'rolesResponsibilities'
                      ) {
                        handleUpdateFormFields({
                          path: `resumeScoreSettings.experience`,
                          value: 0,
                        });
                      } else if (editParam.paramKey === 'educations') {
                        handleUpdateFormFields({
                          path: `resumeScoreSettings.education`,
                          value: 0,
                        });
                      }
                    }

                    setPopUpEl(null);
                  },
                }}
                slotButtonUpdate={
                  <>
                    <AUIButton
                      size='small'
                      onClick={() => {
                        if (editParam.value.length === 0) return;
                        handleUpdateFormFields({
                          path: `jdJson.${editParam.paramKey}`,
                          value: jobForm.formFields.jdJson[
                            String(editParam.paramKey)
                          ].map((item) => {
                            if (item.id === editParam.id)
                              return {
                                ...editParam,
                                field: editParam.value,
                                isMustHave: editParam.isMustHave,
                              };
                            return item;
                          }),
                        });
                        setPopUpEl(null);
                      }}
                    >
                      Update
                    </AUIButton>
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
                        resize: 'none',
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
                          isMustHave: !editParam.isMustHave,
                        }));
                      },
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
  isSkillZero: boolean,
): JobFormState['formFields']['resumeScoreSettings'] => {
  const scoreSetting: JobFormState['formFields']['resumeScoreSettings'] = {
    experience: 60,
    education: 20,
    skills: 20,
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
