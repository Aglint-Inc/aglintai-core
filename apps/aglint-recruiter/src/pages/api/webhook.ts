/* eslint-disable no-console */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

// Add your logic to process the webhook data

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // eslint-disable-next-line security/detect-object-injection
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    },
  );
  // Handle incoming webhook data here
  const payload = req.body;
  // const payload = {
  //   event_type: 'avatar_video.success',
  //   event_data: {
  //     video_id: '4b87b06344d84a7bb60a984f5358915f',
  //     url: 'https://files.movio.la/aws_pacific/avatar_tmp/0e3424a56e5b47eba6a60cb326bb0c15/cc346b61-7ace-467c-b6a6-dda6bc174f5b.mp4?Expires=1699337550&Signature=VAaPtebxmZtT5PCOpK12YspME~mBOuMjK1wASRKXknClE9cSyAp-b7GYWe2NjXnOm2qWGYBGP9I4fX551LYjOp3xc78w80PaXR71iysRRPGA54UT6nXqFmVUIbLg2KWtwHZmkRhx5hg0JOTMz9Pkbnbik9aPVSmqndQVPwLVdKBW4tOtHgUXfZFxI1UE6td0RxdNU4EMi5HUXKy34feRPq~ErECve-pImGpmZMfa~b9lKVDVWphX9JUAOJwWjnbKhXDX4A8zUVlHMeGMFF8D3QgcsuzRhWhTebjJxZgYjjoFUtbvWHyeQcVx54r-qfYwaGFVEFZqlq7qNVJic~oLow__&Key-Pair-Id=K49TZTO9GZI6K',
  //     callback_id: null,
  //   },
  // };
  console.log('Received webhook data:', payload);

  const {
    event_data: { video_id, url },
  } = payload;

  const bucketName = 'ai_videos';

  // Function to download the file from the URL

  console.log('function calling...', url);
  if (!url.includes('.gif')) {
    console.log('checking gif', url);
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const data = Buffer.from(response.data);
    console.log(data);
    const file = {
      path: `ai_video_${video_id}_${new Date().getTime()}.mp4`, // The path where the video will be stored
      body: data, // File data as a Buffer
      contentType: 'video/mp4', // Set the appropriate content type
    };

    const { data: uploadedData, error } = await supabase.storage
      .from(bucketName)
      .upload(file.path, file.body, { contentType: file.contentType });

    if (error) {
      console.log('Error uploading video:', error.message);
      await supabase.from('ai_videos').insert({
        video_id: video_id,
        video_url: url,
        file_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${uploadedData.path}`,
        error: { error: 'Error uploading video' },
      });
    } else {
      console.log(
        'Video uploaded successfully:',
        uploadedData.path,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${uploadedData.path}`,
      );

      await supabase.from('ai_videos').insert({
        video_id: video_id,
        video_url: url,
        file_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${uploadedData.path}`,
      });
    }
  }

  res.status(200).json({ message: 'Webhook data received successfully.' });
}
