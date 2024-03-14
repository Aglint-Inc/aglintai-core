import { Autocomplete, TextField } from '@mui/material';
import { cloneDeep } from 'lodash';
import { useMemo, useState } from 'react';

import { PanelMemberPill } from '@/devlink2';
import { InterviewPlanCard } from '@/devlink3';

import { defaultDurations, handleUpdateDb, useInterviewPlan } from './store';
import { InterviewSession } from './types';
import { filterAddedModules } from './utils';
import MuiAvatar from '../Common/MuiAvatar';
import UISelect from '../Common/Uiselect';
import UITextField from '../Common/UITextField';

const EditModule = ({
  initModule,
  onClose,
  isEdit,
  editModuleId
}: {
  initModule: InterviewSession;
  onClose: any;
  isBreak: boolean;
  isEdit: boolean;
  editModuleId: string;
}) => {
  const { allModules, modules } = useInterviewPlan();
  const [moduleform, setModule] = useState<InterviewSession>(initModule);
  let isDisabled = false;
  if (
    (moduleform.module_id.length === 0 ||
      moduleform.meetingIntervCnt === 0 ||
      moduleform.selectedIntervs.length === 0 ||
      moduleform.module_name.length === 0) &&
    !moduleform.isBreak
  ) {
    isDisabled = true;
  }
  const handleSubmit = () => {
    if (isDisabled) return;

    let modifModules;
    if (!isEdit) {
      modifModules = [...modules, moduleform];
    } else {
      modifModules = modules.map((m) => {
        if (m.module_id === editModuleId) {
          return moduleform;
        } else return m;
      });
    }
    handleUpdateDb({ path: 'modules', value: modifModules });
    onClose();
  };

  const updateAllMembers = (name) => {
    const mod = allModules.find((m) => m.module_name === name);
    setModule((prev) => {
      let newModule = cloneDeep(prev);
      newModule.allIntervs = mod.allIntervs;
      newModule.selectedIntervs = [...mod.allIntervs];
      newModule.training_ints = [...mod.training_ints];
      newModule.shadowIntervs = mod.training_ints.slice(0, 1);
      newModule.revShadowIntervs = mod.training_ints.slice(1, 2);
      newModule.meetingIntervCnt = 1;
      newModule.module_id = mod.module_id;
      newModule.module_name = mod.module_name;

      return newModule;
    });
  };

  const filteredModules = useMemo(() => {
    return filterAddedModules(allModules, modules);
  }, []);
  return (
    <InterviewPlanCard
      isMemberSelectionVisible={!moduleform.isBreak}
      isInterviewModuleVisible={!moduleform.isBreak}
      isSessionNameVisible={!moduleform.isBreak}
      isQualifiedMemberVisible={!moduleform.isBreak}
      isReverseShadowVisible={!moduleform.isBreak}
      isShadowMemberVisible={!moduleform.isBreak}
      slotInterviewModuleInput={
        <>
          <Autocomplete
            fullWidth
            options={filteredModules.map((m) => ({
              label: m.module_name,
              value: m.module_name
            }))}
            value={{
              label: moduleform.module_name,
              value: moduleform.module_name
            }}
            getOptionLabel={(option: any) => option.label}
            onChange={(event, value) => {
              if (value) {
                updateAllMembers(value.value);
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          {/* <UISelect
            menuOptions={filteredModules.map((m) => ({
              name: m.module_name,
              value: m.module_name
            }))}
            onChange={(event) => {
              updateAllMembers(event.target.value);
            }}
            value={moduleform.module_name}
            defaultValue={initModule.module_name}
          /> */}
        </>
      }
      slotDurationInput={
        <>
          <UISelect
            menuOptions={
              moduleform.isBreak
                ? defaultDurations.slice(0, 4)
                : defaultDurations.slice(3)
            }
            defaultValue={String(moduleform.duration)}
            onChange={(e) => {
              setModule((prev) => {
                prev.duration = Number(e.target.value);
                return { ...prev };
              });
            }}
            value={String(moduleform.duration)}
          />
        </>
      }
      slotQualifiedMemberList={
        <>
          {moduleform.selectedIntervs.map((mem) => {
            return (
              <PanelMemberPill
                key={mem.interv_id}
                slotImage={
                  <MuiAvatar
                    variant='rounded'
                    src={mem.profile_image}
                    level={mem.name}
                    fontSize='15px'
                    width={'25px'}
                    height={'25px'}
                  />
                }
                textMemberName={mem.name}
                onClickClose={{
                  onClick: () => {
                    setModule((prev) => {
                      prev.selectedIntervs = prev.selectedIntervs.filter(
                        (i) => i.interv_id !== mem.interv_id
                      );
                      return { ...prev };
                    });
                  }
                }}
              />
            );
          })}
        </>
      }
      slotSearchQualifiedMember={
        <>
          <Autocomplete
            options={moduleform.allIntervs.map((int) => ({
              label: int.name,
              value: int.interv_id
            }))}
            onChange={(event: any, newValue: any) => {
              if (!newValue) return;
              if (
                !moduleform.selectedIntervs.find(
                  (i) => i.interv_id == newValue.value
                )
              ) {
                setModule((prev) => {
                  let int = prev.allIntervs.find(
                    (i) => i.interv_id === newValue.value
                  );
                  prev.selectedIntervs.push(int);
                  return { ...prev };
                });
              }
            }}
            renderInput={(params) => {
              return (
                <UITextField
                  rest={{ ...params }}
                  labelBold='normal'
                  placeholder='Search members'
                />
              );
            }}
            defaultValue={{
              label: '',
              value: ''
            }}
            freeSolo
            disablePortal
          />
        </>
      }
      slotInputSelectedQualified={
        <>
          <UISelect
            menuOptions={moduleform.allIntervs.map((i, idx) => ({
              name: String(idx + 1),
              value: String(idx + 1)
            }))}
            onChange={(e) => {
              setModule((p) => {
                p.meetingIntervCnt = Number(e.target.value);
                return { ...p };
              });
            }}
            value={String(moduleform.meetingIntervCnt)}
            defaultValue={'1'}
          />
        </>
      }
      slotShadowMemberList={
        <>
          {moduleform.shadowIntervs.map((mem) => {
            return (
              <PanelMemberPill
                key={mem.interv_id}
                slotImage={
                  <MuiAvatar
                    variant='rounded'
                    src={mem.profile_img ?? ''}
                    level={mem.name}
                    fontSize='15px'
                    width={'25px'}
                    height={'25px'}
                  />
                }
                textMemberName={mem.name}
                onClickClose={{
                  onClick: () => {
                    setModule((prev) => {
                      prev.shadowIntervs = prev.shadowIntervs.filter(
                        (i) => i.interv_id !== mem.interv_id
                      );
                      return { ...prev };
                    });
                  }
                }}
              />
            );
          })}
        </>
      }
      slotShadowMemberSearch={
        <>
          <Autocomplete
            options={moduleform.training_ints
              .filter(
                (i) =>
                  !moduleform.revShadowIntervs.find(
                    (si) => si.interv_id === i.interv_id
                  )
              )
              .map((int) => ({
                label: int.name,
                value: int.interv_id
              }))}
            onChange={(event: any, newValue: any) => {
              if (!newValue) return;
              if (
                !moduleform.shadowIntervs.find(
                  (i) => i.interv_id == newValue.value
                )
              ) {
                setModule((prev) => {
                  let int = prev.training_ints.find(
                    (i) => i.interv_id === newValue.value
                  );
                  prev.shadowIntervs.push(int);
                  return { ...prev };
                });
              }
            }}
            renderInput={(params) => {
              return (
                <UITextField
                  rest={{ ...params }}
                  labelBold='normal'
                  placeholder='Search members'
                />
              );
            }}
            defaultValue={{
              label: '',
              value: ''
            }}
            freeSolo
            disablePortal
          />
        </>
      }
      slotReverseShadowMemberList={
        <>
          {moduleform.revShadowIntervs.map((mem) => {
            return (
              <PanelMemberPill
                key={mem.interv_id}
                slotImage={
                  <MuiAvatar
                    variant='rounded'
                    src={mem.profile_img ?? ''}
                    level={mem.name}
                    fontSize='15px'
                    width={'25px'}
                    height={'25px'}
                  />
                }
                textMemberName={mem.name}
                onClickClose={{
                  onClick: () => {
                    setModule((prev) => {
                      prev.revShadowIntervs = prev.revShadowIntervs.filter(
                        (i) => i.interv_id !== mem.interv_id
                      );
                      return { ...prev };
                    });
                  }
                }}
              />
            );
          })}
        </>
      }
      slotRsSearch={
        <>
          <Autocomplete
            options={moduleform.training_ints
              .filter(
                (i) =>
                  !moduleform.shadowIntervs.find(
                    (si) => si.interv_id === i.interv_id
                  )
              )
              .map((int) => ({
                label: int.name,
                value: int.interv_id
              }))}
            onChange={(event: any, newValue: any) => {
              if (!newValue) return;
              if (
                !moduleform.revShadowIntervs.find(
                  (i) => i.interv_id == newValue.value
                )
              ) {
                setModule((prev) => {
                  let int = prev.training_ints.find(
                    (i) => i.interv_id === newValue.value
                  );
                  prev.revShadowIntervs.push(int);
                  return { ...prev };
                });
              }
            }}
            renderInput={(params) => {
              return (
                <UITextField
                  rest={{ ...params }}
                  labelBold='normal'
                  placeholder='Search members'
                />
              );
            }}
            defaultValue={{
              label: '',
              value: ''
            }}
            freeSolo
            disablePortal
          />
        </>
      }
      slotSessionNameInput={
        <>
          <UITextField
            onChange={(e) => {
              setModule((p) => {
                p.session_name = e.target.value;
                return { ...p };
              });
            }}
            value={moduleform.session_name}
          />
        </>
      }
      onClickCancel={{
        onClick: () => {
          onClose();
        }
      }}
      onClickDone={{
        onClick: handleSubmit
      }}
    />
  );
};

export default EditModule;
