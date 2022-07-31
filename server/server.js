const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const fileupload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const { Server } = require("socket.io");

// import routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const searchRoutes = require("./routes/searchRoutes");
const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// import middleware
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

// Load env vars
dotenv.config();

const app = express();
// Body Parser, allows to accept body data
app.use(express.json());
// file uploader, allows to accept file data
app.use(fileupload());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize Data
app.use(mongoSanitize());
// Set Security headers
// app.use(helmet());
// prevent XSS attacks
app.use(xss());
// Prevent hpp pollution
app.use(hpp());
// CORS
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);

// Set static folder
app.use(express.static(path.join(path.resolve(__dirname), "../public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Init Middleware

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server has started on port: ${PORT}, in ${process.env.NODE_ENV}`.yellow));
const io = new Server(server, { pingTimeout: 60000 });
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    console.log(`${userData.username} has created a connection with id:`.green + ` ${socket.id}`.blue);
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join", (room) => {
    console.log(`${room.user.username} has joined the chat in room`.green + ` ${room.chatId}`.blue);
    socket.join(room.chatId);
  });
  socket.on("typing", (room) => {
    // let the client know that the user is typing
    socket.broadcast.to(room.id).emit("typing", room.user.username);
  });
  socket.on("stopTyping", (room) => {
    console.log(`${room.user.username} has stopped typing`.yellow);
    // let the client know that the user is no longer typing
    socket.broadcast.to(room.id).emit("stopTyping", room);
  });
  socket.on("leave", (room) => {
    console.log(`${room.user.username} has left the chat in room`.yellow + ` ${room.chatId}`.blue);
    socket.leave(room.id);
  });
  socket.on("openNotify", (n) => {
    console.log(`Notification opened: ${n.id}`.yellow);
    socket.in(n.user._id).emit("openedNotification", n);
  });
  socket.on("sendNewMessage", (room) => {
    // send the new message to the client
    socket.broadcast.to(room.chat._id).emit("newMessage", room.message);
    // we also need to send the new message to the client socket to let that user know that they received a new message
    if (!room.chat.users) return console.log("Chat.users not defined");

    room.chat.users.forEach((user) => {
      if (user._id == room.message.sender._id) return;
      socket.in(user._id).emit("message received", room.message);
    });
  });
  socket.on("notification received", (room) => {
    console.log(room);
    socket.in(room).emit("notification received");
  });
});
