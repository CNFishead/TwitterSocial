const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const fileupload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

// import routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

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

// Set static folder
app.use(express.static(path.join(path.resolve(__dirname), "../public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Init Middleware

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server has started on port: ${PORT}, in ${process.env.NODE_ENV}`.yellow
  )
);
