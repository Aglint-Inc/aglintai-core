import { Avatar } from '@mui/material';

const CompanyLogo = ({
  companyLogo,
  companyName,
}: {
  companyLogo?: string;
  companyName: string;
}) => {
  return (
    <Avatar
      variant='square'
      sx={{
        bgcolor: 'white.700',
        width: '100%',
        height: 'auto',
      }}
      src={
        companyLogo ||
        `https://logo.clearbit.com/${companyName
          .toLowerCase()
          .replaceAll(' ', '')}.com `
      }
      alt={companyName}
    >
      Company
      {/* <CompanyIconsmall /> */}
    </Avatar>
  );
};

export default CompanyLogo;
