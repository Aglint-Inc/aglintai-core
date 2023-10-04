const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req, res) {
  let details = req.body;
  const msg = {
    to: details.email, // Change to your recipient
    from: {
      email: details.fromEmail || 'admin@aglinthq.com',
      name: details.fromName || 'Aglint Admin',
    }, // Change to your verified sender
    subject: details.subject,
    html: details.text,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({ data: 'Email sent' });
    })
    .catch((error) => {
      res.status(200).json({ data: { error } });
    });
}
