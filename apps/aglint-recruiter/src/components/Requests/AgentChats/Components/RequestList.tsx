import { type DatabaseTable } from '@aglint/shared-types';
import { Box, Stack, Tooltip } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Text } from '@/devlink//Text';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBadge } from '@/devlink/GlobalBadge';

export type RequestListProps = {
  type: DatabaseTable['request']['type'];
  title: string;
  status: DatabaseTable['request']['status'];
  color: 'info' | 'warning' | 'success' | 'error' | 'neutral' | 'purple';
  link: string;
};

const RequestList = ({ requests }: { requests: RequestListProps[] }) => {
  const groupedRequests = requests?.reduce((acc, request) => {
    if (!acc[request.type]) {
      acc[request.type] = [];
    }
    acc[request.type].push(request);
    return acc;
  }, {}) as Record<string, RequestListProps[]>;

  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    if (requests.length > 5) {
      setViewMore(true);
    }
  }, [requests]);

  return (
    <Stack spacing={1}>
      {requests.length === 0 ? (
        <Stack color={'var(--neutral-11)'} spacing={1}>
          <Text size={2} content='No requests found.'></Text>
        </Stack>
      ) : (
        <>
          <Stack color={'var(--neutral-11)'}>
            <Text size={2} content='Here are the list of requests :'></Text>
          </Stack>
          {Object.keys(groupedRequests)?.map(
            (type: RequestListProps['type']) => {
              const allRequests = groupedRequests[String(type)];
              return (
                <Stack key={type} spacing={1} pb={2}>
                  <Text
                    size={2}
                    content={transformString(type)}
                    weight={'medium'}
                  ></Text>
                  {(viewMore ? allRequests.slice(0, 5) : allRequests)?.map(
                    (request, ind) => (
                      <CardIndividual request={request} key={ind} />
                    ),
                  )}
                  {allRequests?.length > 5 && (
                    <Stack direction={'row'}>
                      <ButtonSoft
                        size={1}
                        color={'neutral'}
                        textButton={viewMore ? 'View more' : 'View less'}
                        onClickButton={{
                          onClick: () => setViewMore((prev) => !prev),
                        }}
                      />
                    </Stack>
                  )}
                </Stack>
              );
            },
          )}
        </>
      )}
    </Stack>
  );
};

export default RequestList;

function transformString(input) {
  return input
    ?.split('_')
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const CardIndividual = ({ request }: { request: RequestListProps }) => {
  const [hovered, setHovered] = useState(null);
  return (
    <>
      <Link
        href={request.link}
        passHref
        key={request.link}
        onMouseEnter={() => setHovered(request.link)}
        onMouseLeave={() => setHovered(null)}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Stack
          direction='row'
          alignItems='center'
          spacing={1}
          color={'var(--neutral-11)'}
          position='relative'
        >
          <Box flex={1}>
            <Tooltip title={request.title}>
              <Stack>
                <Text
                  size={2}
                  content={request.title}
                  styleProps={{
                    style: {
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                />
              </Stack>
            </Tooltip>
          </Box>
          <Box ml={3}>
            <GlobalBadge
              textBadge={transformString(request.status)}
              size={1}
              color={request.color}
              variant={'soft'}
            />
          </Box>
          {hovered === request.link && (
            <Box
              position='absolute'
              right={0}
              top={0}
              bottom={0}
              display='flex'
              alignItems='center'
            >
              <ButtonSolid
                color='neutral'
                size={1}
                textButton={'View Details'}
                isRightIcon={true}
                iconName='open_in_new'
              />
            </Box>
          )}
        </Stack>
      </Link>
    </>
  );
};
