const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const groupSchema = new Schema({
  groupId: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Group", groupSchema);
