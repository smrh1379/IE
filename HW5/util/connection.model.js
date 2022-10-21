const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connectionSchema = new Schema({
  connectionRequestId: { type: Number },
  groupId: { type: String },
  sent: { type: Number },
  status: { type: Number },
});
connectionSchema.methods.statusUpdate = function () {
  this.status = 1;
  return this.save();
};
module.exports = mongoose.model("Connection", connectionSchema);
