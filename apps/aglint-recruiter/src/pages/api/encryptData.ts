const crypto = require('crypto');

export default async function handler(req, res) {
  const { planData } = req.body;
  const data = encrypt(planData, process.env.ENCRYPTION_KEY);
  res.status(200).json(data);
}

function encrypt(data: any, encryptionKey: string) {
  const cipher = crypto.createCipher('aes256', encryptionKey);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}
