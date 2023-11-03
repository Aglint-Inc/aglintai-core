import { supabase } from '@/src/utils/supabaseClient';

export const supabaseWrap = ({ data, error }: any) => {
  if (error) throw new Error(error);
  return data;
};

export async function getVideo(videoId: any) {
  const { data, error } = await supabase
    .from('ai_videos')
    .select()
    .eq('video_id', videoId);
  if (!error) {
    return data[0];
  }
}
