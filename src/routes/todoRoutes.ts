import express, { Response } from 'express';
import prisma from '../lib/prisma';

const router = express.Router();

const userTodos: Record<string, { id: number; text: string }[]> = {};
let idCounter = 1;

router.get('/',async (req: any, res: Response): Promise<void> => {
  const userId = req.user.userId;

  const todos = await prisma.todo.findMany({
    where: { userId },
  });

  res.json(todos);
});

// 新增 todo
router.post('/', async (req: any, res: Response): Promise<void> => {
  const userId = req.user.userId;
  const { text } = req.body;

  if (!text) {
    res.status(400).send('缺少 text 欄位');
    return;
  }

  const todo = await prisma.todo.create({
    data: {
      text,
      userId,
    },
  });

  res.status(201).json(todo);
});

// 刪除 todo（只能刪自己的）
router.delete('/:id', async (req: any, res: Response): Promise<void> => {
  const userId = req.user.userId;
  const id = parseInt(req.params.id);

  // 檢查這個 todo 是不是這個使用者的
  const target = await prisma.todo.findUnique({ where: { id } });
  if (!target || target.userId !== userId) {
    res.status(403).send('你不能刪除別人的 todo');
    return;
  }

  await prisma.todo.delete({ where: { id } });
  res.sendStatus(204);
});

export default router;
