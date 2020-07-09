const { config, client, url, dropboxAccessToken } = require("../config");
const fetch = require("node-fetch");
const dropboxV2Api = require("dropbox-v2-api");

const createReplyObject = (events) => {
  const text = events[0].message.text;
  return {
    type: "text",
    text: `「${text}」ですね。申し訳ないのですが、言葉の意味がよく分かりません😰なるべく早く担当からご連絡させていただきますので、少々お待ちください🙇‍♀️`,
  };
};

const reply = async (events) => {
  const event = events[0];
  const replyObject = createReplyObject(events);
  client
    .replyMessage(event.replyToken, [replyObject])
    .then(() => console.log("SUCCESS - reply()"))
    .catch((err) => console.log("ERROR - reply() - ", err));
};

const dropbox = dropboxV2Api.authenticate({
  token: dropboxAccessToken,
});

const storeImages = async (events) => {
  const res = await fetch(`${url}api/users/${events[0].source.userId}`);
  const users = await res.json();
  const userId = users[0].id;

  for (const event of events) {
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2) +
      ("00" + date.getMilliseconds()).slice(-3);

    const path = `/edy-images/${userId}/${timestamp}.jpg`;

    fetch(`${url}api/messages/${event.message.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: path }),
    });

    await fetch(
      `https://api-data.line.me/v2/bot/message/${event.message.id}/content`,
      {
        headers: {
          Authorization: `Bearer ${config.channelAccessToken}`,
        },
      }
    ).then((res) => {
      res.body.pipe(
        dropbox({
          resource: "files/upload",
          parameters: { path },
        })
      );
    });
  }
};

module.exports = { createReplyObject, reply, storeImages };
