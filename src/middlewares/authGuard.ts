import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export function authGuard(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(401).send('缺少授權');
    return; // 💡 不要 return res...，只用 return 結束
  }

  const token = authHeader.replace('Bearer ', '');
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).send('Token 無效');
    return;
  }

  (req as any).user = decoded;
  next();
}
