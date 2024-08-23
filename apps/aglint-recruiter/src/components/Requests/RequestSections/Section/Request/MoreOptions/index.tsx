/* eslint-disable jsx-a11y/no-static-element-interactions */
import { getFullName } from '@aglint/shared-utils';
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { AssignedToList } from '@/devlink2/AssignedToList';
import { GlobalIcon } from '@/devlink2/GlobalIcon';
import { RequestCardSkeleton } from '@/devlink2/RequestCardSkeleton';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { ConfirmationPopup } from '@/devlink3/ConfirmationPopup';
import MuiPopup from '@/src/components/Common/MuiPopup';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import { useMemberList } from '@/src/components/Requests/ViewRequestDetails/Components/MemberList';
import { MemberType } from '@/src/components/Scheduling/InterviewTypes/types';
import { useRequests } from '@/src/context/RequestsContext';
import { Request } from '@/src/queries/requests/types';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

type actionType = Request['status'] | 'change_assignee';

function MoreOptions({ request_id }: { request_id: string }) {
  const { handleAsyncUpdateRequest } = useRequests();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [openAssigneePopup, setOpenAssigneePopup] = useState(false);

  const {
    requests: { data: requestsList },
  } = useRequests();
  const selectedRequest = Object.values(requestsList)
    ?.flat()
    ?.find((ele) => ele.id === request_id);

  const items = [
    {
      iconName: 'refresh',
      iconSize: 4,
      textContent: 'Reassign',
      color: 'neutral',
      action: 'change_assignee' as actionType,
    },
    {
      iconName: 'check',
      iconSize: 4,
      textContent: 'Mark As Completed',
      color: 'neutral',
      action: 'completed' as actionType,
    },
    {
      iconName: 'block',
      iconSize: 4,
      textContent: 'Mark As Blocked',
      color: 'error',
      action: 'blocked' as actionType,
    },
  ];

  async function handleClick(action: actionType) {
    setTooltipOpen(false);
    if (action === 'change_assignee') {
      setOpenAssigneePopup(true);
      return;
    }
    await handleAsyncUpdateRequest({
      payload: {
        requestId: request_id,
        requestPayload: { status: action as Request['status'] },
      },
    });
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CustomTooltip
        slotProps={{
          popper: {
            sx: {
              '& .MuiTooltip-tooltip': {
                margin: '0px !important',
                marginTop: '10px !important',
              },
            },
          },
        }}
        onMouseEnter={() => setTooltipOpen(true)}
        placement={'bottom-start'}
        open={tooltipOpen}
        onClose={() => setTooltipOpen(false)}
        title={
          <Stack style={{ cursor: 'pointer' }} px={1}>
            <List>
              {items.map(
                ({ iconName, iconSize, textContent, color, action }, i) => {
                  return (
                    <ListItem key={i} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          handleClick(action);
                        }}
                      >
                        <TextWithIcon
                          iconName={iconName}
                          iconSize={iconSize}
                          textContent={textContent}
                          color={color}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                },
              )}
            </List>
          </Stack>
        }
      >
        <Stack
          onClick={() => {
            setTooltipOpen(!tooltipOpen);
          }}
        >
          <GlobalIcon iconName={'more_vert'} size={4} />
        </Stack>
      </CustomTooltip>
      <MembersPopUps
        openAssigneePopup={openAssigneePopup}
        setOpenAssigneePopup={setOpenAssigneePopup}
        selectedRequest={selectedRequest}
      />
    </div>
  );
}

export default MoreOptions;

function MembersPopUps({
  setOpenAssigneePopup = () => {},
  openAssigneePopup = false,
  selectedRequest = null,
}: {
  setOpenAssigneePopup?: Function;
  openAssigneePopup?: boolean;
  selectedRequest?: Request;
}) {
  const { data: members, status } = useMemberList();
  const [filteredMembers, setFilteredMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    if (members) {
      setFilteredMembers(members);
    }
  }, [members]);
  const [selectedMember, setSelectedMember] = useState<MemberType>(null);
  const { handleAsyncUpdateRequest } = useRequests();
  return (
    <MuiPopup
      props={{
        open: openAssigneePopup,
        onClose: () => {
          setOpenAssigneePopup(false);
        },
      }}
    >
      <ConfirmationPopup
        onClickAction={{
          onClick: async () => {
            if (selectedMember?.user_id) {
              setOpenAssigneePopup(false);
              await handleAsyncUpdateRequest({
                payload: {
                  requestId: selectedRequest?.id,
                  requestPayload: {
                    assignee_id: selectedMember?.user_id,
                  },
                },
                loading: false,
                toast: false,
              });
              toast.success(
                `Request reassigned to ${getFullName(selectedMember.first_name, selectedMember.last_name)}`,
              );
            } else {
              toast.message('Please select a member');
            }
          },
        }}
        onClickCancel={{
          onClick: () => {
            setOpenAssigneePopup(false);
          },
        }}
        textPopupTitle={'Reassign Request'}
        isIcon={false}
        // textPopupDescription={`Are you sure you want to reassign this request to ?`}
        textPopupDescription={`${selectedRequest?.title}`}
        slotWidget={
          <>
            <TextField
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
              fullWidth
              sx={{
                p: '10px',
              }}
              placeholder='Search by name.'
              onChange={(e) => {
                const text = String(e.target.value).toLowerCase();
                setFilteredMembers(
                  members.filter((ele) =>
                    ele.first_name.toLowerCase().includes(text),
                  ),
                );
              }}
            />

            {filteredMembers.length === 0 ? (
              <GlobalEmptyState
                iconName={'Search'}
                textDesc={'No members found'}
              />
            ) : status === 'success' ? (
              <Stack
                height={'150px'}
                maxHeight={'150px'}
                overflow={'auto'}
                width={'375px'}
              >
                {filteredMembers
                  .filter(
                    ({ user_id }) => user_id !== selectedRequest?.assignee_id,
                  )
                  .map((member) => (
                    <AssignedToList
                      key={member.user_id}
                      onClickCard={{
                        onClick: () => {
                          setSelectedMember(member);
                        },
                        style: {
                          background:
                            selectedMember?.user_id === member.user_id
                              ? 'rgba(0, 0, 0, 0.08)'
                              : 'none',
                          borderRadius: '4px',
                        },
                      }}
                      // onClickCard={{
                      //   onClick: async () => {
                      //     setAnchorEl(null);
                      //     await handleAsyncUpdateRequest({
                      //       payload: {
                      //         requestId: String(query?.id),
                      //         requestPayload: {
                      //           assignee_id: member.user_id,
                      //         },
                      //       },
                      //       loading: false,
                      //       toast: false,
                      //     });
                      //   },
                      // }}
                      textName={getFullName(
                        member.first_name,
                        member.last_name,
                      )}
                      textRole={capitalizeFirstLetter(member.role)}
                      slotImage={
                        <Avatar src={member.profile_image} variant='rounded' />
                      }
                    />
                  ))}
              </Stack>
            ) : (
              <Stack height={'300px'} overflow={'auto'} gap={1} width={'375px'}>
                <RequestCardSkeleton />
                <RequestCardSkeleton />
                <RequestCardSkeleton />
                <RequestCardSkeleton />
              </Stack>
            )}
          </>
        }
        textPopupButton={'Change Assignee'}
      />
    </MuiPopup>
  );
}
