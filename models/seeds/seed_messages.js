exports.seed = function (knex) {
  return knex("messages")
    .del()
    .then(() => {
      return knex("messages").insert([
        {
          user_id: 1,
          line_type: "message",
          line_reply_token: "_",
          line_user_id: "_",
          line_user_type: "edy",
          line_message_id: "_",
          line_message_type: "text",
          line_message_text:
            "LINEの友達追加ありがとうございます😀\nご質問がありましたら、おっしゃってくださ！",
        },
        {
          user_id: 1,
          line_type: "message",
          line_reply_token: "4d33481b9b184aa8962311c100120207",
          line_user_id: "Uf42bb47c877c9e5543ca4eda7661e142",
          line_user_type: "user",
          line_message_id: "12011694017334",
          line_message_type: "text",
          line_message_text:
            "はじめまして！ちょっと質問なのですが、予約していない友達と一緒に来店しても大丈夫でしょうか？🤔",
        },
        {
          user_id: 1,
          line_type: "message",
          line_reply_token: "_",
          line_user_id: "_",
          line_user_type: "edy",
          line_message_id: "_",
          line_message_type: "text",
          line_message_text: "はい、大丈夫ですよ🙆‍♀️ご来店お待ちしております！",
        },
        {
          user_id: 1,
          line_type: "message",
          line_reply_token: "9e3711bc182f41d6b5461f73b6fe897e",
          line_user_id: "Uf42bb47c877c9e5543ca4eda7661e142",
          line_user_type: "user",
          line_message_id: "12016981118658",
          line_message_type: "text",
          line_message_text:
            "早速のご返信ありがとうございます🧡もう1つ質問してもいいですか？",
        },
        {
          user_id: 1,
          line_type: "message",
          line_reply_token: "_",
          line_user_id: "_",
          line_user_type: "edy",
          line_message_id: "_",
          line_message_type: "text",
          line_message_text: "はい、どうされましたか？",
        },
      ]);
    });
};
