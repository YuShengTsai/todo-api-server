import express, { Request, Response, Router } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import { verifyRefreshToken, generateToken, generateRefreshToken } from '../utils/jwt';

const router: Router = express.Router();

// 模擬帳密驗證
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // 查詢使用者
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    res.status(401).send('帳號錯誤');
    return;
  }

  // 驗證密碼
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).send('密碼錯誤');
    return;
  }

  const accessToken = generateToken({ userId: user.id, username: user.username });
  const refreshToken = generateRefreshToken({ userId: user.id });

  // 📝 計算過期時間（7 天後）
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 7);

  // 💾 存入資料庫
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiredAt,
    },
  });

  res.json({ accessToken, refreshToken });
  return;
});

// 🔄 用 refresh token 換新 access token
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).send('缺少 refreshToken');
    return;
  }

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    res.status(401).send('refreshToken 無效');
    return;
  }

  // 查資料庫有沒有這組 refresh token
  const tokenInDB = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!tokenInDB || tokenInDB.expiredAt < new Date()) {
    res.status(403).send('refreshToken 已過期或不存在');
    return;
  }

  const newAccessToken = generateToken({
    userId: payload.userId,
    username: payload.username,
  });

  res.json({ accessToken: newAccessToken });
});

// 🧼 登出：刪除 refresh token
router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(400).send('缺少 refreshToken');
    return;
  }

  // 刪除資料庫中的 refresh token
  await prisma.refreshToken.deleteMany({
    where: { token: refreshToken },
  });

  res.send('已登出');
});


export default router;