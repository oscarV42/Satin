const mongoose = require('mongoose');
const { Schema } = mongoose;

const convoSchema = new Schema(
  {
    members: {
      type: Array
    },
  },
  { timestamps: true }
)

const Convo = mongoose.model('convo', convoSchema);

module.exports = Convo;