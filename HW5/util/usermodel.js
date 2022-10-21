const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rule: {},
});
userSchema.methods.Groupcreate = function (group) {
  const item = [];
  this.rule = item;
  this.rule[0] = "owner";
  this.rule[1] = group.id;
  return this.save();
};
userSchema.methods.Reqaccepted = function (group) {
  const item = [];
  this.rule = item;
  this.rule[0] = "normal";
  this.rule[1] = group.id;
  return this.save();
};
module.exports = mongoose.model("User", userSchema);
