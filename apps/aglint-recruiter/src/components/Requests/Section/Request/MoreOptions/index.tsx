/* eslint-disable jsx-a11y/no-static-element-interactions */
import { List, ListItem, ListItemButton, Stack } from '@mui/material';
import { useState } from 'react';

import { GlobalIcon } from '@/devlink2/GlobalIcon';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import { useRequests } from '@/src/context/RequestsContext';
import { Request } from '@/src/queries/requests/types';

type actionType = Request['status'];

function MoreOptions({ request_id }: { request_id: string }) {
  const { handleAsyncUpdateRequest } = useRequests();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const items = [
    {
      iconName: 'refresh',
      iconSize: 4,
      textContent: 'Reassign',
      color: 'neutral',
      action: 'in_progress' as actionType,
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
    await handleAsyncUpdateRequest({
      id: request_id,
      payload: { status: action },
    });
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CustomTooltip
        onMouseEnter={() => setTooltipOpen(true)}
        placement={'left-start'}
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
    </div>
  );
}

export default MoreOptions;
