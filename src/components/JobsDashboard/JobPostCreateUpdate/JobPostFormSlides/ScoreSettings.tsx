import { Popover, Stack } from '@mui/material';
import { get } from 'lodash';
import { useEffect, useState } from 'react';

import {
  Checkbox,
  LoaderSvg,
  ScoreCard,
  ScorePercentage,
  ScorePillMust,
  ScorePillNice,
  ScoreSetting,
  ScoreWeightage,
} from '@/devlink';
import { ScoreCardEdit } from '@/devlink/ScoreCardEdit';
import AUIButton from '@/src/components/Common/AUIButton';
import ScoreWheel from '@/src/components/Common/ScoreWheel';
import UITextField from '@/src/components/Common/UITextField';
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
}[] = [
  {
    label: 'Experience',
    paramKey: 'rolesResponsibilities',
    AddBtnLabel: 'Add Experience',
  },
  {
    label: 'Skill',
    paramKey: 'skills',
    AddBtnLabel: 'Add Skill',
  },
  {
    label: 'Education',
    paramKey: 'educations',
    AddBtnLabel: 'Add Education',
  },
];

const ScoreSettings = () => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const [editParam, setEditParam] = useState<ScoreParam>(null);
  const [popUpEl, setPopUpEl] = useState(null);
  const [isJsonLoading, setIsJsonLoading] = useState(true);
  const [newField, setNewField] = useState<newField>(null);

  const onChangeScore = (e, paramKey: string) => {
    if (Number(e.target.value) < 0 || Number(e.target.value) > 100) return;
    handleUpdateFormFields({
      path: `resumeScoreSettings.${paramKey}`,
      value: Number(e.target.value),
    });
  };

  useEffect(() => {
    (async () => {
      try {
        if (
          jobForm.formFields.jdJson.educations.length === 0 &&
          jobForm.formFields.jdJson.skills.length === 0 &&
          jobForm.formFields.jdJson.rolesResponsibilities.length === 0 &&
          jobForm.formFields.jobDescription &&
          jobForm.formFields.jobDescription.split(' ').length > 50
        ) {
          setIsJsonLoading(true);
          const json = await generatejdToScoreJson(
            jobForm.formFields.jobDescription,
          );

          const j: JdJsonType = {
            rolesResponsibilities: [...json.roles, ...json.responsibilities],
            skills: [...json.skills],
            educations: [...json.educations],
          };

          handleUpdateFormFields({
            path: 'jdJson',
            value: j,
          });
        }
      } catch (err) {
        toast.error(API_FAIL_MSG);
      } finally {
        setIsJsonLoading(false);
      }
    })();
  }, []);

  const handleClickEdit = (paramKey: string, index: number, s, e) => {
    setEditParam({
      paramKey: paramKey,
      isMustHave: s.isMustHave,
      value: s.field,
      index,
    });
    setPopUpEl(e.currentTarget);
  };

  return (
    <>
      {
        <>
          <ScoreSetting
            slotScoreCardDetails={
              <>
                {isJsonLoading && (
                  <>
                    <Stack
                      height={'200px'}
                      direction={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      width={'500px'}
                    >
                      <LoaderSvg />
                    </Stack>
                  </>
                )}
                {!isJsonLoading &&
                  params.map((p) => {
                    return (
                      <ScoreCard
                        key={p.paramKey}
                        textHeading={p.label}
                        slotScorePills={
                          <>
                            {get(
                              jobForm.formFields,
                              `jdJson.${p.paramKey}`,
                              [],
                            ).map((s, idx) => {
                              if (s.isMustHave) {
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
                              } else {
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
                              }
                            })}
                          </>
                        }
                        textAddButton={p.AddBtnLabel}
                        onClickAdd={{
                          onClick: () => {
                            setNewField({
                              paramKey: p.paramKey,
                              isMustHave: true,
                              value: '',
                            });
                          },
                        }}
                        slotAddCard={
                          newField &&
                          newField.paramKey === p.paramKey && (
                            <ScoreCardEdit
                              isDeleteVisible={false}
                              slotButtonUpdate={
                                <>
                                  <AUIButton
                                    size='small'
                                    onClick={() => {
                                      if (newField.value.length === 0) return;
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
                          )
                        }
                      />
                    );
                  })}
              </>
            }
            slotScoreWeight={
              <ScoreWeightage
                slotScoreWheel={
                  <>
                    <Stack
                      direction={'row'}
                      width={'60%'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      gap={'40px'}
                    >
                      <ScoreWheel
                        id={'ScoreWheelSetting'}
                        parameter_weights={
                          jobForm.formFields.resumeScoreSettings
                        }
                      />
                    </Stack>
                  </>
                }
                slotScorePercent={
                  <>
                    <ScorePercentage
                      colorPropsBg={{
                        style: {
                          backgroundColor: '#30AABC',
                        },
                      }}
                      textTitle={'Experience'}
                      slotInputPercent={
                        <>
                          <UITextField
                            type='number'
                            width='50px'
                            value={
                              jobForm.formFields.resumeScoreSettings.experience
                            }
                            onChange={(e) => {
                              onChangeScore(e, 'experience');
                            }}
                          />
                        </>
                      }
                    />
                    <ScorePercentage
                      colorPropsBg={{
                        style: {
                          backgroundColor: '#886BD8',
                        },
                      }}
                      textTitle={'Skill'}
                      slotInputPercent={
                        <>
                          <UITextField
                            type='number'
                            width='50px'
                            value={
                              jobForm.formFields.resumeScoreSettings.skills
                            }
                            onChange={(e) => {
                              onChangeScore(e, 'skills');
                            }}
                          />
                        </>
                      }
                    />
                    <ScorePercentage
                      colorPropsBg={{
                        style: {
                          backgroundColor: '#5D7DF5',
                        },
                      }}
                      textTitle={'Education'}
                      slotInputPercent={
                        <>
                          <UITextField
                            type='number'
                            width='50px'
                            value={
                              jobForm.formFields.resumeScoreSettings.education
                            }
                            onChange={(e) => {
                              onChangeScore(e, 'education');
                            }}
                          />
                        </>
                      }
                    />
                  </>
                }
                onClickEqualize={{
                  onClick: () => {
                    handleUpdateFormFields({
                      path: `resumeScoreSettings`,
                      value: {
                        skills: 34,
                        experience: 33,
                        education: 33,
                      },
                    });
                  },
                }}
              />
            }
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
                    update
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
          </Popover>
        </>
      }
    </>
  );
};
export default ScoreSettings;
