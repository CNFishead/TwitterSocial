export const emitNotification = (userId, loggedInUser, socket) => {
  if (userId === loggedInUser || !socket) return;
  console.log(`${loggedInUser} has sent a notification to ${userId}`);
  socket.emit("notification received", userId);
};
