import axios from 'axios';

export default function handler(req, res) {
  try {
    let { linkedInURL } = req.body;
    const options = {
      method: 'GET',
      url: 'https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile',
      params: { linkedin_url: linkedInURL },
      headers: {
        'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
        'X-RapidAPI-Host': 'fresh-linkedin-profile-data.p.rapidapi.com',
      },
      timeout: 10000,
    };
    axios
      .request(options)
      .then((response) => {
        res.status(200).json({ data: response.data });
      })
      .catch((error) => {
        res.status(200).json({ error: error.message });
      });
  } catch (error) {
    res.status(200).json({ error: error });
  }
}
