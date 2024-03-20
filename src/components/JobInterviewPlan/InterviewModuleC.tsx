import { Stack } from '@mui/material';

import {
  AvatarWithName,
  InterviewBreakCard,
  InterviewModuleCard,
} from '@/devlink3';
import { getFullName } from '@/src/utils/jsonResume';

import EditModule from './EditModule';
import { defaultDurations, handleUpdateDb, useInterviewPlan } from './store';
import { InterviewSession } from './types';
import MuiAvatar from '../Common/MuiAvatar';

const InterviewModuleC = ({
  module,
  editModuleId,
  setEditModuleId,
}: {
  module: InterviewSession;
  editModuleId;
  setEditModuleId;
}) => {
  const modules = useInterviewPlan((state) => state.modules);
  const handleDelete = () => {
    let newModules: InterviewSession[] = modules.filter(
      (m) => m.module_id !== module.module_id,
    );

    handleUpdateDb({ path: 'modules', value: newModules });
  };

  if (editModuleId === module.module_id) {
    return (
      <EditModule
        initModule={module}
        onClose={() => setEditModuleId('')}
        isEdit={true}
        isBreak={module.isBreak}
        editModuleId={editModuleId}
      />
    );
  }

  if (module.isBreak) {
    return (
      <InterviewBreakCard
        textDuration={module.duration}
        onClickDelete={{ onClick: handleDelete }}
        onClickEdit={{
          onClick: () => {
            setEditModuleId(module.module_id);
          },
        }}
      />
    );
  } else {
    return (
      <InterviewModuleCard
        textModuleName={module.session_name}
        textDuration={
          defaultDurations.find((d) => d.value === module.duration).name
        }
        textInterviewModule={module.module_name}
        isInterviewModuleVisible={true}
        slotAvatarWithName={
          <>
            <Stack direction={'row'} gap={1} flexWrap={'wrap'} columnGap={2}>
              {module.selectedIntervs.map((mem) => {
                return (
                  <AvatarWithName
                    isReverseShadowVisible={false}
                    isShadowVisible={false}
                    key={mem.interv_id}
                    textName={mem.name}
                    slotAvatar={
                      <MuiAvatar
                        level={getFullName(mem.name, '')}
                        src={mem?.profile_image}
                        variant={'circular'}
                        width={'24px'}
                        height={'24px'}
                        fontSize={'12px'}
                      />
                    }
                  />
                );
              })}
              {module.shadowIntervs.map((mem) => {
                return (
                  <AvatarWithName
                    isReverseShadowVisible={false}
                    isShadowVisible={true}
                    key={mem.interv_id}
                    textName={mem.name}
                    slotAvatar={
                      <MuiAvatar
                        level={getFullName(mem.name, '')}
                        src={mem?.profile_image}
                        variant={'circular'}
                        width={'24px'}
                        height={'24px'}
                        fontSize={'12px'}
                      />
                    }
                  />
                );
              })}
              {module.revShadowIntervs.map((mem) => {
                return (
                  <AvatarWithName
                    isReverseShadowVisible={true}
                    isShadowVisible={false}
                    key={mem.interv_id}
                    textName={mem.name}
                    slotAvatar={
                      <MuiAvatar
                        level={getFullName(mem.name, '')}
                        src={mem?.profile_image}
                        variant={'circular'}
                        width={'24px'}
                        height={'24px'}
                        fontSize={'12px'}
                      />
                    }
                  />
                );
              })}
            </Stack>
          </>
        }
        textMemberSelection={
          <>{`${module.meetingIntervCnt} of the member will be picked as the interviewer`}</>
        }
        onClickDelete={{
          onClick: handleDelete,
        }}
        onClickEdit={{
          onClick: () => {
            setEditModuleId(module.module_id);
          },
        }}
      />
    );
  }
};

export default InterviewModuleC;
