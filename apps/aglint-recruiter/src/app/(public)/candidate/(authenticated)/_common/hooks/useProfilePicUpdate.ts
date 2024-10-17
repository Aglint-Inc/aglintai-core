import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useProfliePicUpdate = () => {
  return useMutation({
    mutationFn: (image: FormData) => updateImage(image),
    mutationKey: ['candidate_pic_update'],
  });
};

const updateImage = async (formData: FormData) => {
  await axios.post('/api/candidate_portal/candidate_pic_update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
