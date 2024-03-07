import { Stack } from '@mui/material';

import { InterviewBreakCard, InterviewModuleCard } from '@/devlink3';

import EditModule from './EditModule';
import { defaultDurations, handleUpdateDb, useInterviewPlan } from './store';
import { InterviewModuleCType } from './types';
import MuiAvatar from '../Common/MuiAvatar';

const InterviewModuleC = ({
  module,
  editModuleId,
  setEditModuleId
}: {
  module: InterviewModuleCType;
  editModuleId;
  setEditModuleId;
}) => {
  const modules = useInterviewPlan((state) => state.modules);
  const handleDelete = () => {
    let newModules: InterviewModuleCType[] = modules.filter(
      (m) => m.module_id !== module.module_id
    );

    // let newModules = [temp[0]];

    // for (let idx = 1; idx < temp.length; ++idx) {
    //   if (!temp[Number(idx)].isBreak) {
    //     newModules.push(temp[Number(idx)]);
    //   }
    //   if (temp[Number(idx - 1)].isBreak) {
    //     newModules.push(temp[Number(idx)]);
    //   }
    // }

    handleUpdateDb({ path: 'modules', value: newModules });
  };

  if (editModuleId === module.module_id) {
    return (
      <EditModule
        initModule={module}
        onClose={() => setEditModuleId('')}
        isEdit={true}
        isBreak={module.isBreak}
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
          }
        }}
      />
    );
  } else {
    return (
      <InterviewModuleCard
        textModuleName={module.name}
        textDuration={
          defaultDurations.find((d) => d.value === module.duration).name
        }
        slotAvatarWithName={
          <>
            <Stack direction={'row'} gap={1}>
              {module.selectedIntervs.map((mem) => {
                return (
                  <MuiAvatar
                    key={mem.interv_id}
                    variant='circular'
                    src={mem.profile_image}
                    level={mem.name}
                    fontSize='15px'
                    height='30px'
                    width='30px'
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
          onClick: handleDelete
        }}
        onClickEdit={{
          onClick: () => {
            setEditModuleId(module.module_id);
          }
        }}
      />
    );
  }
};

export default InterviewModuleC;
