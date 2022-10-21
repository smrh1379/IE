const User = require("../util/usermodel");
const Group = require("../util/group.model");
const GConnection = require("../util/connection.model");
const Chat = require("../util/chat.model");

exports.sendMessage = (req, res) => {
  User.findOne({ _id: req.userId })
    .then((senderUser) => {
      if (senderUser == null || senderUser.rule == undefined) {
        return res.status(400).send({ error: { message: "Bad request!" } });
      }
      User.findOne({ _id: req.params.user_id })
        .then((recieverUser) => {
          if (recieverUser == null || recieverUser.rule == undefined) {
            return res.status(400).send({ error: { message: "Bad request!" } });
          }
          if (recieverUser.rule[1] != senderUser.rule[1]) {
            Group.findOne({ _id: senderUser.rule[1] })
              .then((senderGroup) => {
                if (senderGroup == null) {
                  return res
                    .status(400)
                    .send({ error: { message: "Bad request!" } });
                }
                Group.findOne({ _id: recieverUser.rule[1] })
                  .then((recieverGroup) => {
                    if (recieverGroup == null) {
                      return res
                        .status(400)
                        .send({ error: { message: "Bad request!" } });
                    }
                    GConnection.findOne({
                      $or: [
                        {
                          connectionRequestId: senderGroup.groupId,
                          groupId: recieverGroup.groupId,
                        },
                        {
                          connectionRequestId: recieverGroup.groupId,
                          groupId: senderGroup.groupId,
                        },
                      ],
                    })
                      .then((foundConnect) => {
                        if (foundConnect == null) {
                          return res
                            .status(400)
                            .send({ error: { message: "Bad request!" } });
                        }
                        if (foundConnect.status != 1) {
                          return res
                            .status(400)
                            .send({ error: { message: "Bad request!" } });
                        }
                        const chat = new Chat({
                          sender: senderUser.id,
                          reciever: recieverUser.id,
                          date: Math.floor(Date.now() / 1000),
                          text: req.body.message,
                        });
                        chat
                          .save()
                          .then((saved) => {
                            return res
                              .status(200)
                              .send({ message: "successful" });
                          })
                          .catch((err) => {
                            return res.status(400).send({
                              error: { message: "Bad request!" },
                            });
                          });
                      })
                      .catch((err) => {
                        return res.status(400).send({
                          error: { message: "Bad request!" },
                        });
                      });
                  })
                  .catch((err) => {
                    return res.status(400).send({
                      error: { message: "Bad request!" },
                    });
                  });
              })
              .catch((err) => {
                return res.status(400).send({
                  error: { message: "Bad request!" },
                });
              });
          } else {
            const chat = new Chat({
              sender: senderUser.id,
              reciever: recieverUser.id,
              date: Math.floor(Date.now() / 1000),
              text: req.body.message,
            });
            chat
              .save()
              .then((saved) => {
                return res.status(200).send({ message: "successful" });
              })
              .catch((err) => {
                return res.status(400).send({
                  error: { message: "Bad request!" },
                });
              });
          }
        })
        .catch((err) => {
          return res.status(400).send({
            error: { message: "Bad request!" },
          });
        });
    })
    .catch((err) => {
      return res.status(400).send({
        error: { message: "Bad request!" },
      });
    });
};
exports.getChatPerUser = (req, res) => {
  Chat.find(
    {
      $or: [
        { sender: req.userId, reciever: req.params.user_id },
        { sender: req.params.user_id, reciever: req.userId },
      ],
    },
    "sender text date reciever"
  )
    .then((findReq) => {
      if (findReq.length == 0) {
        return res.status(400).send({
          error: { message: "1Bad request!" },
        });
      }
      findReq.sort(function (a, b) {
        return b.date - a.date;
      });
      findReq.map((item) => {
        const temp = {
          message: item.text,
          date: item.date,
          sentby: item.sender,
        };
        findReq[findReq.indexOf(item)] = temp;
      });
      return res.status(200).send({ messages: findReq });
    })
    .catch((err) => {
      return res.status(400).send({
        error: { message: "Bad request!" },
      });
    });
};
exports.getAllChat = (req, res) => {
  Chat.find(
    {
      $or: [{ sender: req.userId }, { reciever: req.userId }],
    },
    "sender text date reciever"
  )
    .then((findReq) => {
      if (findReq.length == 0) {
        return res.status(400).send({
          error: { message: "Bad request!" },
        });
      }
      findReq.sort(function (a, b) {
        return b.date - a.date;
      });
      User.find()
        .then((users) => {
          var messages = [];
          findReq.map((item) => {
            const id = item.sender == req.userId ? item.reciever : item.sender;
            const fulldata = users.find((each) => each.id == id);
            const temp = {
              userId: id,
              name: fulldata.name,
            };
            messages.find((each) => each.userId == temp.userId)
              ? void 0
              : messages.push(temp);
          });
          res.status(200).send({ chats: messages });
        })
        .catch((err) => {
          return res.status(400).send({
            error: { message: "Bad request!" },
          });
        });
    })
    .catch((err) => {
      return res.status(400).send({
        error: { message: "Bad request!" },
      });
    });
};
