import { memo } from 'react';

import { Container } from './components/container';
import { Menu } from './components/menu';
import { CreateRequestProvider } from './contexts';

export const CreateRequestWidget = memo(() => {
  return (
    <CreateRequestProvider>
      <Container>
        <Menu />
      </Container>
    </CreateRequestProvider>
  );
});
CreateRequestWidget.displayName = 'CreateRequestWidget';
