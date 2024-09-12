import { Menu } from './components/menu';
import { Container } from './components/container';
import { CreateRequestProvider } from './contexts';

export const CreateRequestWidget = () => {
  return (
    <CreateRequestProvider>
      <Container>
        <Menu />
      </Container>
    </CreateRequestProvider>
  );
};
