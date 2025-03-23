import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mysecret';

export function generateToken(payload: any): string {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
