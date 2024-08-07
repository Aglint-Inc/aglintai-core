import { Box, Stack } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

import { Text } from '@/devlink//Text';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBadge } from '@/devlink/GlobalBadge';

// Mock data
// const requests = [
//   {
//     type: 'Reschedule',
//     title: 'Coding Deep dive with John Doe',
//     status: 'Todo',
//     color: 'info',
//     link: '/reschedule/1',
//   },
//   {
//     type: 'Reschedule',
//     title: 'Frontend Interview with Alice Brown',
//     status: 'In Progress',
//     color: 'warning',
//     link: '/reschedule/2',
//   },
//   {
//     type: 'Reschedule',
//     title: 'Backend Interview with Bob White',
//     status: 'Completed',
//     color: 'success',
//     link: '/reschedule/3',
//   },
//   {
//     type: 'Schedule',
//     title: 'System Design Interview with Jane Smith',
//     status: 'Todo',
//     color: 'info',
//     link: '/schedule/1',
//   },
//   {
//     type: 'Schedule',
//     title: 'Product Management Interview with Emma Green',
//     status: 'Completed',
//     color: 'success',
//     link: '/schedule/2',
//   },
//   {
//     type: 'Schedule',
//     title: 'UX Interview with Henry Blue',
//     status: 'Blocked',
//     color: 'error',
//     link: '/schedule/3',
//   },
//   {
//     type: 'Cancel Request',
//     title: 'Behavioral Interview with Mike Johnson',
//     status: 'Todo',
//     color: 'info',
//     link: '/cancel/1',
//   },
//   {
//     type: 'Cancel Request',
//     title: 'Leadership Interview with Sarah Black',
//     status: 'In Progress',
//     color: 'warning',
//     link: '/cancel/2',
//   },
//   {
//     type: 'Cancel Request',
//     title: 'Technical Interview with Tom Brown',
//     status: 'Completed',
//     color: 'success',
//     link: '/cancel/3',
//   },
// ];

const RequestList = ({ requests }) => {
  const [hovered, setHovered] = useState(null);

  const groupedRequests = requests.reduce((acc, request) => {
    if (!acc[request.type]) {
      acc[request.type] = [];
    }
    acc[request.type].push(request);
    return acc;
  }, {});

  return (
    <Stack spacing={1}>
      <Text size={2} content='Here are the list of urgent requests for today:'></Text>
      {Object.keys(groupedRequests).map((type) => (
        <Stack key={type} spacing={1} pb={2}>
          <Text size={2} content={type} weight={'medium'}></Text>
          {groupedRequests[type].map((request) => (
            <Link href={request.link} passHref key={request.link} onMouseEnter={() => setHovered(request.link)}
                onMouseLeave={() => setHovered(null)}
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={1}
                  color={'var(--neutral-11)'}
                  position="relative"
                >
                  <Box flex={1}>
                    <Text size={2} content={request.title}></Text>
                  </Box>
                  <Box ml={3}>
                    <GlobalBadge
                      textBadge={request.status}
                      size={1}
                      color={request.color}
                      variant={'soft'}
                    />
                  </Box>
                  {hovered === request.link && (
                    <Box position="absolute" right={0} top={0} bottom={0} display="flex" alignItems="center">
                      <ButtonSolid  color='neutral' size={1} textButton={'View Request'} isRightIcon={true} iconName='open_in_new'/>
                    </Box>
                  )}
                </Stack>
            </Link>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export default RequestList;