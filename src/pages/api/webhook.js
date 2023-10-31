/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

// Add your logic to process the webhook data

export default async function handler(req, res) {
  // Handle incoming webhook data here
  const payload = req.body;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  // const payload = {
  //   event_type: 'avatar_video_gif.success',
  //   event_data: {
  //     video_id: 'de1f874bf4d047e4aa65843db82033c0',
  //     url: 'https://resource.heygen.com/video/gifs/de1f874bf4d047e4aa65843db82033c0.gif',
  //     callback_id: null,
  //   },
  // };

  // const payload = {
  //   event_type: 'avatar_video.success',
  //   event_data: {
  //     video_id: 'de1f874bf4d047e4aa65843db82033c1',
  //     url: 'https://files.movio.la/aws_pacific/avatar_tmp/0e3424a56e5b47eba6a60cb326bb0c15/172f4ca2-a003-4b62-8bcf-5dff1c8eb87c.mp4?Expires=1698816874&Signature=jkRiO2yFn3jj-HGACtgH4jJHYEmJE~wsufQSCgEP4vwrNrV5Zqcs5~MtXNZIZq1cJeF4ExzqgXVHMyFuQrLDt7~thqHcHJmw-RcH94LI9RRXOUG7aSfVqY6PjS8XXIgY55sXkxQnjYpRll~dS-HFjdYlj0eNUfaqK1lkuXirbMFjLkLxdI9yOncKNvNw-dPAO5DuNB2ZYzimqFI4ceD8xr6BLtOr2hZuLZOKlhfMRgSwt9-oBT5GgXussERIngeotWREwukLPakh5rlqXsklNgbgPDbJ3AS7W4FTXwr1G-Tue0VQFfTUuSJBaSSuS3QMxmzDuMuZitvZI~fq1KIowA__&Key-Pair-Id=K49TZTO9GZI6K',
  //     callback_id: null,
  //   },
  // };
  // eslint-disable-next-line no-console
  console.log('Received webhook data:', payload);

  const {
    event_data: { video_id, url },
  } = payload;
  // const url =
  //   'https://files.movio.la/aws_pacific/avatar_tmp/0e3424a56e5b47eba6a60cb326bb0c15/8517c689-2b94-4752-8d82-a7adda3e58c9.mp4?Expires=1698769594&Signature=jTeiUIEukXT7A39svMZuP9L8oBxUdPTEV95AWPiX~EzIcrlTzNsA52PYCjPiORp44eIfQ99YAEem5RQ55RsshMv073eoV7TAUUIWUuX8hsTEa1s9Yw5QDft3RFocWu7WAiEKRfDHfZ9zD9T2neATzHbp4qhtSIl-WEJadG~x2I-T9tM5BfSsKPoKToSKp2CeR8BS4Z4ioK~1GO6QxrSOe8N0IfRpmyIzVD5jbt4rkArla99ExzgwZKglfDRzJ5TXquRxxr2FwRKO~PJgiwIE91VUGG-F2FmrFuLe-ISMQmCQXpq~llxtOXAPf15CkcBtS7YBbRX8Xq2fbnJPL9CYeQ__&Key-Pair-Id=K49TZTO9GZI6K'; // URL of the video

  // Define the storage bucket name
  const bucketName = 'ai_videos';

  // Function to download the file from the URL
  const downloadFile = async () => {
    console.log('function calling...');
    if (!url.includes('.gif')) {
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
  };

  // Call the downloadFile function to initiate the process
  downloadFile();
  res.status(200).json({ message: 'Webhook data received successfully.' });
}
