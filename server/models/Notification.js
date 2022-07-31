const mongooose = require("mongoose");

const notificationSchema = new mongooose.Schema(
  {
    userTo: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      type: mongooose.Schema.Types.ObjectId,
      ref: "User",
    },
    notificationType: {
      type: String,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    // entity id could be one of many things
    entityId: {
      type: mongooose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

notificationSchema.statics.insertNotification = async function (
  userTo,
  userFrom,
  notificationType,
  entityId
) {
  const notification = new Notification({
    userTo,
    userFrom,
    notificationType,
    entityId,
  });
  await Notification.deleteOne({
    userTo,
    userFrom,
    notificationType,
    entityId,
  }).catch((err) => console.log(err));
  return await Notification.create(notification).catch((err) =>
    console.log(err)
  );
};

const Notification = mongooose.model("Notification", notificationSchema);

module.exports = Notification;
