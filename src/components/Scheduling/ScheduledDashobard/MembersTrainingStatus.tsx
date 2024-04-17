import { Avatar } from '@mui/material';
import React from 'react';

import {
  HistoryPill,
  TrainingProgress,
  TrainingProgressList,
} from '@/devlink3';
import { capitalizeAll } from '@/src/utils/text/textUtils';

type MembersTrainingStatusType = {
  onClickInterviewers: () => void;
  members: {
    name: string;
    photo: string;
    role: string;
    moduleName: string;
    trainingStates: { text: 'shadow' | 'reverseShadow'; state: boolean }[];
  }[];
};

const MembersTrainingStatus = ({
  members,
  onClickInterviewers,
}: MembersTrainingStatusType) => {
  return (
    <TrainingProgress
      onClickViewAllInterviewers={{
        onClick: onClickInterviewers,
      }}
      slotTrainingProgressList={
        <>
          {members.map((member) => (
            <TrainingProgressList
              key={member.name}
              slotInterviewerImage={
                <Avatar
                  src={member.photo}
                  alt={capitalizeAll(member.name)}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              }
              textInterviewModule={member.moduleName}
              textName={capitalizeAll(member.name)}
              textRole={member.role}
              slotHistoryPill={
                <>
                  {member.trainingStates.map((item, index) => (
                    <HistoryPill
                      key={index}
                      isActive={item.state}
                      isReverseShadow={item.text === 'reverseShadow'}
                      isShadow={item.text === 'shadow'}
                    />
                  ))}
                </>
              }
            />
          ))}
        </>
      }
    />
  );
};

export default MembersTrainingStatus;
