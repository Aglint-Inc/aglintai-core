import { Stack, Typography } from '@mui/material';

import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { YTransform } from '@/src/utils/framer-motions/Animation';

function CandidatesListTable({ importedCandidate }) {
  // eslint-disable-next-line no-console
  console.log('importedCandidate', importedCandidate);
  return (
    <Stack
      borderRadius={'var(--radius-4)'}
      border={'1px solid'}
      borderColor='var(--neutral-6)'
      height={'100%'}
      overflow={'scroll'}
    >
      <TableHeader />
      {importedCandidate.map((ele, i) => {
        return (
          <YTransform key={i} uniqueKey={i}>
            <TableRow
              index={i}
              name={ele.first_name + ' ' + ele.last_name}
              email={ele.email}
              phone={ele.phone}
              profile_image={ele.profile_image}
            />
          </YTransform>
        );
      })}
    </Stack>
  );
}

export default CandidatesListTable;

function TableHeader() {
  return (
    <Stack
      bgcolor= {'var(--neutral-7)'}
      py={'var(--space-2)'}
      px={'var(--space-5)'}
      justifyContent={'left'}
      direction={'row'}
      alignItems={'center'}
      spacing={'var(--space-1)'}
      position={'sticky'}
      top={0}
      zIndex={2}
    >
      {headerObject.map((ele, i) => {
        const { heading, icon } = ele;
        return (
          <Stack
            key={i}
            width={`${100 / 3}%`}
            direction={'row'}
            alignItems={'center'}
            spacing={'var(--space-1)'}
          >
            {icon}
            <Typography variant='body1'>{heading}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}

const headerObject = [
  {
    heading: 'Candidate',
    icon: <span icon-size='md' icon-color='neutral-9'>account_circle</span>,
  },
  { heading: 'Email', icon: <span icon-size='md' icon-color='neutral-9'>email</span> },
  { heading: 'Phone', icon: <span icon-size='md' icon-color='neutral-9'>phone</span> },
];

function TableRow({ name, email, phone, profile_image, index }) {
  return (
    <Stack
      key={index}
      py={'var(--space-1)'}
      px={'var(--space-5)'}
      justifyContent={'left'}
      direction={'row'}
      alignItems={'center'}
      // bgcolor={'yellow.100'} // background color for duplicate candidate row
    >
      <Stack
        width={`${100 / 3}%`}
        direction={'row'}
        alignItems={'center'}
        spacing={'var(--space-1)'}
      >
        <MuiAvatar
          src={profile_image}
          level={name}
          variant={'rounded-small'}
        />
        <Typography variant='body1' className='one-line-clamp'>
          {name}
        </Typography>
      </Stack>
      <Typography
        variant='body1'
        className='one-line-clamp'
        width={`${100 / 3}%`}
      >
        {email}
      </Typography>
      <Typography
        variant='body1'
        className='one-line-clamp'
        width={`${100 / 3}%`}
        pl={'var(--space-2)'}
      >
        {phone}
      </Typography>
    </Stack>
  );
}
