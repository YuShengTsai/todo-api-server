# 📝 Todo API Server

使用 **Node.js + TypeScript** 打造的 RESTful API 專案，支援 JWT 驗證、Refresh Token 機制，並透過 Prisma 操作 SQLite 資料庫。

> 📌 本專案為個人履歷作品，展示完整後端架構設計、模組化撰寫與使用者驗證實作。

---

## 🔧 技術棧

- Node.js + Express
- TypeScript
- Prisma ORM + SQLite
- JSON Web Token (JWT)
- Refresh Token 驗證機制
- bcrypt 密碼加密
- RESTful API 設計

---

## 📂 專案結構

```bash
todo-api-server/
├── src/
│   ├── routes/             # 路由 (auth, todos)
│   ├── middlewares/        # 驗證與共用 middleware
│   ├── utils/              # JWT 工具
│   ├── lib/                # 資料庫初始化
│   ├── app.ts              # 註冊所有路由
│   └── server.ts           # 啟動伺服器
├── prisma/                 # Prisma schema & migration 設定
├── scripts/
│   └── seed.ts             # 建立預設帳號
├── .env                    # 環境變數（不上傳）
├── package.json
└── README.md

```
---

## 🚀 快速啟動

```bash
# 1. 安裝套件
npm install

# 2. 建立 .env 檔案，設定環境變數
# （可使用 SQLite 快速起步）
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-access-secret"
REFRESH_SECRET="your-refresh-secret"
# 3. 建立資料庫
npx prisma migrate dev --name init

# 4. 建立預設帳號 admin / 1234
npx ts-node scripts/seed.ts

# 5. 啟動伺服器
npm run dev

```
---

## 🔐 Auth API
```bash
方法	路徑	說明
POST	/auth/login	登入（回傳 accessToken & refreshToken）
POST	/auth/refresh	使用 refresh token 換新的 access token
POST	/auth/logout	登出（刪除 refresh token）
```
---

## 📋 Todo API（需 JWT 驗證）
```bash
方法	路徑	說明
GET	/todos	取得目前使用者的 todos
POST	/todos	新增 todo
DELETE	/todos/:id	刪除 todo（只能刪自己的）
```
---

## 📫 Postman 測試套件

```bash
本專案提供完整 Postman 測試流程，包含自動儲存 token、自動串接 todo 建立與刪除測試：

- [🔄 Collection 測試檔](./todo-api-server.postman_collection.json)
- [⚙️ 測試環境變數檔](./local-dev.postman_environment.json)

📌 提示：
- 執行任一 todo API 前，請先執行 `/auth/login`
- 所有請求皆自動加上 `Bearer Token`，免手動填入
- 可於 Postman Console 查看測試流程與變數紀錄

```
---

## 👤 作者
YuShengTsai
