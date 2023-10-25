import axios from 'axios';

export default function handler(req, res) {
  const apiKey = 'wjISASRrEo75ixrodaAS5eT8iV4Bv2T2RhNZ3iIUziYsIAC8';

  let url = `https://api.lever.co/v1/postings`;

  if (req.body.offset !== 0) {
    url = `https://api.lever.co/v1/postings?offset=${req.body.offset}`;
  }

  axios
    .get(url, {
      auth: {
        username: apiKey,
        password: '',
      },
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
}
