import { Column, Img, Link, Row } from '@react-email/components';
import React from 'react';

const Footer = () => {
  return (
    <>
      <Row style={{ marginTop: '20px' }}>
        <Column align='center'>
          <Link href='https://aglinthq.com'>
            <Img
              src={
                'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/Screenshot%202024-02-28%20131825.png'
              }
              style={{
                objectFit: 'fill',
              }}
              height={'20px'}
              alt='Aglint Inc'
            />
          </Link>
        </Column>
      </Row>
    </>
  );
};
export default Footer;
