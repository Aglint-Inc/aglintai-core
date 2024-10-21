import { createContext, useContext } from 'react';

import { useCompanySetup } from '@/authenticated/hooks/useCompanySetup';

const OnboardingContext = createContext<
  ReturnType<typeof useCompanySetup> | undefined
>(undefined);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { ...value } = useCompanySetup();
  return (
    <OnboardingContext.Provider value={{ ...value }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('onborading context out of boundary');
  return context;
};
