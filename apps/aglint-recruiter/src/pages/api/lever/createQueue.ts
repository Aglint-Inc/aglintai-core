const axios = require('axios');

export default function handler(req, res) {
  let data = JSON.stringify({
    records: req.body.records,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.LEVER_TASK_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        res.status(200).send('successfully created queue');
      }
    })
    .catch(() => {
      res.status(400).send('error occured while creatind queue');
    });
}
