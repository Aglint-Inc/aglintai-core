import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { useRequests } from '@/context/RequestsContext';
import { type Request } from '@/queries/requests/types';

import MembersPopUps from './MembersPopUps';

type actionType = Request['status'] | 'change_assignee';

function MenuOptions({ request_id }: { request_id: string }) {
  const { handleAsyncUpdateRequest } = useRequests();
  const [openAssigneePopup, setOpenAssigneePopup] = useState(false);

  const {
    requests: { data: requestsList },
  } = useRequests();
  const selectedRequest = Object.values(requestsList ?? [])
    ?.flat()
    ?.find((ele) => ele.id === request_id);

  const items = [
    {
      textContent: 'Reassign',
      action: 'change_assignee' as actionType,
    },
    {
      textContent: 'Mark Completed',
      action: 'completed' as actionType,
    },
    {
      textContent: 'Mark Blocked',
      action: 'blocked' as actionType,
    },
  ];

  async function handleClick(action: actionType) {
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
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='cursor-pointer'>
            <MoreHorizontal className='h-5 w-5' />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {items.map(({ textContent, action }, i) => (
            <DropdownMenuItem key={i} onClick={() => handleClick(action)}>
              {textContent}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <MembersPopUps
        openAssigneePopup={openAssigneePopup}
        setOpenAssigneePopup={setOpenAssigneePopup}
        selectedRequest={selectedRequest}
      />
    </div>
  );
}

export default MenuOptions;
