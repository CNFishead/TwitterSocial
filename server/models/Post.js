const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      minlength: 1,
      maxlength: 280,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // will keep track of how many users have retweeted this post.
    retweetUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    retweetData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    avatar: {
      type: String,
      required: true,
    },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    comments: [
      {
        content: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        // These fields will ensure that if the user is deleted, the comment will still have relevant info
        avatar: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
