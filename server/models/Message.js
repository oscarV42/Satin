const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    convoId: {
      type: String
    },
    sender: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;