import { create } from 'zustand';

type OnboardType = { isOpen: boolean };

export const useOnboard = create<OnboardType>()(() => ({
  isOpen: false,
}));

export const setIsOnboardOpen = (isOpen: boolean) =>
  useOnboard.setState({ isOpen });
