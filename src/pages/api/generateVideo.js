import axios from 'axios';

export default function handler(req, res) {
  const requestData = {
    background: '#ffffff',
    clips: [
      {
        avatar_id: req.body.avatar_id,
        avatar_style: 'normal',
        input_text: req.body.text,
        offset: {
          x: 0,
          y: 0,
        },
        scale: 1,
        voice_id: req.body.voice_id,
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
