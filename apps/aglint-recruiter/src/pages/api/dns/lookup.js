import dns from 'dns/promises';

export default async function validateURL(req, res) {
  // Check if the URL starts with 'http://' or 'https://'
  let url;
  if (
    !req.body.url.startsWith('http://') &&
    !req.body.url.startsWith('https://')
  ) {
    // If not, prepend 'https://'
    url = 'https://' + req.body.url;
  } else {
    url = req.body.url;
  }

  try {
    // Try creating a new URL object; this will throw an error if the URL is invalid
    const urlObject = new URL(url);

    // Try to resolve the domain to check if it's valid
    await dns.lookup(urlObject.hostname);
    res.status(200).send(true);
  } catch (error) {
    // The URL is invalid or the domain could not be resolved
    res.status(200).send(false);
  }
}
