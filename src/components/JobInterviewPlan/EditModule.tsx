import { Autocomplete } from '@mui/material';
import { useState } from 'react';

import { PanelMemberPill } from '@/devlink2';
import { InterviewPlanCard } from '@/devlink3';

import { defaultDurations, handleUpdateDb, useInterviewPlan } from './store';
import { InterviewModule } from './types';
import { filterAddedModules } from './utils';
import MuiAvatar from '../Common/MuiAvatar';
import UISelect from '../Common/Uiselect';
import UITextField from '../Common/UITextField';

const EditModule = ({
  initModule,
  onClose,
  isEdit
}: {
  initModule: InterviewModule;
  onClose: any;
  isBreak: boolean;
  isEdit: boolean;
}) => {
  const { allModules, modules } = useInterviewPlan();
  const [module, setModule] = useState<InterviewModule>(initModule);
  let isDisabled = false;
  if (
    (module.module_id.length === 0 ||
      module.meetingIntervCnt === 0 ||
      module.selectedIntervs.length === 0 ||
      module.name.length === 0) &&
    !module.isBreak
  ) {
    isDisabled = true;
  }
  const handleSubmit = () => {
    if (isDisabled) return;
    let modifModules;
    if (!isEdit) {
      modifModules = [...modules, module];
    } else {
      modifModules = modules.map((m) => {
        if (m.module_id === module.module_id) return module;
        else return m;
      });
    }
    handleUpdateDb({ path: 'modules', value: modifModules });
    onClose();
  };

  const updateAllMembers = (name) => {
    const mod = allModules.find((m) => m.name === name);
    setModule((prev) => {
      prev.allIntervs = mod.allIntervs;
      prev.selectedIntervs = [...mod.allIntervs];
      prev.meetingIntervCnt = 1;
      return { ...prev };
    });
  };

  const filteredModules = filterAddedModules(allModules, modules);
  return (
    <InterviewPlanCard
      isMemberVisible={!module.isBreak}
      isMemberSelectionVisible={!module.isBreak}
      isInterviewModuleVisible={!module.isBreak}
      slotInterviewModuleInput={
        <>
          <Autocomplete
            options={filteredModules.map((m) => ({
              label: m.name,
              value: m.name
            }))}
            onChange={(event: any, newValue: any) => {
              if (!newValue) return;
              updateAllMembers(newValue.value);
              setModule((prev) => {
                prev.name = newValue.value;
                prev.selectedIntervs = [];
                return { ...prev };
              });
            }}
            renderInput={(params) => (
              <UITextField
                rest={{ ...params }}
                placeholder='Company Introduction'
                onChange={(e) => {
                  setModule((prev) => {
                    prev.name = String(e.target.value);
                    return { ...prev };
                  });
                }}
              />
            )}
            defaultValue={{
              label: '',
              value: ''
            }}
            value={{
              label: module.name,
              value: module.name
            }}
            freeSolo
            disablePortal
          />
        </>
      }
      slotDurationInput={
        <>
          <UISelect
            menuOptions={defaultDurations}
            defaultValue={module.duration}
            onChange={(e) => {
              setModule((prev) => {
                prev.duration = Number(e.target.value);
                return { ...prev };
              });
            }}
            value={module.duration}
          />
        </>
      }
      slotMemberList={
        <>
          {module.selectedIntervs.map((mem) => {
            return (
              <PanelMemberPill
                key={mem.interv_id}
                slotImage={
                  <MuiAvatar
                    variant='rounded'
                    src={mem.profile_image}
                    level={mem.name}
                    fontSize='20px'
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
      slotSearchMemberInput={
        <>
          <Autocomplete
            options={module.allIntervs.map((int) => ({
              label: int.name,
              value: int.interv_id
            }))}
            onChange={(event: any, newValue: any) => {
              if (!newValue) return;
              if (
                !module.selectedIntervs.find(
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
      slotInputSelected={
        <>
          <UISelect
            menuOptions={module.allIntervs.map((_, idx) => ({
              name: String(idx + 1),
              value: String(idx + 1)
            }))}
            value={module.meetingIntervCnt}
            onChange={(e) => {
              setModule((prev) => {
                prev.meetingIntervCnt = Number(e.target.value);
                return { ...prev };
              });
            }}
            defaultValue={1}
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
