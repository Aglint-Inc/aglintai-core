import { createContextStoreSelector } from '@/hooks/createContextStoreSelector';

import { CreateRequestContext } from '../contexts';

export const useCreateRequest =
  createContextStoreSelector(CreateRequestContext);
