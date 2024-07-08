import * as crypto from 'crypto';

export function decrypt_string(encryptedData) {
  const decipher = crypto.createDecipher('aes256', process.env.ENCRYPTION_KEY);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

export function encrypt_string(data: string) {
  const cipher = crypto.createCipher('aes256', process.env.ENCRYPTION_KEY);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}
