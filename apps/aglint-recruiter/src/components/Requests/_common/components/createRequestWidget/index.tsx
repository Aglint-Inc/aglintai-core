import { Container } from './components/container';
import { Menu } from './components/menu';
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
