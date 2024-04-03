import { decrypt } from './lever/candidateSync';

export default async function handler(req, res) {
  const { encryptData } = req.body;
  const data = decrypt(encryptData, process.env.ENCRYPTION_KEY);
  res.status(200).json(data);
}
