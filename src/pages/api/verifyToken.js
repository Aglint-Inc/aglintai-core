import { jwtVerify } from 'jose';

export default async function handler(req, res) {
  if (req.body.token) {
    const token = req.body.token;
    try {
      const isTokenVerified = await verify(
        token,
        process.env.SUPABASE_SECRET_KEY,
      );
      if (isTokenVerified) {
        // if verified redired to requested end point
        res.status(200).send(true);
      } else {
        res
          .status(401)
          .json({ error: 'Invalid Access Token' }, { status: 401 });
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(200).send({ data: null, error: 'token is required in body' });
  }
}

async function verify(token, secret) {
  try {
    await jwtVerify(token, new TextEncoder().encode(secret), {
      maxTokenAge: 60 * 60,
    });
    return true;
  } catch (e) {
    return false;
  }
}
