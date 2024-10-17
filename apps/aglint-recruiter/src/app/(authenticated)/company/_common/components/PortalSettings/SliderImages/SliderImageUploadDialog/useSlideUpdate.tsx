import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useSlideUpdate = () => {
  return useMutation({
    mutationFn: (image: FormData) => updateImage(image),
    mutationKey: ['portal_slide_update'],
  });
};

const updateImage = async (formData: FormData) => {
  await axios.post('/api/candidate_portal/portal_slide_update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// ---------------

export const useSlideRemove = () => {
  return useMutation({
    mutationFn: removeImage,
    mutationKey: ['portal_slide_remove'],
  });
};

const removeImage = async (arg: { imageUrl: string }) => {
  await axios.post('/api/candidate_portal/portal_slide_remove', arg, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
