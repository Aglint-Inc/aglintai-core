import * as crypto from 'crypto';

export function decrypt_string(encryptedData) {
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
  const encryptedText = encryptedData.slice(32);
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    iv,
  );
  let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
