const User = require("../util/usermodel");
const Group = require("../util/group.model");
const joinModel = require("../util/join.model");
exports.createGroup = (req, res) => {
  User.findOne({ _id: req.userId }).then((findUser) => {
    if (findUser.rule != undefined) {
      return res.status(400).send({
        error: { message: "Bad request!" },
      });
    }
    Group.find().then((groupFind) => {
      const group = new Group({
        groupId: groupFind.length + 1,
        name: req.body.name,
        description: req.body.description,
      });
      group
        .save()
        .then((item) => {
          findUser.Groupcreate(group);
          res.status(200).send({
            group: {
              id: group.id,
            },
            message: "successful",
          });
        })
        .catch((err) => {
          res.status(400).send({ error: { message: "Bad request!" } });
        });
    });
  });
};
exports.showAllGroups = (req, res) => {
  Group.find()
    .select("groupId name description")
    .then((findgroups) => {
      findgroups.map((item) => {
        const group = {
          id: item.groupId,
          name: item.name,
          description: item.description,
        };
        findgroups.splice(findgroups.indexOf(item), 1, group);
      });
      res.send({ groups: findgroups.reverse() });
    });
};
exports.userGroup = (req, res) => {
  User.findOne({ _id: req.userId })
    .then((findUser) => {
      if (!findUser || findUser.rule == undefined)
        return res.status(400).send({ error: { message: "Bad request!" } });
      var users = [];
      User.find().then((items) => {
        items.map((person) => {
          if (person.rule != undefined) {
            if (person.rule[1] == findUser.rule[1]) {
              users.push({
                id: person.id,
                name: person.name,
                email: person.email,
                rule: person.rule[0],
              });
            }
          }
        });
      });
      Group.findById(findUser.rule[1])
        .then((findGroup) => {
          if (!findGroup)
            return res.status(400).send({ error: { message: "Bad request!" } });
          return res.status(200).send({
            group: {
              name: findGroup.name,
              description: findGroup.description,
              members: [users.reverse()],
            },
          });
        })
        .catch((err) => {
          res.status(400).send({ error: { message: "Bad request!" } });
        });
    })
    .catch((err) => {
      res.status(400).send({ error: { message: "Bad request!" } });
    });
};
