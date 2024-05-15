import { Hr, Img } from '@react-email/components';
import React from 'react';

const Header = ({ logoUrl }: { logoUrl?: string }) => {
  const aglintLogoUrl = logoUrl
    ? logoUrl
    : 'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png?t=2024-01-24T13%3A11%3A17.382Z';
  return (
    <>
      <Img
        src={aglintLogoUrl}
        style={{ objectFit: 'contain' }}
        width={'150px'}
        alt='Aglint Inc'
      />
      <Hr style={hr} />
    </>
  );
};
export default Header;

const hr = {
  borderColor: '#d8dcde',
  margin: '20px 0',
};
