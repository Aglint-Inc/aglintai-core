import axios from 'axios';

export default async function handler(req, res) {
  if (req.body.url) {
    const options = {
      method: 'GET',
      url: 'https://fresh-linkedin-profile-data.p.rapidapi.com/get-company-by-linkedinurl',
      params: {
        linkedin_url: req.body.url,
      },
      headers: {
        'X-RapidAPI-Key': '0a46bdb41amsha605f867e339b40p11cafejsn51572db2a57a',
        'X-RapidAPI-Host': 'fresh-linkedin-profile-data.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      res.status(200).send(response.data.data);
    } catch (error) {
      res.status(500).send({ data: null, error: error });
    }
  } else {
    res.status(200).send({ data: null, error: 'url is required in body' });
  }
}
