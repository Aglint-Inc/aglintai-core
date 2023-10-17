import axios from 'axios';

export default function handler(req, res) {
  const requestData = {
    background: '#ffffff',
    clips: [
      {
        avatar_id: 'Angela-inblackskirt-20220820',
        avatar_style: 'normal',
        input_text: req.body.text,
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
    'X-Api-Key': 'NTUwYWI1MDg2ODMxNGFmOGI0Y2Y0NWQzY2FlMmIwN2YtMTY5NzU2MTcwOA==',
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
