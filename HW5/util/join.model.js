const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joinSchema = new Schema({
  date: { type: Number },
  userId: { type: String },
  groupId: { type: Number },
  joinRequestId: { type: Number },
});
module.exports = mongoose.model("Join", joinSchema);
