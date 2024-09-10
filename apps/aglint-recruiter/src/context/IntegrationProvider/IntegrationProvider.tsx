import React, { createContext, useContext, useState } from 'react';

import { initialState } from './utils';

type IntegrationStateType = {
  lever: { open: boolean; step: string };
  greenhouse: { open: boolean; step: string };
  ashby: { open: boolean; step: string };
};

export type IntegrationType = {
  integration: IntegrationStateType;
  // eslint-disable-next-line no-unused-vars
  setIntegration: (details: any) => void;
  handleClose: () => void;
};

const initialContextValue: IntegrationType = {
  integration: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIntegration: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClose: () => {},
};

const Integration = createContext<IntegrationType>(initialContextValue);

export const useIntegration = () => {
  return useContext(Integration);
};

type JobPostFormProviderParams = {
  children: React.ReactNode;
};

const IntegrationProvider = ({ children }: JobPostFormProviderParams) => {
  const [integration, setIntegration] =
    useState<IntegrationStateType>(initialState);

  const handleClose = () => {
    setIntegration(initialState);
  };

  return (
    <Integration.Provider value={{ integration, setIntegration, handleClose }}>
      {children}
    </Integration.Provider>
  );
};

export default IntegrationProvider;
