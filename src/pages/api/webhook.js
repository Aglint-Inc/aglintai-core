export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle incoming webhook data here
    const payload = req.body;
    // eslint-disable-next-line no-console
    console.log('Received webhook data:', payload);

    

    // Add your logic to process the webhook data

    // Respond with a success message
    res.status(200).json({ message: 'Webhook data received successfully.' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
