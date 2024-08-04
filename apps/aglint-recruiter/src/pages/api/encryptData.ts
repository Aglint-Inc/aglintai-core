const crypto = require('crypto');

export default async function handler(req, res) {
  const { planData } = req.body;
  const data = encrypt(planData, process.env.ENCRYPTION_KEY);
  res.status(200).json(data);
}

export function encrypt(data, encryptionKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(encryptionKey, 'hex'),
    iv,
  );
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  const ivHex = iv.toString('hex');
  const encryptedDataWithIv = ivHex + encryptedData;

  return encryptedDataWithIv;
}
