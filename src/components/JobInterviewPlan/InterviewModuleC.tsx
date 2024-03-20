/* eslint-disable security/detect-object-injection */
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
  currModuleIdx,
}: {
  module: InterviewSession;
  editModuleId;
  setEditModuleId;
  currModuleIdx;
}) => {
  const modules = useInterviewPlan((state) => state.modules);
  const handleDelete = () => {
    let newModules: InterviewSession[] = modules.filter(
      (m, idx) => idx !== currModuleIdx,
    );

    handleUpdateDb({ path: 'modules', value: newModules });
  };

  if (editModuleId === currModuleIdx) {
    return (
      <EditModule
        initModule={module}
        onClose={() => setEditModuleId(-1)}
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
            setEditModuleId(currModuleIdx);
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
            <Stack
              direction={'row'}
              gap={1}
              flexWrap={'wrap'}
              columnGap={2}
            ></Stack>
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
            setEditModuleId(currModuleIdx);
          },
        }}
        slotTrainees={
          <>
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
          </>
        }
        slotPlatformLogo={
          <MuiAvatar
            src={`${module.meeting_type.link}`}
            level={module.meeting_type.provider_label}
            variant='circular'
            fontSize='10px'
            height='18px'
            width='18px'
          />
        }
        textPlatformName={module.meeting_type.provider_label}
        textMemberfromCount={getMemmerCopy(module.meetingIntervCnt)}
        isTraineeVisible={
          module.revShadowIntervs.length > 0 || module.shadowIntervs.length > 0
        }
        slotOneMemberFrom={
          <>
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
          </>
        }
      />
    );
  }
};

export default InterviewModuleC;

const getMemmerCopy = (size: number) => {
  let copy = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
  };
  if (copy[size])
    return `${copy[size]} member${copy[size] > 1 ? 's' : ''} from :`;
  return `${copy[size]} member${copy[size] > 1 ? 's' : ''} from :`;
};
