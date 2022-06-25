const mongoose = require("mongoose");

module.exports = connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (e) {
    console.log(`Error: ${e.message}`.red.underline.bold);
    process.exit(1);
  }
};
