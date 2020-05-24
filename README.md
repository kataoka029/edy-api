# 🤖 EDY BOTとは
## 概要
* LINEを通じた顧客とのコミュニケーションツール。
* Messaging APIを活用したポット対応と、ボットでは対応しきれない場合の手動への切り替えをシームレスに行うことが可能。
## イメージ
![](https://raw.githubusercontent.com/kataoka029/edy-bot/master/public/img/top-image.jpg)

# 💻 開発
## 環境
* Node.js - 12.16.1
* @line/bot-sdk - 6.8.4
* heroku - 7.41.1

## API（外部利用不可）
* GET /api/messages?u={user_id}：user_idのメッセージの一覧が取得できる。
* POST /api/messages：メッセージを作成できる。
* POST /webhook：LINEからの通知がくる。
  
## フォルダ構成
    ├── README.md
    ├── bot.js
    ├── knexfile.js
    ├── models
    │   ├── messages
    │   │   ├── create.js
    │   │   └── get.js
    │   ├── migrations
    │   │   └── 20200522234114_create_messages_table.js
    │   └── seeds
    │       └── seed_messages.js
    ├── node_modules
    ├── package.json
    ├── public
    │   ├── img
    │   ├── index.html
    │   ├── reset.css
    │   ├── script.js
    │   └── style.css
    ├── routers
    │   ├── api
    │   │   ├── messagesRouter.js
    │   │   └── usersRouter.js
    │   ├── rootRouter.js
    │   └── webhook
    │       └── webhookRouter.js
    ├── server.js
    └── yarn.lock

# 今後の実装予定
* Reactでリアルタイムに更新できるようにする。
* プッシュメッセージを送った際に相手のLINEに反映させる。
* ユーザー情報を取得する。
* ユーザー一覧を左カラムに表示する。
* ユーザー詳細を右カラムに表示する。