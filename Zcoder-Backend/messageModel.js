const mongoose = require("mongoose");
require ('dotenv').config();
mongoose.connect(process.env.Mongo_url)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("fail.connect");
    })
const MessageSchema = new mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("Messages", MessageSchema);
module.exports = Messages;
