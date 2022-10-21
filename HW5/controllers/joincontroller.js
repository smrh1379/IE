const User = require("../util/usermodel");
const Group = require("../util/group.model");
const Join = require("../util/join.model");

exports.setRequest = (req, res) => {
  User.findOne({ _id: req.userId })
    .then((userFind) => {
      if (userFind.rule != undefined) {
        return res.status(400).send({ error: { message: "Bad request!" } });
      }
      Group.findOne({ groupId: req.body.groupId })
        .then((groupFind) => {
          Join.findOne({ userId: req.userId, groupId: req.body.groupId })
            .then((reqFind) => {
              if (reqFind) {
                return res
                  .status(400)
                  .send({ error: { message: "Bad request!" } });
              }
              Join.find()
                .then((requests) => {
                  const join = new Join({
                    joinRequestId: requests.length ? 1 : +1,
                    userId: req.userId,
                    groupId: req.body.groupId,
                    date: Math.floor(Date.now() / 1000),
                  });
                  join
                    .save()
                    .then((item) => {
                      return res.status(200).send({
                        message: "successful",
                      });
                    })
                    .catch((err) =>
                      res
                        .status(400)
                        .send({ error: { message: "Bad request!" } })
                    );
                })
                .catch((err) => "hello");
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
exports.acceptRequest = (req, res) => {
  Join.findOne({ joinRequestId: req.body.joinRequestId })
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
                desiredGroup._id != Admin.rule[1] ||
                Admin.rule[0] != "owner"
              ) {
                return res
                  .status(400)
                  .send({ error: { message: "Bad request!" } });
              }
              User.findOne({ _id: request.userId })
                .then((reqUser) => {
                  if (reqUser == null || reqUser.rule != undefined) {
                    return res
                      .status(400)
                      .send({ error: { message: "Bad request!" } });
                  }
                  reqUser.Reqaccepted(desiredGroup);
                  Join.findOneAndDelete({
                    joinRequestId: req.body.joinRequestId,
                  }).then((item) => {
                    if (item == null) {
                      return res
                        .status(400)
                        .send({ error: { message: "Bad request!" } });
                    }
                    return res.status(200).send({ message: "successful" });
                  });
                })
                .catch((err) =>
                  res.status(400).send({ error: { message: "Bad request!" } })
                );
            })
            .catch((err) =>
              res.status(400).send({ error: { message: "Bad request!" } })
            );
        })
        .catch((err) =>
          res.status(400).send({ error: { message: "Bad request!" } })
        );
    })
    .catch((err) =>
      res.status(400).send({ error: { message: "Bad request!" } })
    );
};
exports.getRequestsByGroup = (req, res) => {
  User.findOne({ _id: req.userId })
    .then((findUser) => {
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
        Join.find({ groupId: findGroup.groupId }).then((findReq) => {
          if (findReq.length == 0) {
            return res.status(400).send({ error: { message: "Bad request!" } });
          }
          findReq.sort(function (a, b) {
            return b.date - a.date;
          });
          findReq.map((item) => {
            const temp = {
              id: item.joinRequestId,
              groupId: item.groupId,
              userId: item.userId,
              date: item.date,
            };
            findReq[findReq.indexOf(item)] = temp;
          });
          return res.status(200).send({ joinRequests: findReq.reverse() });
        });
      });
    })
    .catch((err) => {
      return res.status(400).send({ error: { message: "Bad request!" } });
    });
};
exports.getRequests = (req, res) => {
  Join.find({ userId: req.userId })
    .select("id userId groupId date")
    .then((findReq) => {
      if (findReq.length == 0) {
        return res.status(400).send({ error: { message: "Bad request!" } });
      }
      findReq.sort(function (a, b) {
        return b.date - a.date;
      });
      findReq.map((item) => {
        const temp = {
          id: item.id,
          groupId: item.groupId,
          userId: item.userId,
          date: item.date,
        };
        findReq[findReq.indexOf(item)] = temp;
      });
      return res.status(200).send({ joinRequests: findReq.reverse() });
    })
    .catch((err) => {
      return res.status(400).send({ error: { message: "Bad request!" } });
    });
};
