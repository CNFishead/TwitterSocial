const mongooose = require("mongoose");

const messageSchema = new mongooose.Schema(
  {
    sender: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    chat: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    readBy: [
      {
        type: mongooose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongooose.model("Message", messageSchema);
