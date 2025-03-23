import express, { Request, Response, Router } from 'express';
import { generateToken } from '../utils/jwt';

const router: Router = express.Router();

// 模擬帳密驗證
router.post('/login', (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    const token = generateToken({ username });
    res.json({ token });
  } else {
    res.status(401).send('帳密錯誤');
  }
});

export default router;
