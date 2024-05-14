import { Collapse, Stack, Tooltip, Typography } from '@mui/material';
import { IconCaretDownFilled, IconCaretRightFilled } from '@tabler/icons-react';
import { useState } from 'react';

import {
  AvatarWithName,
  PriorityPill,
  TaskEmpty,
  TaskTableJobCard,
} from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import AssigneeChip from '../../Components/AssigneeChip';
import StatusChip from '../../Components/StatusChip';
import { useTaskStatesContext } from '../../TaskStatesContext';
import GroupTaskCard from '../GroupTaskCard';

function GroupSections({
  item,
  index,
}: {
  item: {
    [key: string]: any;
    tasklist: TasksAgentContextType['tasks'];
  };
  index: any;
}) {
  const { setShowAddNew, setSelectedApplication, selectedGroupBy } =
    useTaskStatesContext();
  const [sectionIndex, setSectionIndex] = useState(false);

  return (
    <Collapse in={index === sectionIndex || sectionIndex} collapsedSize={41}>
      <TaskTableJobCard
        slotDropIcon={
          <ShowCode>
            <ShowCode.When isTrue={sectionIndex}>
              <IconCaretDownFilled
                style={{
                  cursor: 'pointer',
                }}
                size={'20px'}
                onClick={() => {
                  setSectionIndex(false);
                }}
              />
            </ShowCode.When>
            <ShowCode.Else>
              <IconCaretRightFilled
                style={{
                  cursor: 'pointer',
                }}
                size={'20px'}
                onClick={() => {
                  setSectionIndex(true);
                }}
              />
            </ShowCode.Else>
          </ShowCode>
        }
        slotAvatarWithName={
          <ShowCode>
            <ShowCode.When isTrue={selectedGroupBy.label === 'job'}>
              <Stack alignItems={'center'} direction={'row'} spacing={'10px'}>
                <Typography
                  sx={{
                    cursor: 'pointer',
                  }}
                  fontSize={'14px'}
                >
                  {capitalizeFirstLetter(item.job)}
                </Typography>

                <Tooltip title='Task count'>
                  <Typography
                    sx={{
                      cursor: 'pointer',
                    }}
                    variant='caption'
                    fontSize={'14px'}
                  >
                    {item.tasklist.length}
                  </Typography>
                </Tooltip>
              </Stack>
            </ShowCode.When>
            <ShowCode.When isTrue={selectedGroupBy.label === 'candidate'}>
              <Stack alignItems={'center'} direction={'row'} spacing={'10px'}>
                <AvatarWithName
                  isAvatarVisible={false}
                  isCandidateIconVisible={true}
                  textName={getFullName(
                    item?.applications?.candidates?.first_name,
                    item?.applications?.candidates?.last_name,
                  )}
                  isRoleVisible={true}
                  textRole={capitalizeFirstLetter(
                    item?.applications?.public_jobs?.job_title,
                  )}
                />

                <Tooltip title='Task count'>
                  <Typography
                    sx={{
                      cursor: 'pointer',
                    }}
                    variant='caption'
                    fontSize={'14px'}
                  >
                    {item.tasklist.length}
                  </Typography>
                </Tooltip>
              </Stack>
            </ShowCode.When>
            <ShowCode.When isTrue={selectedGroupBy.label === 'priority'}>
              Priority :
              <PriorityPill
                isHighVisible={item.priority === 'high'}
                isMediumVisible={item.priority === 'medium'}
                isLowVisible={item.priority === 'low'}
              />{' '}
              <Tooltip title='Task count'>
                <Typography
                  sx={{
                    cursor: 'pointer',
                  }}
                  variant='caption'
                  fontSize={'16px'}
                >
                  {item.tasklist.length}
                </Typography>
              </Tooltip>
            </ShowCode.When>
            <ShowCode.When isTrue={selectedGroupBy.label === 'status'}>
              Status :
              <StatusChip status={item.status} />
              <Tooltip title='Task count'>
                <Typography
                  sx={{
                    cursor: 'pointer',
                  }}
                  variant='caption'
                  fontSize={'16px'}
                >
                  {item.tasklist.length}
                </Typography>
              </Tooltip>
            </ShowCode.When>
            <ShowCode.When isTrue={selectedGroupBy.label === 'assignee'}>
              Assignee :
              <AssigneeChip assigneeId={item.assignee} />
              <Tooltip title='Task count'>
                <Typography
                  sx={{
                    cursor: 'pointer',
                  }}
                  variant='caption'
                  fontSize={'16px'}
                >
                  {item.tasklist.length}
                </Typography>
              </Tooltip>
            </ShowCode.When>
          </ShowCode>
        }
        // slotAvatarWithName={
        //   <Stack alignItems={'center'} direction={'row'} spacing={'10px'}>
        //     <Typography fontSize={'14px'}>
        //       {capitalizeFirstLetter(item.applications.public_jobs.job_title)}
        //     </Typography>
        //     <Typography
        //       alignItems={'center'}
        //       display={'flex'}
        //       fontSize={'14px'}
        //     >
        //       (
        //       {capitalizeAll(
        //         item.applications.candidates.first_name +
        //           ' ' +
        //           (item.applications.candidates.last_name ?? ''),
        //       )}
        //       )
        //     </Typography>
        //     <Tooltip title='Task count'>
        //       <Typography
        //         sx={{
        //           cursor: 'pointer',
        //         }}
        //         variant='caption'
        //         fontSize={'16px'}
        //       >
        //         {item.tasklist.length}
        //       </Typography>
        //     </Tooltip>
        //   </Stack>
        // }
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
            setSectionIndex(true);
          },
        }}
      />
    </Collapse>
  );
}

export default GroupSections;
