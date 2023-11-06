import { Stack, Typography } from '@mui/material';
import React from 'react';

import { IconCandidate, IconMail, IconPhone } from '@/devlink';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import { getGravatar } from '../../ApplicationCard';
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

function TableRow({ name, email, phone }) {
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
        <MuiAvatar
          width={'20px'}
          height={'20px'}
          src={getGravatar(name, email)}
          fontSize={'20px'}
          level={name}
          variant={'circular'}
        />
        <Typography variant='body2' className='one-line-clamp'>
          {name}
        </Typography>
      </Stack>

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
