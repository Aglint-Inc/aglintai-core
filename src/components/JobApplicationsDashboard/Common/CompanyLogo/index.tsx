import { Avatar } from '@mui/material';

import { IconCompanySmall } from '@/devlink';

const CompanyLogo = ({
  companyLogo,
  companyName,
}: {
  companyLogo?: string;
  companyName: string;
}) => {
  return companyName ? (
    <Avatar
      variant='square'
      sx={{
        bgcolor: 'white.700',
        width: '100%',
        height: '100%',
        '& .MuiAvatar-img ': {
          objectFit: 'contain',
        },
      }}
      style={{ color: 'black' }}
      src={
        companyLogo ||
        `https://logo.clearbit.com/${companyName
          .toLowerCase()
          .replaceAll(' ', '')}.com `
      }
      alt={companyName}
    >
      <IconCompanySmall />
    </Avatar>
  ) : (
    <Avatar
      variant='square'
      sx={{
        bgcolor: 'white.700',
        width: '100%',
        height: '100%',
        '& .MuiAvatar-img ': {
          objectFit: 'contain',
        },
      }}
      style={{ color: 'black' }}
    >
      <IconCompanySmall />
    </Avatar>
  );
};

export default CompanyLogo;
