import { Menu } from './components/menu';
import { Pop } from './components/pop';
import { CreateRequestProvider } from './contexts';

export const CreateRequestWidget = () => {
  return (
    <CreateRequestProvider>
      <Pop>
        <Menu />
      </Pop>
    </CreateRequestProvider>
  );
};
