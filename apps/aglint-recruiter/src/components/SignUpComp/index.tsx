'use client';

import { Box, Container } from '@mui/material';

import { useRouterPro } from '@/src/hooks/useRouterPro';
import ROUTES from '@/src/utils/routing/routes';

import Footer from '../Common/Footer';
import SlideTwoSignUp from './SlideSignup';

const SignUpComp = () => {
  const router = useRouterPro<{ step: string; category: string }>();

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--neutral-2)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {router.pathName === ROUTES['/signup']() && <SlideTwoSignUp />}
        </Box>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Footer />
        </Box>
      </Container>
    </>
  );
};

export default SignUpComp;
