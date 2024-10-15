import { createContext, type ReactNode, useContext } from 'react';

import { api } from './client';

export const useHello = () => {
  return api.example.helloWorld.hello.useQuery({
    helloId: 'abc',
  });
};

export const useWorld = () => {
  const { mutate } = api.example.helloWorld.world.useMutation();
  const handleWorld = () => {
    mutate({ worldId: 'def' });
  };
  return { handleWorld };
};

const _A = () => {
  const { data } = useHello();
  return (
    <>
      {JSON.stringify(data)}
      <B />
    </>
  );
};

const B = () => {
  const { data } = useHello();
  const { handleWorld } = useWorld();
  return <div onClick={() => handleWorld()}>{JSON.stringify(data)}</div>;
};

const useFooBarContext = () => {
  const foo = api.example.fooBar.foo.useQuery();
  const { mutate } = api.example.fooBar.bar.useMutation();
  const handleBar = () => {
    mutate({ barId: 'def' });
  };
  return { foo, handleBar };
};

const FooBarContext = createContext<
  ReturnType<typeof useFooBarContext> | undefined
>(undefined);

const _FooBarProvider = ({ children }: { children: ReactNode }) => {
  const value = useFooBarContext();
  return (
    <FooBarContext.Provider value={value}>{children}</FooBarContext.Provider>
  );
};

const _useFooBar = () => {
  const value = useContext(FooBarContext);
  if (!value) throw new Error('useFooBar must be used within a FooBarProvider');
  return value;
};
