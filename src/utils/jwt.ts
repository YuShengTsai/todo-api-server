import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET || 'access-secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';

export function generateToken(payload: any): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '5m' }); // ⏰ 短效
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch {
    return null;
  }
}

export function generateRefreshToken(payload: any): string {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' }); // ⏰ 長效
}

export function verifyRefreshToken(token: string): any {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch {
    return null;
  }
}
