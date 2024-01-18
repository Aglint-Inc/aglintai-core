import { Popover } from '@mui/material';
import axios from 'axios';
import { get } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import {
  Checkbox,
  JobEditWarning,
  JobWarningList,
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

import { JdJsonType, useJobForm } from '../JobPostFormProvider';
import { API_FAIL_MSG } from '../utils';

type ScoreParam = {
  paramKey: string;
  value: string;
  isMustHave: boolean;
  index: number;
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
  const { jobForm, handleUpdateFormFields, formWarnings } = useJobForm();
  const [editParam, setEditParam] = useState<ScoreParam>(null);
  const [popUpEl, setPopUpEl] = useState(null);
  const [isJsonLoading, setIsJsonLoading] = useState(false);
  const [newField, setNewField] = useState<newField>(null);
  const [newFieldEv, setNewFieldEv] = useState(null);
  const sourceRef = useRef(axios.CancelToken.source());
  // const onChangeScore = (e, paramKey: string) => {
  //   if (Number(e.target.value) < 0 || Number(e.target.value) > 100) return;
  //   handleUpdateFormFields({
  //     path: `resumeScoreSettings.${paramKey}`,
  //     value: Number(e.target.value),
  //   });
  // };

  const areAllFieldsEmpty =
    jobForm.formFields.jdJson.educations.length === 0 &&
    jobForm.formFields.jdJson.skills.length === 0 &&
    jobForm.formFields.jdJson.rolesResponsibilities.length === 0;

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
        rolesResponsibilities: [
          ...json.roles,
          ...json.responsibilities,
          ...json.requirements,
        ],
        skills: [...json.skills],
        educations: [...json.educations],
      };

      if (j.skills.length === 0) {
        handleUpdateFormFields({
          path: `resumeScoreSettings.skills`,
          value: 0,
        });
      }

      if (j.educations.length === 0) {
        handleUpdateFormFields({
          path: `resumeScoreSettings.educations`,
          value: 0,
        });
      }

      if (j.rolesResponsibilities.length === 0) {
        handleUpdateFormFields({
          path: `resumeScoreSettings.experience`,
          value: 0,
        });
      }

      if (j.skills.length)
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
        jobForm.formFields.jobDescription.split(' ').length > 50
      ) {
        handleGenerate();
      }
    })();
    return () => {
      sourceRef.current.cancel('Pervious request canceled');
    };
  }, [jobForm]);

  const handleClickEdit = (paramKey: string, index: number, s, e) => {
    setEditParam({
      paramKey: paramKey,
      isMustHave: s.isMustHave,
      value: s.field,
      index,
    });
    setPopUpEl(e.currentTarget);
  };

  let isJdTooShort =
    !jobForm.formFields.jobDescription ||
    jobForm.formFields.jobDescription.split(' ').length <= 50;
  let showRegen = false;
  if (!isJsonLoading && !isJdTooShort) {
    showRegen = !areAllFieldsEmpty && jobForm.formFields.isjdChanged;
  }

  return (
    <>
      {
        <>
          <ScoreSetting
            isWarningVisible={formWarnings.resumeScore.err.length > 0}
            slotWarning={
              <>
                <JobEditWarning
                  slotWarningList={
                    <>
                      {formWarnings.resumeScore.err.map((er, index) => (
                        <JobWarningList key={index} textWarning={er} />
                      ))}
                    </>
                  }
                />
              </>
            }
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
                          <UITypography
                            fontBold='normal'
                            type='small'
                            color={p.color}
                          >
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
                                        handleClickEdit(p.paramKey, idx, s, e),
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
                                        handleClickEdit(p.paramKey, idx, s, e),
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
            // slotScoreWeight={
            //   <ScoreWeightage
            //     slotScoreWheel={
            //       <>
            //         <Stack
            //           direction={'row'}
            //           width={'60%'}
            //           justifyContent={'center'}
            //           alignItems={'center'}
            //           gap={'40px'}
            //         >
            //           <ScoreWheel
            //             id={'ScoreWheelSetting'}
            //             parameter_weights={
            //               jobForm.formFields.resumeScoreSettings
            //             }
            //           />
            //         </Stack>
            //       </>
            //     }
            //     slotScorePercent={
            //       <>
            //         <ScorePercentage
            //           colorPropsBg={{
            //             style: {
            //               backgroundColor: '#30AABC',
            //             },
            //           }}
            //           textTitle={'Experience'}
            //           slotInputPercent={
            //             <>
            //               <UITextField
            //                 type='number'
            //                 width='50px'
            //                 value={
            //                   jobForm.formFields.resumeScoreSettings.experience
            //                 }
            //                 onChange={(e) => {
            //                   onChangeScore(e, 'experience');
            //                 }}
            //               />
            //             </>
            //           }
            //         />
            //         <ScorePercentage
            //           colorPropsBg={{
            //             style: {
            //               backgroundColor: '#886BD8',
            //             },
            //           }}
            //           textTitle={'Skill'}
            //           slotInputPercent={
            //             <>
            //               <UITextField
            //                 type='number'
            //                 width='50px'
            //                 value={
            //                   jobForm.formFields.resumeScoreSettings.skills
            //                 }
            //                 onChange={(e) => {
            //                   onChangeScore(e, 'skills');
            //                 }}
            //               />
            //             </>
            //           }
            //         />
            //         <ScorePercentage
            //           colorPropsBg={{
            //             style: {
            //               backgroundColor: '#5D7DF5',
            //             },
            //           }}
            //           textTitle={'Education'}
            //           slotInputPercent={
            //             <>
            //               <UITextField
            //                 type='number'
            //                 width='50px'
            //                 value={
            //                   jobForm.formFields.resumeScoreSettings.education
            //                 }
            //                 onChange={(e) => {
            //                   onChangeScore(e, 'education');
            //                 }}
            //               />
            //             </>
            //           }
            //         />
            //       </>
            //     }
            //     onClickEqualize={{
            //       onClick: () => {
            //         handleUpdateFormFields({
            //           path: `resumeScoreSettings`,
            //           value: {
            //             skills: 34,
            //             experience: 33,
            //             education: 33,
            //           },
            //         });
            //       },
            //     }}
            //   />
            // }
            slotButtonPrimaryRegular={<></>}
            isProceedDisable={false}
            // onClickDone={{
            //   onClick: () => {
            //     handleUpdateFormFields({
            //       path: 'isjdChanged',
            //       value: false,
            //     });
            //   },
            // }}
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

            // slotBasicButton={<></>}
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
                    handleUpdateFormFields({
                      path: `jdJson.${editParam.paramKey}`,
                      value: get(
                        jobForm.formFields.jdJson,
                        `${editParam.paramKey}`,
                        [],
                      ).filter((_, idx) => idx !== editParam.index),
                    });
                    handleUpdateFormFields({
                      path: 'isjdChanged',
                      value: false,
                    });
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
                          path: `jdJson.${editParam.paramKey}[${editParam.index}]`,
                          value: {
                            field: editParam.value,
                            isMustHave: editParam.isMustHave,
                          },
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
                          isMustHave: !editParam?.isMustHave,
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
