import crypto from 'crypto';

export default async function handler(req, res) {
  const { encryptData } = req.body;
  const data = decrypt(encryptData, process.env.ENCRYPTION_KEY);
  res.status(200).json(data);
}

export function decrypt(encryptedData, encryptionKey) {
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
  const encryptedText = encryptedData.slice(32);
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(encryptionKey, 'hex'),
    iv,
  );
  let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
