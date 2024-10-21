import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useCoverUpdate = () => {
  return useMutation({
    mutationFn: (image: FormData) => updateImage(image),
    mutationKey: ['portal_cover_update'],
  });
};

const updateImage = async (formData: FormData) => {
  await axios.post('/api/candidate_portal/portal_cover_update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
