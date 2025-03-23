import express from 'express';
import dotenv from 'dotenv';
import { authGuard } from './middlewares/authGuard';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';


dotenv.config();

const app = express();

// 解析 JSON 請求
app.use(express.json());

// 測試用 API
app.get('/hello', (req, res) => {
  res.send('Hello, API Engineer!');
});

app.use('/auth', authRoutes);

app.get('/private', authGuard, (req: any, res) => {
  res.json({
    message: '你成功進入了受保護的資料',
    user: req.user,
  });
});

app.use('/todos', authGuard, todoRoutes);

export default app;
