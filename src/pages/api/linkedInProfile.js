// import axios from 'axios';

export default function handler(req, res) {
  let { linkedInURL } = req.body;
  let url = `https://piloterr.com/api/v2/linkedin/profile/info?query=${linkedInURL}`;
  let apiKey = process.env.PILOTERR_LINKEDIN_API;
  try {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        // console.log(data);
        res.status(200).json(data);
      })
      .catch((error) => {
        // Handle errors here
        // console.error('Error:', error);
        return error;
      });
  } catch (error) {
    res.status(200).json({ error: error });
  }
}
