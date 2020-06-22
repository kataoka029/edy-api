exports.seed = function (knex) {
  return knex("messages")
    .del()
    .then(() => {
      return knex("messages").insert([
        {
          line_type: "message",
          line_reply_token: "_",
          line_user_id: "Uf42bb47c877c9e5543ca4eda7661e142",
          line_user_type: "edy",
          line_message_id: "_",
          line_message_type: "text",
          line_message_text: `LINEの友達追加ありがとうございます😀
          ご質問がありましたら、おっしゃってください！`,
          unread: 1,
          created_at: "2020-05-24 05:33:57.292593+00",
          updated_at: "2020-05-24 05:33:57.292593+00",
        },
        {
          line_type: "message",
          line_reply_token: "4d33481b9b184aa8962311c100120207",
          line_user_id: "Uf42bb47c877c9e5543ca4eda7661e142",
          line_user_type: "user",
          line_message_id: "12011694017334",
          line_message_type: "text",
          line_message_text: `はじめまして！
          ちょっと質問なのですが、予約していない友達と一緒に来店しても大丈夫でしょうか？🤔`,
          unread: 1,
          created_at: "2020-05-24 05:33:57.292594+00",
          updated_at: "2020-05-24 05:33:57.292594+00",
        },
        {
          line_type: "message",
          line_reply_token: "_",
          line_user_id: "Uf42bb47c877c9e5543ca4eda7661e142",
          line_user_type: "edy",
          line_message_id: "_",
          line_message_type: "text",
          line_message_text: `はい、大丈夫ですよ🙆‍♀️
          ご来店お待ちしております！`,
          unread: 1,
          created_at: "2020-05-24 05:33:57.292595+00",
          updated_at: "2020-05-24 05:33:57.292595+00",
        },
        {
          line_type: "message",
          line_reply_token: "_",
          line_user_id: "Tf42bb47c877c9e5543ca4eda7661e142",
          line_user_type: "edy",
          line_message_id: "_",
          line_message_type: "text",
          line_message_text: `LINEの友達追加ありがとうございます😀
          ご質問がありましたら、おっしゃってください！`,
          unread: 1,
          created_at: "2020-05-25 05:33:57.292593+00",
          updated_at: "2020-05-25 05:33:57.292593+00",
        },
        {
          line_type: "message",
          line_reply_token: "5d33481b9b184aa8962311c100120207",
          line_user_id: "Tf42bb47c877c9e5543ca4eda7661e142",
          line_user_type: "user",
          line_message_id: "22011694017334",
          line_message_type: "text",
          line_message_text: `いきなりすみません！
          アルバイトの採用ってしていませんか？`,
          unread: 1,
          created_at: "2020-05-25 05:33:57.292594+00",
          updated_at: "2020-05-25 05:33:57.292594+00",
        },
        {
          line_type: "message",
          line_reply_token: "_",
          line_user_id: "Vf42bb47c877c9e5543ca4eda7661e142",
          line_user_type: "edy",
          line_message_id: "_",
          line_message_type: "text",
          line_message_text: `LINEの友達追加ありがとうございます😀
          ご質問がありましたら、おっしゃってください！`,
          unread: 1,
          created_at: "2020-05-26 05:33:57.292593+00",
          updated_at: "2020-05-26 05:33:57.292593+00",
        },
        {
          line_type: "message",
          line_reply_token: "6d33481b9b184aa8962311c100120207",
          line_user_id: "Vf42bb47c877c9e5543ca4eda7661e142",
          line_user_type: "user",
          line_message_id: "32011694017334",
          line_message_type: "text",
          line_message_text:
            "本日これからお伺いしたいのですが、大丈夫ですか？？",
          unread: 1,
          created_at: "2020-05-26 05:33:57.292594+00",
          updated_at: "2020-05-26 05:33:57.292594+00",
        },
      ]);
    });
};
