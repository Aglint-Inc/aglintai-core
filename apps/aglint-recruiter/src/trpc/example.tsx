/* eslint-disable no-unused-vars */
import { createContext, type ReactNode, useContext } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import { api } from './client';

export const useHello = () => {
  const { recruiter_id } = useAuthDetails();
  return api.example.helloWorld.hello.useQuery({
    helloId: recruiter_id,
  });
};

export const useWorld = () => {
  const { recruiter_id } = useAuthDetails();
  const { mutate } = api.example.helloWorld.world.useMutation();
  const handleWorld = () => {
    mutate({ worldId: recruiter_id });
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
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return <div onClick={() => handleWorld()}>{JSON.stringify(data)}</div>;
};

const useFooBarContext = () => {
  const { recruiter_id } = useAuthDetails();
  const foo = api.example.fooBar.foo.useQuery({
    fooId: recruiter_id,
  });
  const { mutate } = api.example.fooBar.bar.useMutation();
  const handleBar = () => {
    mutate({ barId: recruiter_id });
  };
  return { foo, handleBar };
};

const FooBarContext =
  createContext<ReturnType<typeof useFooBarContext>>(undefined);

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
