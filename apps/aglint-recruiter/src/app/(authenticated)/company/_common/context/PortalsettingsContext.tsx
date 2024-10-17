import { createContext,useContext } from 'react';

import { usePortalSettingsDetails } from '../hooks/usePortalSettings';

const PortalSettingContext = createContext<
  ReturnType<typeof usePortalSettingsDetails> | undefined
>(undefined);

export const usePortalSettings = () => {
  const context = useContext(PortalSettingContext);
  if (!context) throw new Error('portal setting context out of boundary');
  return context;
};

export const PortalSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const values = usePortalSettingsDetails();
  return (
    <PortalSettingContext.Provider value={{ ...values }}>
      {children}
    </PortalSettingContext.Provider>
  );
};
