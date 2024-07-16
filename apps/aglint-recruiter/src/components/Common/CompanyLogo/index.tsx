import { Avatar, Stack } from '@mui/material';

import { GlobalIcon } from '@/devlink/GlobalIcon';

const CompanyLogo = ({
  companyLogo,
  companyName,
  borderRadius = 0,
}: {
  companyLogo?: string;
  companyName: string;
  borderRadius?: number;
}) => {
  const name =
    typeof companyName === 'string' ? companyName.toLowerCase().trim() : '';
  return name && !(name.includes('pvt') || name.includes('ltd')) ? (
    <Avatar
      variant='square'
      sx={{
        bgcolor: 'var(--white-a7)',
        width: '100%',
        height: '100%',
        '& .MuiAvatar-img ': {
          objectFit: 'contain',
          borderRadius: `${borderRadius}px`,
        },
      }}
      style={{ color: 'var(--neutral-12)' }}
      src={
        companyLogo ||
        `https://logo.clearbit.com/${name.replaceAll(' ', '')}.com `
      }
      alt={name}
    >
      <UnknownCompany />
    </Avatar>
  ) : (
    <Avatar
      variant='square'
      sx={{
        bgcolor: 'var(--white-a7)',
        width: '100%',
        height: '100%',
        '& .MuiAvatar-img ': {
          objectFit: 'contain',
        },
      }}
      style={{ color: 'var(--neutral-12)' }}
    >
      <UnknownCompany />
    </Avatar>
  );
};

const UnknownCompany = () => {
  return (
    <Stack bgcolor={'var(--neutral-3)'} borderRadius={'var(--radius-2)'} width={'48px'} height={'48px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
    <GlobalIcon iconName='domain' size={8}/>
    </Stack>
    // <svg
    //   width='60'
    //   height='60'
    //   viewBox='0 0 60 60'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <rect width='60' height='60' rx='10' fill='#F8F9F9' />
    //   <path
    //     d='M42 16H32C31.4167 16 30.9375 16.1875 30.5625 16.5625C30.1875 16.9375 30 17.4167 30 18V42C30 42.5833 30.1875 43.0625 30.5625 43.4375C30.9375 43.8125 31.4167 44 32 44H42C42.5833 44 43.0625 43.8125 43.4375 43.4375C43.8125 43.0625 44 42.5833 44 42V18C44 17.4167 43.8125 16.9375 43.4375 16.5625C43.0625 16.1875 42.5833 16 42 16ZM32 14H42C43.125 14.0417 44.0625 14.4375 44.8125 15.1875C45.5625 15.9375 45.9583 16.875 46 18V42C45.9583 43.125 45.5625 44.0625 44.8125 44.8125C44.0625 45.5625 43.125 45.9583 42 46H32C30.875 45.9583 29.9375 45.5625 29.1875 44.8125C28.4375 44.0625 28.0417 43.125 28 42V18C28.0417 16.875 28.4375 15.9375 29.1875 15.1875C29.9375 14.4375 30.875 14.0417 32 14ZM26 22V24H18C17.4167 24 16.9375 24.1875 16.5625 24.5625C16.1875 24.9375 16 25.4167 16 26V42C16 42.5833 16.1875 43.0625 16.5625 43.4375C16.9375 43.8125 17.4167 44 18 44H26.3125C26.6042 44.75 27 45.4167 27.5 46H18C16.875 45.9583 15.9375 45.5625 15.1875 44.8125C14.4375 44.0625 14.0417 43.125 14 42V26C14.0417 24.875 14.4375 23.9375 15.1875 23.1875C15.9375 22.4375 16.875 22.0417 18 22H26ZM19.5 34H22.5C23.4167 34.0833 23.9167 34.5833 24 35.5V38.5C23.9167 39.4167 23.4167 39.9167 22.5 40H19.5C18.5833 39.9167 18.0833 39.4167 18 38.5V35.5C18.0833 34.5833 18.5833 34.0833 19.5 34ZM20 38H22V36H20V38ZM34 38.5V35.5C34.0833 34.5833 34.5833 34.0833 35.5 34H38.5C39.4167 34.0833 39.9167 34.5833 40 35.5V38.5C39.9167 39.4167 39.4167 39.9167 38.5 40H35.5C34.5833 39.9167 34.0833 39.4167 34 38.5ZM36 38H38V36H36V38ZM19.5 26H22.5C23.4167 26.0833 23.9167 26.5833 24 27.5V30.5C23.9167 31.4167 23.4167 31.9167 22.5 32H19.5C18.5833 31.9167 18.0833 31.4167 18 30.5V27.5C18.0833 26.5833 18.5833 26.0833 19.5 26ZM20 30H22V28H20V30ZM34 19.5C34.0833 18.5833 34.5833 18.0833 35.5 18H38.5C39.4167 18.0833 39.9167 18.5833 40 19.5V22.5C39.9167 23.4167 39.4167 23.9167 38.5 24H35.5C34.5833 23.9167 34.0833 23.4167 34 22.5V19.5ZM36 20V22H38V20H36ZM35.5 32C34.5833 31.9167 34.0833 31.4167 34 30.5V27.5C34.0833 26.5833 34.5833 26.0833 35.5 26H38.5C39.4167 26.0833 39.9167 26.5833 40 27.5V30.5C39.9167 31.4167 39.4167 31.9167 38.5 32H35.5ZM36 28V30H38V28H36Z'
    //     fill='#C2C8CC'
    //   />
    // </svg>
  );
};

export default CompanyLogo;
