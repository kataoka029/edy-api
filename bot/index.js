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

// const getImageUrl = async (messageId) => {
//   const url = await fetch(`${url}api/messages/${messageId}/imgUrl`)
// const data = {
//   path,
//   settings: {
//     requested_visibility: "public",
//     audience: "public",
//     access: "viewer",
//   },
// };

// const res = await fetch(
//   "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
//   {
//     body: JSON.stringify(data),
//     headers: {
//       Authorization: `Bearer ${dropboxAccessToken}`,
//       "Content-Type": "application/json",
//     },
//     method: "POST",
//   }
// )
//   .then((response) => response.json())
//   .then((jsonResponse) => {
//     const originalUrl = jsonResponse.url;
//     const url = originalUrl.slice(0, originalUrl.indexOf("?") + 1) + "raw=1";
//     res.send(url);
//   })
//   .catch((err) => console.log(err));

// };

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

    const imgUrl = await fetch(`${url}api/messages/${messageId}/imgUrl`);

    console.log("L91 - IMGURL - ", imgUrl);

    fetch(`${url}api/messages/${event.message.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path, imgUrl }),
    });
  }
};

module.exports = { createReplyObject, reply, storeImages };
