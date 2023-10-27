import axios from 'axios';

export default function handler(req, res) {
  const requestData = {
    background: '#ffffff',
    clips: [
      {
        avatar_id: 'Daisy-inskirt-20220818',
        avatar_style: 'normal',
        input_text: 'Welcome to HeyGen API',
        offset: {
          x: 0,
          y: 0,
        },
        scale: 1,
        voice_id: '1bd001e7e50f421d891986aad5158bc8',
      },
    ],
    ratio: '16:9',
    test: true,
    version: 'v1alpha',
  };

  const headers = {
    'X-Api-Key': process.env.HEYGEN_API_KEY,
    'Content-Type': 'application/json',
  };

  axios
    .post('https://api.heygen.com/v1/video.generate', requestData, { headers })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}
