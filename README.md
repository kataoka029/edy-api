edy-bot は、渋谷にある貸衣装店 Empty Dressy の管理システムとして開発中のアプリケーションのサーバーサイドです。

## 📝 API

| Method | Path                         | 内容                                             |
| ------ | ---------------------------- | ------------------------------------------------ |
| GET    | /api/users                   | ユーザーの一覧を返す                             |
| GET    | /api/users/:id/messages      | あるユーザーのメッセージの一覧を返す             |
| GET    | /api/users/:id/orders        | あるユーザーの注文の一覧を返す                   |
| POST   | /api/messages                | メッセージを登録する                             |
| POST   | /api/users                   | ユーザーを登録する                               |
| POST   | /api/users/:id/messages      | あるユーザーに LINE でメッセージを送信する       |
| PATCH  | /api/messages/url            | 全メッセージの image_url を更新する              |
| PATCH  | /api/messages/:id/path       | あるメッセージの image_path を更新する           |
| PATCH  | /api/messages/:id/check      | あるユーザーの全メッセージの to_check を更新する |
| PATCH  | /api/users/:id/messages/read | あるユーザーの全メッセージの read を更新する     |

## 💡 技術

- Express
- Node.js
- PostgreSQL
- Stripe
- WebSocket

## 📁 フォルダ構成

```
├── README.md
├── bot
│   ├── index.js
│   └── logic
│       └── index.js
├── config.js
├── db
│   ├── index.js
│   ├── migrations
│   │   ├── 20200522234114_create_messages_table.js
│   │   ├── 20200623125514_create_users_table.js
│   │   └── 20200730223613_create_orders_table.js
│   └── seeds
│       ├── seed_messages.js
│       ├── seed_orders.js
│       └── seed_users.js
├── knexfile.js
├── node_modules
├── package.json
├── public
│   └── index.html
├── routers
│   ├── api
│   │   ├── index.js
│   │   ├── messages
│   │   │   └── index.js
│   │   ├── orders
│   │   │   └── index.js
│   │   └── users
│   │       └── index.js
│   ├── index.js
│   ├── payment
│   │   └── index.js
│   └── webhook
│       └── index.js
├── server.js
├── tests
│   └── api_messages.test.js
└── yarn.lock
```

## 🖥 クライアントサイド

https://github.com/kataoka029/edy-manager
