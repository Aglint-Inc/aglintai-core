import axios from 'axios';

export default function handler(req, res) {
  const requestData = {
    background: '#ffffff',
    clips: [
      {
        avatar_id: 'Andrew_public_pro1_20230614',
        avatar_style: 'normal',
        input_text: req.body.text,
        offset: {
          x: 0,
          y: 0,
        },
        scale: 1,
        voice_id: 'b3150d405d374dd99e569282ee68fa21',
      },
    ],
    ratio: '16:9',
    test: false,
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
