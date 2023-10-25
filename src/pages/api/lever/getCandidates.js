import axios from 'axios';

export default function handler(req, res) {
  const apiKey = 'wjISASRrEo75ixrodaAS5eT8iV4Bv2T2RhNZ3iIUziYsIAC8';

  const postingId = req.body.posting_id;
  if (postingId) {
    let url = `https://api.lever.co/v1/opportunities?posting_id=${postingId}`;

    if (req.body.offset !== 0) {
      url = `https://api.lever.co/v1/opportunities?posting_id=${postingId}&offset=${req.body.offset}`;
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
  } else {
    res.status(400).send('No posting_id provided');
  }
}
