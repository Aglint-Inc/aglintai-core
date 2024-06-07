import { Stack, Typography } from '@mui/material';

import Icon from '@/src/components/Common/Icons/Icon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { YTransform } from '@/src/utils/framer-motions/Animation';

function CandidatesListTable({ importedCandidate }) {
  // eslint-disable-next-line no-console
  console.log('importedCandidate', importedCandidate);
  return (
    <Stack
      borderRadius={'10px'}
      border={'1px solid '}
      borderColor={'grey.200'}
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
      bgcolor={'grey.100'}
      py={'10px'}
      px={'20px'}
      justifyContent={'left'}
      direction={'row'}
      alignItems={'center'}
      spacing={'5px'}
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
            spacing={'5px'}
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
    icon: <Icon variant='Person' width='14' height='14' />,
  },
  { heading: 'Email', icon: <Icon variant='Mail' width='14' height='14' /> },
  { heading: 'Phone', icon: <Icon variant='phone' width='14' height='14' /> },
];

function TableRow({ name, email, phone, profile_image, index }) {
  return (
    <Stack
      key={index}
      py={'4px'}
      px={'20px'}
      justifyContent={'left'}
      direction={'row'}
      alignItems={'center'}
      // bgcolor={'yellow.100'} // background color for duplicate candidate row
    >
      <Stack
        width={`${100 / 3}%`}
        direction={'row'}
        alignItems={'center'}
        spacing={'5px'}
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
        pl={'10px'}
      >
        {phone}
      </Typography>
    </Stack>
  );
}
