import { supabase } from '@/src/utils/supabaseClient';

export default async function handler(req, res) {
  // Handle incoming webhook data here
  const payload = req.body;
  // eslint-disable-next-line no-console
  console.log('Received webhook data:', payload);

  const {
    event_data: { video_id, url },
  } = payload;
  if (!url.includes('.gif')) {
    await supabase.from('ai_videos').insert({
      video_id: video_id,
      video_url: url,
    });
  }
  // Add your logic to process the webhook data

  // Respond with a success message
  res.status(200).json({ message: 'Webhook data received successfully.' });
}
