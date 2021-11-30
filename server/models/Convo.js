const mongoose = require('mongoose');
const { Schema } = mongoose;

const convoSchema = new Schema(
  {
    members: {
      type: Array
    },
    messages: [
      {
        sender: {
          type: String,
          required: true
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      }
    ]
  },
  { timestamps: true }
)

const Convo = mongoose.model('Convo', convoSchema);

module.exports = Convo;