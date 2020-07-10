const express = require("express");
const config = require("../../../knexfile.js").development;
const knex = require("knex")(config);
const { client, dropboxAccessToken } = require("../../../config");
const fetch = require("node-fetch");

const usersRouter = express.Router();

usersRouter.get("/:lineUserId", (req, res) => {
  const lineUserId = req.params.lineUserId;
  return knex("users")
    .where({ line_user_id: lineUserId })
    .select()
    .then((user) => res.send(user))
    .then(() => console.log("SUCCESS - GET /users/:lineUserId"))
    .catch((err) => console.log("ERROR - GET /users/:lineUserId - ", err));
});

usersRouter.get("/:lineUserId/messages", (req, res) => {
  const lineUserId = req.params.lineUserId;
  return knex("messages")
    .where({ line_user_id: lineUserId })
    .orderBy("created_at")
    .select()
    .then((messages) => res.send(messages))
    .then(() => console.log("SUCCESS - GET /messages/:lineUserId"))
    .catch((err) => console.log("ERROR - GET /messages/:lineUserId - ", err));
});

usersRouter.post("/", (req, res) => {
  const event = req.body[0];
  const user = {
    line_user_id: event.source.userId,
    last_name: "_",
    first_name: "_",
    email: "_",
  };
  return knex("users")
    .select()
    .where("line_user_id", event.source.userId)
    .then((rows) => {
      if (rows.length === 0) {
        knex("users")
          .insert(user)
          .then(() => res.status(201).send())
          .then(() => "SUCCESS - POST /users")
          .catch((err) => console.log("ERROR - POST /users - ", err));
      }
    });
});

usersRouter.post("/:lineUserId/messages", (req, res) => {
  const lineUserId = req.params.lineUserId;
  const message = req.body[0].message;
  client
    .pushMessage(lineUserId, message)
    .then(res.status(201).send())
    .then(() => console.log("SUCCESS - POST /messgaes/:lineUserId"))
    .catch((err) => console.log("ERROR - POST /messgaes/:lineUserId - ", err));
});

usersRouter.patch("/:lineUserId/messages/read", (req, res) => {
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

usersRouter.patch("/:lineUserId/messages/content", (req, res) => {
  const lineUserId = req.params.lineUserId;
  return knex("messages")
    .where({ line_user_id: lineUserId })
    .select()
    .then((messages) => {
      for (const message of messages) {
        if (message.line_message_type === "image" && message.content === "_") {
          const data = {
            path: message.path,
            settings: {
              requested_visibility: "public",
              audience: "public",
              access: "viewer",
            },
          };
          fetch(
            "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
            {
              body: JSON.stringify(data),
              headers: {
                Authorization: `Bearer ${dropboxAccessToken}`,
                "Content-Type": "application/json",
              },
              method: "POST",
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((jsonResponse) => {
              const originalUrl = jsonResponse.url;
              const url =
                originalUrl.slice(0, originalUrl.indexOf("?") + 1) + "raw=1";
              console.log("IMAGE URL - ", url);
              return knex("messages")
                .where({ line_message_id: message.line_message_id })
                .update({ content: url });
            })
            .catch((err) => console.log(err));
        }
      }
    })
    .then(res.status(204).send())
    .then(() => console.log("SUCCESS - PATCH /messgaes/:lineUserId/content"))
    .catch((err) =>
      console.log("ERROR - POST /messgaes/:lineUserId/content - ", err)
    );
});

module.exports = usersRouter;
