const mongoose = require('mongoose');
const { Schema } = mongoose;
{ timestamps: true }
const convoSchema = new Schema(
  {
    members: {
      type: Array
    },
  },
  { timestamps: true }
)