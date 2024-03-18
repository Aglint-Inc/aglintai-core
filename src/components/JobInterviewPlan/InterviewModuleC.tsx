import { Badge, Stack } from '@mui/material';

import { InterviewBreakCard, InterviewModuleCard } from '@/devlink3';

import EditModule from './EditModule';
import { defaultDurations, handleUpdateDb, useInterviewPlan } from './store';
import { InterviewSession } from './types';
import MuiAvatar from '../Common/MuiAvatar';
import UITypography from '../Common/UITypography';

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
                  <Stack
                    key={mem.interv_id}
                    direction={'row'}
                    gap={0.9}
                    alignItems={'center'}
                  >
                    <MuiAvatar
                      variant='circular'
                      src={mem.profile_image}
                      level={mem.name}
                      fontSize='15px'
                      height='30px'
                      width='30px'
                    />
                    <UITypography>{mem.name}</UITypography>
                  </Stack>
                );
              })}
              {module.shadowIntervs.map((mem) => {
                return (
                  <Stack
                    key={mem.interv_id}
                    direction={'row'}
                    gap={0.9}
                    alignItems={'center'}
                  >
                    <Badge
                      key={mem.interv_id}
                      color='secondary'
                      overlap='circular'
                      badgeContent={<>S</>}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    >
                      <MuiAvatar
                        variant='circular'
                        src={mem.profile_image}
                        level={mem.name}
                        fontSize='15px'
                        height='30px'
                        width='30px'
                      />
                    </Badge>
                    <UITypography>{mem.name}</UITypography>
                  </Stack>
                );
              })}
              {module.revShadowIntervs.map((mem) => {
                return (
                  <Stack
                    key={mem.interv_id}
                    direction={'row'}
                    gap={0.9}
                    alignItems={'center'}
                  >
                    <Badge
                      key={mem.interv_id}
                      color='secondary'
                      overlap='circular'
                      badgeContent={'R'}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    >
                      <MuiAvatar
                        variant='circular'
                        src={mem.profile_image}
                        level={mem.name}
                        fontSize='15px'
                        height='30px'
                        width='30px'
                      />
                    </Badge>
                    <UITypography>{mem.name}</UITypography>
                  </Stack>
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
