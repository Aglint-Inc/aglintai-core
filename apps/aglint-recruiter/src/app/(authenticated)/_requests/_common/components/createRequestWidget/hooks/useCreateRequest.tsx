import { createContextStoreSelector } from '@/utils/zustandContextHelpers';

import { CreateRequestContext } from '../contexts/createRequestContext';

export const useCreateRequest =
  createContextStoreSelector(CreateRequestContext);
