const User = require("../util/usermodel");
const Group = require("../util/group.model");
const GConnection = require("../util/connection.model");

exports.setRequest = (req, res) => {
  User.findOne({ _id: req.userId })
    .then((findUser) => {
      if (findUser == null || findUser.rule == undefined) {
        return res.status(400).send({ error: { message: "Bad request!" } });
      }
      if (findUser.rule[0] != "owner") {
        return res.status(400).send({ error: { message: "Bad request!" } });
      }
      Group.findOne({ _id: findUser.rule[1] })
        .then((findGroup) => {
          if (findGroup == null) {
            return res.status(400).send({ error: { message: "Bad request!" } });
          }
          if (findGroup.groupId == req.body.groupId) {
            return res.status(400).send({
              error: { message: "Bad request!" },
            });
          }
          GConnection.findOne({
            requesterId: findGroup.groupId,
            groupId: req.body.groupId,
          })
            .then((conFind) => {
              if (conFind != null) {
                return res.status(400).send({
                  error: { message: "Bad request!" },
                });
              }
              GConnection.find().then((conCount) => {
                const connection = new GConnection({
                  connectionRequestId: findGroup.groupId,
                  groupId: req.body.groupId,
                  sent: Math.floor(Date.now() / 1000),
                  status: 0,
                });
                connection
                  .save()
                  .then((save) => {
                    return res.status(200).send({
                      message: "successful",
                    });
                  })
                  .catch((err) => {
                    return res
                      .status(400)
                      .send({ error: { message: "Bad request!" } });
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
          return res.status(400).send({ error: { message: "Bad request!" } });
        });
    })
    .catch((err) => {
      return res.status(400).send({ error: { message: "Bad request!" } });
    });
};

exports.getRequest = (req, res) => {
  User.findOne({ _id: req.userId }).then((findUser) => {
    if (findUser == null || findUser.rule == undefined) {
      return res.status(400).send({ error: { message: "Bad request!" } });
    }
    if (findUser.rule[0] != "owner") {
      return res.status(400).send({ error: { message: "Bad request!" } });
    }
    Group.findOne({ _id: findUser.rule[1] }).then((findGroup) => {
      if (findGroup == null) {
        return res.status(400).send({ error: { message: "Bad request!" } });
      }
      GConnection.find({ groupId: findGroup.groupId })
        .then((findG) => {
          if (findG.length == 0) {
            return res.status(400).send({
              error: { message: "Bad request!" },
            });
          }
          findG.sort(function (a, b) {
            return b.sent - a.sent;
          });
          findG.map((item) => {
            const temp = {
              connectionRequestId: item.connectionRequestId,
              groupId: item.groupId,
              sent: item.sent,
            };

            findG[findG.indexOf(item)] = temp;
          });
          return res.status(200).send({ requests: findG });
        })
        .catch((err) => {
          return res.status(400).send({ error: { message: "Bad request!" } });
        });
    });
  });
};
exports.setAcceptreq = (req, res) => {
  GConnection.findOne({
    connectionRequestId: req.body.connectionRequestId,
    status: 0,
  })
    .then((request) => {
      if (request == null) {
        return res.status(400).send({ error: { message: "Bad request!" } });
      }
      User.findOne({ _id: req.userId })
        .then((Admin) => {
          if (Admin == null || Admin.rule == undefined) {
            return res.status(400).send({ error: { message: "Bad request!" } });
          }

          Group.findOne({ groupId: request.groupId })
            .then((desiredGroup) => {
              if (desiredGroup == null) {
                return res
                  .status(400)
                  .send({ error: { message: "Bad request!" } });
              }
              if (
                desiredGroup.id != Admin.rule[1] ||
                Admin.rule[0] != "owner"
              ) {
                return res
                  .status(400)
                  .send({ error: { message: "Bad request!" } });
              }
              request
                .statusUpdate()
                .then((status) => {
                  return res.status(200).send({
                    message: "successful",
                  });
                })
                .catch((err) => {
                  return res
                    .status(400)
                    .send({ error: { message: "Bad request!" } });
                });
            })
            .catch((err) => {
              return res
                .status(400)
                .send({ error: { message: "Bad request!" } });
            });
        })
        .catch((err) =>
          res.status(400).send({ error: { message: "Bad request!" } })
        );
    })
    .catch((err) =>
      res.status(400).send({ error: { message: "Bad request!" } })
    );
};
