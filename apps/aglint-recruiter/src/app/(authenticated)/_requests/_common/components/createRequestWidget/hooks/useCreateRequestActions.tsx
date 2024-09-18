import { useCreateRequest } from './useCreateRequest';

export const useCreateRequestActions = () =>
  useCreateRequest((state) => state.actions);
