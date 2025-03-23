import prisma from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10); // 🔐 加密密碼

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('✅ 預設使用者建立完成：admin / 1234');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
