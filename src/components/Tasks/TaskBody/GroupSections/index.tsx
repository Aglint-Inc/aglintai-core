import { Collapse, Stack } from '@mui/material';
import React, { useState } from 'react';

import {
  AvatarWithName,
  ListCard,
  TaskEmpty,
  TaskTableJobCard,
} from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { useTaskStatesContext } from '../../TaskStatesContext';
import GroupTaskCard from '../GroupTaskCard';

function GroupSections({
  item,
  index,
}: {
  item: {
    applications: TasksAgentContextType['tasks'][number]['applications'];
    tasklist: TasksAgentContextType['tasks'];
  };
  index: any;
}) {
  const { setShowAddNew, setSelectedApplication } = useTaskStatesContext();
  const [sectionIndex, setSectionIndex] = useState(true);

  return (
    <Collapse in={index === sectionIndex || sectionIndex} collapsedSize={60}>
      <TaskTableJobCard
        onClickDropIcon={{
          onClick: () => {
            if (sectionIndex) setSectionIndex(false);
            else setSectionIndex(true);
          },
        }}
        textRole={capitalizeAll(item.applications.public_jobs.job_title)}
        slotAvatarWithName={
          <>
            <ListCard
              isAvatarWithNameVisible={true}
              isListVisible={false}
              slotAvatarWithName={
                item?.applications && (
                  <AvatarWithName
                    slotAvatar={
                      <MuiAvatar
                        height={'24px'}
                        width={'24px'}
                        src={item?.applications?.candidates.avatar}
                        variant='circular'
                        fontSize='14px'
                        level={capitalizeAll(
                          item?.applications.candidates?.first_name +
                            ' ' +
                            item?.applications.candidates?.last_name,
                        )}
                      />
                    }
                    textName={capitalizeAll(
                      item?.applications.candidates?.first_name +
                        ' ' +
                        item?.applications.candidates?.last_name,
                    )}
                  />
                )
              }
            />
          </>
        }
        key={index}
        slotTaskTableJobCard={
          <>
            {item.tasklist
              .filter((ele) => ele.type !== 'empty')
              .map((ele, i) => {
                return <GroupTaskCard key={i} task={ele} />;
              })}
            <ShowCode.When
              isTrue={
                item.tasklist.filter((ele) => ele.type !== 'empty').length === 0
              }
            >
              <Stack height={100}>
                <TaskEmpty />
              </Stack>
            </ShowCode.When>
          </>
        }
        onClickNewTask={{
          onClick: () => {
            setShowAddNew(true);
            setSelectedApplication(item.applications);
          },
        }}
      />
    </Collapse>
  );
}

export default GroupSections;
