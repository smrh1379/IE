const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema({
  sender: { type: String, required: true },
  reciever: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
});
module.exports = mongoose.model("Chat", chatSchema);
