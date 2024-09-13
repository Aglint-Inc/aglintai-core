import { createContextStoreSelector } from '@/hooks/createContextStoreSelector';

import { CreateRequestContext } from '../contexts/createRequestContext';

export const useCreateRequest =
  createContextStoreSelector(CreateRequestContext);
