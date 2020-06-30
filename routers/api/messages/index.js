const express = require("express");
const config = require("../../../knexfile.js").development;
const knex = require("knex")(config);

const { client } = require("../../../config");

const messagesRouter = express.Router();

messagesRouter.get("/", (req, res) => {
  return [];
});

messagesRouter.get("/:lineUserId", (req, res) => {
  const lineUserId = req.params.lineUserId;
  return knex("messages")
    .where({ line_user_id: lineUserId })
    .orderBy("created_at")
    .select()
    .then((messages) => res.send(messages))
    .then(() => console.log("SUCCESS - GET /messages/:lineUserId"))
    .catch((err) => console.log("ERROR - GET /messages/:lineUserId - ", err));
});

messagesRouter.post("/", (req, res) => {
  const event = req.body[0];
  const message = {
    line_type: event.type,
    line_reply_token: event.replyToken,
    line_user_id: event.source.userId,
    line_user_type: event.source.type,
    line_message_id: event.message.id,
    line_message_type: event.message.type,
    line_message_text: event.message.text,
    unread: 1,
  };
  return knex("messages")
    .insert(message)
    .then(() => res.status(201).send())
    .then(() => "SUCCESS - POST /messages")
    .catch((err) => console.log("ERROR - POST /messages - ", err));
});

messagesRouter.post("/:lineUserId", (req, res) => {
  const lineUserId = req.params.lineUserId;
  const message = req.body[0].message;
  client
    .pushMessage(lineUserId, message)
    .then(res.status(201).send())
    .then(() => console.log("SUCCESS - POST /messgaes/:lineUserId"))
    .catch((err) => console.log("ERROR - POST /messgaes/:lineUserId - ", err));
});

messagesRouter.patch("/:lineUserId/read", (req, res) => {
  const lineUserId = req.params.lineUserId;
  return knex("messages")
    .where({ line_user_id: lineUserId })
    .update({ unread: 0 })
    .then(res.status(204).send())
    .then(() => console.log("SUCCESS - PATCH /messgaes/:lineUserId/read"))
    .catch((err) =>
      console.log("ERROR - POST /messgaes/:lineUserId/read - ", err)
    );
});

module.exports = messagesRouter;