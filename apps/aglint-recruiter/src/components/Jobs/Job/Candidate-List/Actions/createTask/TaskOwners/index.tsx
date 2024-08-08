/* eslint-disable no-unused-vars */
import {
  EmailAgentId,
  PhoneAgentId,
  SystemAgentId,
} from '@aglint/shared-utils';
import { Popover, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { ListCard } from '@/devlink3/ListCard';
import { ListPop } from '@/devlink3/ListPop';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { MemberType } from '@/src/components/Scheduling/InterviewTypes/types';
import AssigneeChip from '@/src/components/Tasks/Components/AssigneeChip';
import { capitalizeAll } from '@/src/utils/text/textUtils';

function TaskOwners({
  selectedAssignee,
  setSelectedAssignee,
  onChange,
  hideAgents = false,
  hiringTeamIds = [],
  isOptionList = true,
  assignerList,
}: {
  selectedAssignee: MemberType;
  setSelectedAssignee: (x: MemberType) => void;
  onChange: any;
  hideAgents?: boolean;
  hiringTeamIds: string[];
  isOptionList?: boolean;
  assignerList: MemberType[];
}) {
  // const [hiringTeam, setHiringTeam] = useState<MemberType[]>([]);
  // const [otherTeam, setOtherTeam] = useState<MemberType[]>([]);

  const specificUserIds = hiringTeamIds;

  // const agents =
  //   assignerList &&
  //   assignerList.filter((a) => {
  //     // Check if a or b are in specificUserIds and sort them to the top
  //     if (
  //       (a.user_id === EmailAgentId || a.user_id === PhoneAgentId) &&
  //       selectedAssignee?.user_id !== a.user_id
  //     ) {
  //       return a;
  //     }
  //   });

  // async function getMemberList() {
  //   const hiringTeam = assignerList.filter((a) => {
  //     if (specificUserIds.filter((b) => b).includes(a.user_id)) {
  //       return a;
  //     }
  //   });

  //   const otherTeam = assignerList.filter((a) => {
  //     if (
  //       !specificUserIds.includes(a.user_id) &&
  //       !(a.user_id === EmailAgentId || a.user_id === PhoneAgentId) &&
  //       selectedAssignee?.user_id !== a.user_id
  //     ) {
  //       return a;
  //     }
  //   });
  //   setHiringTeam(hiringTeam);
  //   setOtherTeam(otherTeam);
  // }

  // useEffect(() => {
  //   if (assignerList?.length) getMemberList();
  // }, [assignerList]);

  const hiringTeam = assignerList.filter((a) => {
    if (
      specificUserIds.filter((b) => b).includes(a.user_id) &&
      selectedAssignee?.user_id !== a.user_id
    ) {
      return a;
    }
  });

  const otherTeam = assignerList.filter((a) => {
    if (
      !specificUserIds.includes(a.user_id) &&
      !(a.user_id === EmailAgentId || a.user_id === PhoneAgentId) &&
      selectedAssignee?.user_id !== a.user_id
    ) {
      return a;
    }
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <Stack
        sx={{
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {selectedAssignee ? (
          <ListCard
            isAvatarWithNameVisible={true}
            isListVisible={false}
            slotAvatarWithName={
              selectedAssignee && (
                <AvatarWithName
                  slotAvatar={
                    <MuiAvatar
                      src={selectedAssignee.profile_image}
                      variant='rounded-small'
                      level={capitalizeAll(
                        selectedAssignee?.first_name +
                          ' ' +
                          (selectedAssignee?.last_name ?? ''),
                      )}
                    />
                  }
                  textName={
                    <Stack>
                      <Typography fontSize={'14px'}>
                        {capitalizeAll(
                          selectedAssignee?.first_name +
                            ' ' +
                            (selectedAssignee?.last_name ?? ''),
                        )}
                      </Typography>
                      <Typography variant='caption' fontSize={'10px'}>
                        {capitalizeAll(selectedAssignee?.role)}
                      </Typography>
                    </Stack>
                  }
                />
              )
            }
          />
        ) : (
          <Typography variant='caption' fontSize={'14px'}>
            Select Assignee
          </Typography>
        )}
      </Stack>
      <Popover
        id={id}
        open={open && isOptionList}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 'none',
          },
        }}
      >
        <ListPop
          slotListCard={
            <>
              {/* {!hideAgents && (
                <>
                  Agents
                  {(agents ?? []).map((ele, i) => {
                    return (
                      <Stack
                        width={'100%'}
                        p={'var(--space-1)'}
                        key={i}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'var(--neutral-2)',
                          },
                        }}
                        onClick={() => {
                          setSelectedAssignee(ele);
                          handleClose();
                          if (onChange) {
                            onChange(ele);
                          }
                        }}
                      >
                        <AssigneeChip
                          disableHoverListener={true}
                          assigneeId={ele.user_id}
                        />
                      </Stack>
                    );
                  })}
                </>
              )} */}
              {hiringTeamIds.length ? (
                <>
                  Hiring Team
                  {(hiringTeam ?? []).map((ele, i) => {
                    return (
                      <Stack
                        width={'100%'}
                        p={'var(--space-1)'}
                        key={i}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'var(--neutral-2)',
                          },
                        }}
                        onClick={() => {
                          setSelectedAssignee(ele);
                          handleClose();
                          if (onChange) {
                            onChange(ele);
                          }
                        }}
                      >
                        <AssigneeChip
                          disableHoverListener={true}
                          assigneeId={ele.user_id}
                        />
                      </Stack>
                    );
                  })}
                </>
              ) : null}
              Others
              {(otherTeam ?? [])
                .filter((ele) => ele.user_id !== SystemAgentId)
                .map((ele, i) => {
                  return (
                    <Stack
                      width={'100%'}
                      p={'var(--space-1)'}
                      key={i}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'var(--neutral-2)',
                        },
                      }}
                      onClick={() => {
                        setSelectedAssignee(ele);
                        handleClose();
                        if (onChange) {
                          onChange(ele);
                        }
                      }}
                    >
                      <AssigneeChip
                        disableHoverListener={true}
                        assigneeId={ele.user_id}
                      />
                    </Stack>
                  );
                })}
            </>
          }
        />
      </Popover>
    </>
  );
}

export default TaskOwners;
