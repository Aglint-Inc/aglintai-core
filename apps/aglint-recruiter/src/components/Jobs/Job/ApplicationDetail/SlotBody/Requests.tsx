import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { Text } from '@/devlink/Text';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getRequestTitle } from '@/src/components/Requests/AgentChats/AgentInputBox';
import { useApplication } from '@/src/context/ApplicationContext';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

function Requests() {
  const router = useRouter();
  const {
    requests: { data: requests, isLoading },
  } = useApplication();

  const {
    meta: { data: detail },
  } = useApplication();

  return (
    <Stack padding={'var(--space-4)'} spacing={'var(--space-2)'} width={'850px'}>
      {!isLoading &&
        requests?.map((req) => {
          return (
            <Stack
              key={req.id}
              sx={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid var(--neutral-5)',
                cursor: 'pointer',
              }}
              onClick={() => {
                router.push(
                  ROUTES['/requests/[id]']({
                    id: req.id,
                  }),
                );
              }}
              spacing={'var(--space-2)'}
            >
              <Stack
                direction={'row'}
                key={req.id}
                justifyContent={'space-between'}
              >
                <Text
                  content={getRequestTitle({
                    title: req.title,
                    first_name: detail.name,
                    last_name: '',
                  })}
                />
                <GlobalBadge
                  size={1}
                  textBadge={capitalizeFirstLetter(req.status)}
                  color={
                    req.status === 'to_do'
                      ? 'purple'
                      : req.status === 'in_progress'
                        ? 'info'
                        : req.status === 'blocked'
                          ? 'error'
                          : req.status === 'completed'
                            ? 'success'
                            : 'neutral'
                  }
                />
              </Stack>
              <Stack direction={'row'} spacing={'var(--space-2)'}>
                <Text content={'Assigned to'} color={'neutral'} />
                <AvatarWithName
                  slotAvatar={
                    <MuiAvatar
                      src={req.assignee_details.profile_image}
                      level={getFullName(
                        req.assignee_details.first_name,
                        req.assignee_details.last_name,
                      )}
                      variant='rounded'
                      width={'20px'}
                      height={'20px'}
                    />
                  }
                  textName={getFullName(
                    req.assignee_details.first_name,
                    req.assignee_details.last_name,
                  )}
                />
              </Stack>
            </Stack>
          );
        })}

      {!requests?.length && (
        <GlobalEmptyState
          iconName={'calendar_month'}
          styleEmpty={{
            style: {
              background: 'var(--neutral-2)',
            },
          }}
          textDesc={'No requests found'}
        />
      )}
    </Stack>
  );
}

export default Requests;
