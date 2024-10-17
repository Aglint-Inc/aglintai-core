import { toast } from '@components/hooks/use-toast';
import { useState } from 'react';

import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

import { useFlags } from './useFlags';

export const usePortalSettingsDetails = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<
    'greetings' | 'about' | 'images' | null
  >(null);

  const { company_images: tempCompany_images } = useFlags();

  const { data, isLoading: isPortalLoading } =
    api.candidatePortal.get_candidate_portal_detail.useQuery();

  const company_images = tempCompany_images || [];

  const { mutateAsync } = api.tenant.updateTenantPreference.useMutation();

  const [loading, setLoading] = useState<{
    isImageRemoving: string[] | null;
    isImageUploading: boolean;
  }>({
    isImageRemoving: [],
    isImageUploading: false,
  });

  const deleteImages = async (imageUrl: string) => {
    try {
      setLoading((pre) => ({
        ...pre,
        isImageRemoving: [imageUrl, ...(pre.isImageRemoving || [])],
      }));
      const path = extractPath(imageUrl);
      if (path.length === 0) throw new Error('wrong image');

      await supabase.storage.from('company-images').remove([path]);

      await mutateAsync({
        company_images: company_images.filter(
          (image) => !imageUrl.includes(image),
        ),
      });
    } catch (error) {
      // @ts-ignore //check here
      toast({ title: 'Images delete failed', description: error?.message });
    } finally {
      setLoading((pre) => ({
        ...pre,
        isImageRemoving: (pre.isImageRemoving || []).filter(
          (imageRem) => imageRem !== imageUrl,
        ),
      }));
    }
  };

  return {
    deleteImages,
    setIsDialogOpen,
    isDialogOpen,
    loading,
    portalDetails: data!,
    isPortalLoading,
  };
};

function extractPath(url: string) {
  const pathMatch = url.match(/\/company-images\/(.*?)(?:\?|$)/);
  if (pathMatch) {
    // Remove spaces from the extracted path
    return pathMatch[1].replace(/\s+/g, '');
  }
  return '';
}
