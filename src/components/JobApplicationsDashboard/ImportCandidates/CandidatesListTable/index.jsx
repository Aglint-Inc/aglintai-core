import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';

import { IconBriefCase, IconCandidate, IconMail, IconPhone } from '@/devlink';
import { YTransform } from '@/src/utils/framer-motions/Animation';
function CandidatesListTable({ importedCandidate }) {
  // eslint-disable-next-line no-console
  console.log('importedCandidate', importedCandidate);
  return (
    <Stack
      borderRadius={'10px'}
      border={'1px solid'}
      p={'10px'}
      overflow={'hidden'}
    >
      <Stack pb={'10px'}>
        <Typography>Found {importedCandidate.length} candidates</Typography>
      </Stack>
      <Stack>
        <TableHeader />
      </Stack>
      <Stack spacing={'5px'} maxHeight={'250px'} overflow={'auto'}>
        {importedCandidate.map((ele, i) => {
          return (
            <YTransform key={i} uniqueKey={i}>
              <TableRow
                key={i}
                name={ele.first_name + ' ' + ele.last_name}
                role={ele.job_title}
                email={ele.email}
                phone={ele.phone}
              />
            </YTransform>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default CandidatesListTable;

function TableHeader() {
  return (
    <Stack
      bgcolor={'grey.100'}
      p={'3px'}
      justifyContent={'left'}
      direction={'row'}
      alignItems={'center'}
      spacing={'5px'}
    >
      <Stack
        width={`${100 / 3}%`}
        direction={'row'}
        alignItems={'center'}
        spacing={'5px'}
      >
        <IconCandidate />
        <Typography variant='subtitle2'>Candidate</Typography>
      </Stack>

      <Stack
        width={`${100 / 3}%`}
        direction={'row'}
        alignItems={'center'}
        spacing={'5px'}
      >
        <IconBriefCase />
        <Typography variant='subtitle2'>Job Title</Typography>
      </Stack>
      <Stack
        width={`${100 / 3}%`}
        direction={'row'}
        alignItems={'center'}
        spacing={'5px'}
      >
        <IconMail />
        <Typography variant='subtitle2'>Email</Typography>
      </Stack>
      <Stack
        width={`${100 / 5}%`}
        direction={'row'}
        alignItems={'center'}
        spacing={'5px'}
      >
        <IconPhone />
        <Typography variant='subtitle2'>Phone</Typography>
      </Stack>
    </Stack>
  );
}

function TableRow({ name, email, role, phone }) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name, email) {
    return {
      sx: {
        width: '20px',
        height: '20px',
        bgcolor: email && stringToColor(email),
      },
      children: (
        <Typography
          position={'relative'}
          bottom={'2px'}
          left={'0.5px'}
          color={'white.700'}
        >
          {name.split(' ')[0][0]}
        </Typography>
      ),
    };
  }

  return (
    <Stack
      p={'3px'}
      justifyContent={'left'}
      direction={'row'}
      alignItems={'center'}
      spacing={'5px'}
    >
      <Stack
        width={`${100 / 3}%`}
        direction={'row'}
        alignItems={'center'}
        spacing={'5px'}
      >
        <Avatar {...stringAvatar(name, email)} />
        <Typography variant='body2' className='one-line-clamp'>
          {name}
        </Typography>
      </Stack>

      <Typography
        variant='body2'
        className='one-line-clamp'
        width={`${100 / 3}%`}
      >
        {role}
      </Typography>
      <Typography
        variant='body2'
        className='one-line-clamp'
        width={`${100 / 3}%`}
      >
        {email}
      </Typography>
      <Typography
        variant='body2'
        className='one-line-clamp'
        width={`${100 / 5}%`}
      >
        {phone}
      </Typography>
    </Stack>
  );
}
